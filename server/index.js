const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');
const connectDB = require('./Database/connect');

const signup = require('./routes/signup.route');
const login = require('./routes/login.route.JWT');
const post_blog = require('./routes/postblog.route');
const get_blog = require('./routes/getallblogs.route');
const get_blog_detail = require('./routes/getblogdetail.route');
const get_user_details = require('./routes/getuserdetails.route');
const get_my_blogs = require('./routes/getmyblogs.route');
const delete_my_blogs = require('./routes/deletemyblog.route');
const update_my_blogs = require('./routes/updatemyblog.route');
const get_other_blogs = require('./routes/getotherblogs.route');

require('dotenv').config();
connectDB(process.env.MONGODB_URL);

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

app.use('/signup', signup);
app.use('/login', login);
app.use('/post-blog', post_blog);
app.use('/get-blog', get_blog);
app.use('/get-blog-detail', get_blog_detail);
app.use('/get-user-details',get_user_details);
app.use('/get-my-blogs',get_my_blogs);
app.use('/delete-blog',delete_my_blogs);
app.use('/update-my-blog',update_my_blogs);
app.use('/get-other-blog',get_other_blogs);