'use strict';

const AWS = require('aws-sdk');
const fs = require('fs');
const url = require('url');

const exec = require('child_process').exec;


const mongoURI = process.env.MONGO_URL; //with port
const s3Path = process.env.S3_PATH;
const mongoURIparsed = url.parse(mongoURI);
const host = mongoURIparsed.host;
const username = mongoURIparsed.auth.split(':')[0];
const pass = mongoURIparsed.auth.split(':')[1];
const dbName = mongoURIparsed.path.split('/')[1];

const zipFolder = require('zip-folder');
const s3bucket = new AWS.S3({
  params: {
    Bucket: s3Path
  }
});

module.exports.handler = function(event, context, cb) {
    process.env['PATH'] = process.env['PATH'] + ':' + process.env['LAMBDA_TASK_ROOT']
    console.log(process.env['PATH']);
    let fileName = (new Date()).toDateString().replace(/ /g, "") +"_"+ (new Date()).getTime();
    let folderName = '/tmp/' + fileName + "/"
    exec('mongodump -h '+host+' -d '+dbName+' -u '+username+' -p '+pass+' -o ' + folderName, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        let filePath = "/tmp/" + fileName + ".zip";

        zipFolder(folderName, filePath, function(err) {
            if (err) {
                console.log('oh no!', err);
            } else {
                console.log('EXCELLENT');
                fs.readFile(filePath, function(err, data) {
                    s3bucket.createBucket(function() {
                        let params = {
                            Key: fileName, 
                            Body: data
                        };
                        s3bucket.upload(params, function(err, data) {
                            // Whether there is an error or not, delete the temp file
                            fs.unlink(filePath, function(err) {
                                if (err) {
                                    console.error(err);
                                }
                                console.log('Temp File Delete');
                            });


                            if (err) {
                                console.log('ERROR MSG: ', err);

                            } else {
                                console.log('Successfully uploaded data');

                            }
                        });
                    });
                });
            }

        })
    });

};
