# csv-extractor
This application is use to extract records from csv file
url is https://temi-backend.glitch.me/remote

In the select fields, you insert column name you want to extract from your csv file 

sample payload below
{
	 "csv":{
    "url": "https://people.sc.fsu.edu/~jburkardt/data/csv/crash_catalonia.csv",
    "select_fields": ["First Name", "Last Name", "Age"]
  }
}
