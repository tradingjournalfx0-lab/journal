const mongoose =
require("mongoose");

const journalSchema =
new mongoose.Schema({

  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true,
  },

  title:String,

  mood:String,

  content:String,

  tags:[String],

},{
  timestamps:true,
});

module.exports =
mongoose.model(

  "Journal",

  journalSchema

);