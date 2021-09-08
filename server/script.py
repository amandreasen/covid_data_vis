import sqlite3
import pandas as pd
from urllib.request import urlopen
import requests
import json

COVID_API_KEY = "1f7c9742939e40bf99f1cebebc4d5bb8"
COVID_COUNTY_JSON_URL = (
    f"https://api.covidactnow.org/v2/counties.timeseries.json?apiKey={COVID_API_KEY}"
)
COUNTY_POPULATION_URL = "https://usafactsstatic.blob.core.windows.net/public/data/covid-19/covid_county_population_usafacts.csv"

test = "https://api.covidactnow.org/v2/state/NJ.json?apiKey=1f7c9742939e40bf99f1cebebc4d5bb8"

# open sqlite table connection
conn = sqlite3.connect("data.db")
c = conn.cursor()

# c.execute("""DROP TABLE IF EXISTS testTable""")
# c.execute("""CREATE TABLE testTable (test integer);""")
# c.execute("""INSERT INTO testTable VALUES (1);""")
# c.execute("SELECT * FROM testTable;")

# print(c.fetchall())

# delete current table version
c.execute("""DROP TABLE IF EXISTS CovidCountyData""")
c.execute(
    """ CREATE TABLE CovidCountyData (
    countyFIPs integer,
    countyName text NOT NULL,
    state text NOT NULL,
    caseData text
    );"""
)
#
# fetch csv data
# covid_county_response = urlopen(COVID_COUNTY_JSON_URL)
# county_json = json.loads(covid_county_response.read().decode())
# print(county_json)
res = requests.get(url=COVID_COUNTY_JSON_URL)
covid_county_data = res.json()
# print(covid_county_data[0].keys())

for county_entry in covid_county_data:
    county_fips = county_entry["fips"]
    state = county_entry["state"]
    county = county_entry["county"]
    timeseries_data = county_entry["actualsTimeseries"]

    case_data = []
    for timeseries_entry in timeseries_data:
        entry = {
            "date": timeseries_entry["date"],
            "cases": timeseries_entry["cases"] or 0,
            "newCases": timeseries_entry["newCases"] or 0,
        }
        case_data.append(entry)

    case_data_string = json.dumps(case_data)

    c.execute(
        "INSERT INTO CovidCountyData(countyFIPS, countyName, state, caseData) VALUES (?, ?, ?, ?)",
        (
            county_fips,
            county,
            state,
            case_data_string,
        ),
    )

conn.commit()

# print(res.json())

# covid_data = pd.read_json(covid_data)
# print(covid_data)
# covid_data.rename(columns={"County Name": "CountyName"}, inplace=True)
# covid_data["CountyName"] = covid_data["CountyName"].str.strip()
# covid_data_date_cols = covid_data.columns.values.tolist()[4:]

# # insert date column names
# for date in covid_data_date_cols:
#     SQL_CREATE_TABLE_BASE.append('"' + date + '"' + " integer")
# full_create_table_cmd = (
#     "CREATE TABLE CovidData (" + ", ".join(SQL_CREATE_TABLE_BASE) + ");"
# )

# # create table
# c.execute(full_create_table_cmd)

# # insert table data
# covid_data.to_sql("CovidData", conn, if_exists="append", index=False)
