const AWS = require('aws-sdk')
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY
})
const fs = require("fs");
const util = require("util");
const readFile = util.promisify(fs.readFile);
const File = require('../models/file');
const messageHandler= require('../helpers/constantType');
const userId = {
  kosasih: 'kosasih123',
  helga: 'helga123'
}
const fileUtil = require('../utils/aws-sdk')
class ImageController {
  static async createImage(req, res, next) {
    try {
      // let dataImage = await readFile(req.file.path)
      let dataImage = await fileUtil.readFileUtil(req.file.path)
      const param ={
        Bucket: process.env.BUCKET_NAME,
        Key: `${userId.kosasih}/${req.file.filename}`,
        Body: dataImage,
        ContentType: req.file.mimetype
      }
      let uploadedImage = await fileUtil.uploadAws(param)
      let responImage = new File({key: uploadedImage.Key,
        type: req.file.mimetype,
        url: uploadedImage.Location,
        bucket: uploadedImage.Bucket})
      let savedData = await responImage.save()
      res.status(201).json(savedData)
    } catch (error) {
      next({ status: 500, message: messageHandler.err500message});
    }
   
  }

  static async deleteImage(req, res, next) {
    try {
      let {id} = req.params
      let getDataFile = await File.findById(id)
      const param = {
        Bucket: getDataFile.bucket,
        Key: getDataFile.key
      }
      
      s3.deleteObject(param, async function (err, data) {
        if(err) {
          next({ status: 500, message: messageHandler.err500message})
        }else {
          let deletedFile = await File.findOneAndDelete({_id: id});
          res.status(200).json(deletedFile)
        }
      })
      
    } catch (error) {
      next({ status: 500, message: messageHandler.err500message});
    }
  }

  static async updateImage(req, res, next) {
    try {
      let {id} = req.params
      let getDataFile = await File.findById(id)
      const param = {
        Bucket: getDataFile.bucket,
        Key: getDataFile.key
      }
      
      s3.deleteObject(param, async function (err, data) {
        if(err) {
          next({ status: 500, message: messageHandler.err500message})
        }else {
          let deletedFile = await File.findOneAndDelete({_id: id});
          
          res.status(200).json(deletedFile)
        }
      })
      
    } catch (error) {
      next({ status: 500, message: messageHandler.err500message});
    }
  }
} 

module.exports = ImageController