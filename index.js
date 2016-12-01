'use strict';

var AWS = require('aws-sdk');
var fs = require('fs');

var exec = require('child_process').exec;


var bucketName= '<bucket Name>';
var mongourl = "<mongo url with port>";
var username = "<mongo username>";
var pass = "<mongo pass>";
var dbName = "<db name>";


var zipFolder = require('zip-folder');
var s3bucket = new AWS.S3({
    params: {
        Bucket: bucketName
    }
});
module.exports.handler = function(event, context, cb) {
    process.env['PATH'] = process.env['PATH'] + ':' + process.env['LAMBDA_TASK_ROOT']
    console.log(process.env['PATH']);
    var fileName = (new Date()).toDateString().replace(/ /g, "") +"_"+ (new Date()).getTime();
    var folderName = '/tmp/' + fileName + "/"
    exec('mongodump -h '+mongourl+' -d '+dbName+' -u '+username+' -p '+pass+' -o ' + folderName, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        var filePath = "/tmp/" + fileName + ".zip";

        zipFolder(folderName, filePath, function(err) {
            if (err) {
                console.log('oh no!', err);
            } else {
                console.log('EXCELLENT');
                fs.readFile(filePath, function(err, data) {
                    s3bucket.createBucket(function() {
                        var params = {
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
