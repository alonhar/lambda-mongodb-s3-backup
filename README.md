This is simple aws lambda function that use `mongodump` to backup mongodb database. 

It zip's the file and upload it to S3 bucket.

`index.js` change this params:
```
var bucketName= '<bucket Name>';
var mongourl = "<mongo url with port>";
var username = "<mongo username>";
var pass = "<mongo pass>";
var dbName = "<db name>";
```
_____________________________
##Instructions##


- Clone this repository. 
- Run - npm install.
- Zip all the files.
- And upload the zip to  a new aws lambda (upload to s3 and then to the lambda, the file is to big to upload directly)
- Add S3 Policy to the lambda role to give the lambda permission to write to s3.



##Region##
This lambda function compiled in EU (Ireland) AMI . 



