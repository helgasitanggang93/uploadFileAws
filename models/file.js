const mongoose = require('mongoose');
const {Schema} = mongoose;

const FileSchema = new Schema({
  key: String,
  type: String,
  url: String,
  bucket: String
});

const File = mongoose.model("File", FileSchema);

module.exports = File

