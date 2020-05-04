const AWS = require('aws-sdk');
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY
});
const fs = require("fs");

class AWSSDK{
  static readFileUtil(file) {
    return new Promise(function (resolve, reject) {
      fs.readFile(file, function (err, data){
        if(err){
          reject(err)
        }else {
          resolve(data)
        }
      })
    })
  } 

  static uploadAws(param) {
    return new Promise((resolve, reject) => {
      s3.upload(param, function (err, data) {
        if(err){
          reject(err)
        }else {
          resolve(data)
        }
      })
    })
  }

  static deleteAws(param) {
    return new Promise(function (resolve, reject) {
      s3.deleteObject(param, function(err, data) {
        if(err){
          reject(err)
        }else {
          resolve(data)
        }
      })
    })
  }
}

module.exports = AWSSDK