const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = mongoose.Schema(
  {
    content: {
      type: String,
    },
    title: {
      type: String,
      //   required: true
    },
    // writer: {
    //   type: Schema.Types.ObjectId,
    //   ref: "User",
    // },
    type: {
      type: String,
      // required:true
    },
  },
  { timestamps: true }
);

const Blog = mongoose.model("Blog", blogSchema);

module.exports = { Blog };
