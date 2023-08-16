
const Post = require('../models/post');
const User =  require('../models/user');
module.exports.home=async function(req,res){
    const posts=await Post.find({})
    // .sort(-createdAt)
    .populate('user')
    .populate({
        path:'comments',
        populate:{
            path:'user'
        }
    })
    .exec();
    User.find({}).then (function(users){
        return res.render('home',{
            title:"Codeial | Home",
            posts: posts,
            all_users:users
         });
        
    });
        
        
}