import sqlite3
import pandas as pd

COVID_CSV_URL = "https://usafactsstatic.blob.core.windows.net/public/data/covid-19/covid_confirmed_usafacts.csv"
COUNTY_POPULATION_URL = "https://usafactsstatic.blob.core.windows.net/public/data/covid-19/covid_county_population_usafacts.csv"

SQL_CREATE_TABLE_BASE = [
    "countyFIPs integer",
    "CountyName text NOT NULL",
    "State text NOT NULL",
    "StateFIPS integer NOT NULL",
]

# open sqlite table connection
conn = sqlite3.connect("data.db")
c = conn.cursor()

# delete current table version
c.execute("""DROP TABLE IF EXISTS CovidData""")

# fetch csv data
covid_data = pd.read_csv(COVID_CSV_URL)
covid_data.rename(columns={"County Name": "CountyName"}, inplace=True)
covid_data["CountyName"] = covid_data["CountyName"].str.strip()
covid_data_date_cols = covid_data.columns.values.tolist()[4:]

# insert date column names
for date in covid_data_date_cols:
    SQL_CREATE_TABLE_BASE.append('"' + date + '"' + " integer")
full_create_table_cmd = (
    "CREATE TABLE CovidData (" + ", ".join(SQL_CREATE_TABLE_BASE) + ");"
)

# create table
c.execute(full_create_table_cmd)

# insert table data
covid_data.to_sql("CovidData", conn, if_exists="append", index=False)
