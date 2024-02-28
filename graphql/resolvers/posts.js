const Post = require('../../models/Post');
const checkAuth = require("../../utils/checkAuth");

module.exports = {
    Query: {
        async getPosts(){
          try{
            const posts = await Post.find();
            return posts;
          } catch(err){
            throw new Error(err);
          }
        }, 
        async getPost(_, { postId }){
            try{
                const post = await Post.findById(postId);
                if (post){
                    return post;
                } else {
                    throw new Error("Post not found");
                }
            } catch(err){
                throw new Error(err);
            }
        }, 

      }, 
      Mutation: {
        async createPost(_, { content }, context){
            console.log(context);
            const user = checkAuth(context);
            console.log("Auth checked");
            const newPost = new Post({
                content: content, 
                user : user.id, 
                username: user.username, 
                createdAt: new Date().toISOString()
            });

            const post = await newPost.save();

            return post;
        }
    }
}