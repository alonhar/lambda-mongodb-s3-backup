This is a simple AWS Lambda function that uses `mongodump` to backup a MongoDB database to S3. 
It uses [Serverless](https://serverless.com/) to zip up the directory and deploy to AWS.

## Deployment instructions ##

Create a `.env` file in the root directory and add the following environment variables:
```
export MONGO_URL = mongodb://<user>:<password>@<host>:<port>/<database>
export S3_PATH = <s3bucket>/<folder>/...etc
```

Source the environment file so Serverless can access the values:
```
. ./.env
```

Deploy the lambda function with Serverless:
```
serverless deploy --aws-profile profilename
```
Your function is now deployed and will run every 2 hours. Change the execution frequency in `serverless.yml`.
_____________________________


## Lambda configuration ##
The `serverless.yml` file contains a set of default configuration for the lambda. You can change these settings to fit your needs.



