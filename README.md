This is simple aws lambda function that uses `mongodump` to backup mongodb database. 

It zips the file and uploads it to an S3 bucket.

Use the following environment variables in your Lambda setup:

```
MONGO_URL = mongodb://<user>:<password>@<host>:<port>/<database>
S3_PATH = <s3bucket>/<folder>/...etc
```

_____________________________

### Instructions ###


- Clone this repository. 
- Run - npm install.
- Zip all the files.
- Upload the zip to  a new aws lambda (upload to s3 and then to the lambda, the file is to big to upload directly)
- Add S3 Policy to the lambda role to give the lambda permission to write to s3.



## Region ##
This lambda function compiled in EU (Ireland) AMI . 



