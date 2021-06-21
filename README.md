# csv-extractor
This application is use to extract records from csv file
Base url is https://temi-backend.glitch.me/

To make use of below API endpoint, you can test it with API endpoint like Postman or Insomia.
You need to insert the payload to the API endpoint body at 
POST request https://temi-backend.glitch.me/info


In the select fields, you insert column name you want to extract from your csv file 

sample payload below
 
 ```{
	 "csv":{
   		 "url": "https://people.sc.fsu.edu/~jburkardt/data/csv/crash_catalonia.csv",
  		  "select_fields": ["First Name", "Last Name", "Age"]
  		}
    }```
