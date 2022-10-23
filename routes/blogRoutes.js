const router = require("express").Router();
const blogController = require("../controller/blogController");
const BlogModel = require("../models/blogModel");
const multer = require("multer");
const emailController = require("../controller/emailController");

//sending email
router.post("/sendVerification", emailController.sendMail);
//BLog things

router.get("/oneBlog/:id", blogController.readOneBlog);
router.get("/", blogController.readBlogs);
router.post("/", blogController.createBlog);
router.put("/:id", blogController.updateBlog);
router.delete("/:id", blogController.deleteBlog);
router.get("/searchTitle", blogController.searchBlogWithTitle);
router.get("/searchTags", blogController.searchBlogWithTags);
module.exports = router;
