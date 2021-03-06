import json
import sqlite3
from flask import Flask, request, g
from flask_cors import CORS, cross_origin

app = Flask(__name__)
DATABASE = "C:\\Users\\Amanda\\Projects\\covid_data_vis\\server/data.db"
app.config["DEBUG"] = True
app.config["CORS_HEADERS"] = "Content-Type"

# database setup
def get_db():
    db = getattr(g, "_database", None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
    return db


@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, "_database", None)
    if db is not None:
        db.close()


def query_db(query, args=()):
    cur = get_db().execute(query, args)
    rv = cur.fetchall()
    cur.close()
    return rv


def serialize_case_data(data):
    row = data[0]

    serialized_data = {
        "countyFIPS": row[0],
        "countyName": row[1],
        "state": row[2],
        "caseData": json.loads(row[3]),
    }

    return serialized_data


# routes

# gets earliest and latest date available in table
@app.route("/dates")
@cross_origin()
def get_date_range():
    col_names = query_db("SELECT c.name FROM pragma_table_info('CovidData') c;")

    if not col_names:
        return json.dumps(
            {"success": False, "error": "Could not fetch date range data."}
        )

    date_data = {}
    date_data["start"] = col_names[4][0]
    date_data["end"] = col_names[-1][0]

    return json.dumps({"success": True, "data": date_data})


# gets covid cases per day for location specified by state and county
@app.route("/cases/county")
@cross_origin()
def get_county_cases():
    county = request.args.get("county")
    state = request.args.get("state")
    if not (county and state):
        return json.dumps({"success": False, "error": "Location not specified."}), 404

    data = query_db(
        f"SELECT * FROM CovidCountyData WHERE state='{state}' AND countyName='{county}';"
    )
    if not (data):
        return json.dumps({"success": False, "error": "No matching data found."}), 404

    return (
        json.dumps({"success": True, "data": serialize_case_data(data)}),
        200,
    )


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
