const BlogModel = require("../models/blogModel");
const ObjectID = require("mongoose").Types.ObjectId;
const asyncHandler = require("express-async-handler");
const multer = require("multer");

const fs = require("fs");

module.exports.readBlogs = async (req, res) => {
  BlogModel.find((err, docs) => {
    if (!err) res.send(docs);
    else console.log("Error to get data : " + err);
  }).sort({ createdAt: -1 });
};

module.exports.imageBLog = async (req, res) => {
  const storage = multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, "C:/Users/ahmed/Desktop/react/10h/public/uploads");
    },
    filename: (req, file, callback) => {
      callback(null, file.originalname);
    },
  });
};

module.exports.createBlog = async (req, res) => {
  const storage = multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, "C:/Users/ahmed/Desktop/react/10h/public/uploads");
    },
    filename: (req, file, callback) => {
      callback(null, file.filename);
    },
  });

  const newBlog = new BlogModel({
    userId: "1",
    title: req.body.title,
    content: req.body.content,
    hidden: false,
    tags: req.body.tags,
    imageUrl: req.file.filename,
  });

  try {
    blog = await newBlog.save();
    return res.status(201).json(blog);
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports.updateBlog = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  const updatedRecord = {
    title: req.body.title,
    discription: req.body.discription,
    picture: req.body.picture,
    //picture: req.file !== null ? "./uploads/posts/" + fileName : "",
    video: req.body.video,
  };

  BlogModel.findByIdAndUpdate(
    req.params.id,
    { $set: updatedRecord },
    { new: true },
    (err, docs) => {
      if (!err) res.send(docs);
      else console.log("Update error : " + err);
    }
  );
};

module.exports.deleteBlog = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  BlogModel.findByIdAndRemove(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("Delete error : " + err);
  });
};

module.exports.searchBlogWithTitle = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [{ title: { $regex: req.query.search, $options: "i" } }],
        //     $and: [{ public: { $exists: true } }],
      }
    : {};

  const blogs = await await BlogModel.find(keyword);
  res.send(blogs);
});

module.exports.searchBlogWithTags = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [{ tags: { $regex: req.query.search, $options: "i" } }],
      }
    : {};

  const blogs = await await BlogModel.find(keyword);
  res.send(blogs);
});

module.exports.readOneBlog = async (req, res) => {
  BlogModel.findById(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("Error to get data : " + err);
  }).sort({ createdAt: -1 });
};
