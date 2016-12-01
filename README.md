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
- Zip all the files.
- And upload the zip to  a new aws lambda

