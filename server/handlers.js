const {MongoClient} = require("mongodb");
require("dotenv").config();
const {MONGO_URI} = process.env;
const {v4: uuidv4} = require("uuid");

const DB = "doodle_board_data"
const USERS_COLLECTION = "users"
const POSTS_COLLECTION = "posts"


///// USERS HANDLERS

const getUsers = async (req, res) => {
    const client = new MongoClient(MONGO_URI)

    try{
        await client.connect()
        const db = client.db(DB)
        const allUsers = await db.collection(USERS_COLLECTION).find().project({_id: 0, username: 1, createdPosts: 1}).toArray()
        if(allUsers.length === 0){
            return res.status(404).json({
                status: 404,
                message: "No users found"
            })
        }
        res.status(200).json({
            status: 200,
            data: allUsers
        })
    }
    catch(error){
        console.error("Error fetching users", error)
        res.status(500).json({
            status: 500,
            message: error.message
        })
    }
    finally {
        await client.close()
    }
}

const getUserLogin = async (req, res) => {
    const client = new MongoClient(MONGO_URI)
    const {username, password} = req.body
    try{

        await client.connect()
        const db = client.db(DB)
        const foundUser = await db.collection(USERS_COLLECTION).findOne({username})

        if(username.length === 0){
            return res.status(400).json({
                status: 400,
                message: "Please enter your username"
            })
        }
        if(password.length === 0){
            return res.status(400).json({
                status: 400,
                message: "Please enter your password"
            })
        }
        if(foundUser === null){
            return res.status(404).json({
                status: 404,
                message: `User with username " ${username} " does not exist.`
            })
        }
        if(password === null || password !== foundUser.password){
            return res.status(400).json({
                status: 400,
                message: "Input password is wrong"
            })
        }
        res.status(200).json({
            status: 200,
            data: foundUser
        })
    }
    catch(error){
        console.error("Error fetching user", error)
        res.status(500).json({
            status: 500,
            message: error.message
        })
    }
    finally {
        await client.close()
    }
}

const createUser = async (req, res) => {
    const _id = uuidv4()
    const createdPosts = []
    const likedPosts = []
    const { username, email, password } = req.body
    const client = new MongoClient(MONGO_URI)
    try {
        await client.connect()
        const db = client.db(DB)
        const testSearchForUsername = await db.collection(USERS_COLLECTION).findOne({username})
        const testSearchForEmail = await db.collection(USERS_COLLECTION).findOne({email})

        if((username || password || email) === undefined){
            return res.status(400).json({
                status: 400,
                message: "Please input your username, email and password."
            })
        }
        if(testSearchForUsername){
            return res.status(400).json({
                status: 400,
                message: `User with username ${username} already exists.`
            })
        }
        if(testSearchForEmail){
            return res.status(400).json({
                status: 400,
                message: "This email is already in use."
            })
        } else {
            const newUser = await db.collection(USERS_COLLECTION).insertOne({ _id, username, email, password, createdPosts, likedPosts })
            res.status(200).json({
                status: 200,
                data: newUser
            })
        }
    } 
    catch(error){
        console.error("Error creating user", error)
        res.status(500).json({
            status: 500,
            message: error.message
        })
    }
    finally {
        await client.close()
    }
}


///// POSTS HANDLERS

const getPosts = async (req, res) => {
    const client = new MongoClient(MONGO_URI)

    try{
        await client.connect()
        const db = client.db(DB)
        const allPosts = await db.collection(POSTS_COLLECTION).find().sort({ $natural: -1 }).toArray()
        if(allPosts.length === 0){
            return res.status(404).json({
                status: 404,
                message: "No posts found"
            })
        }
        res.status(200).json({
            status: 200,
            data: allPosts
        })
    }
    catch(error){
        console.error("Error fetching posts", error)
        res.status(500).json({
            status: 500,
            message: error.message
        })
    }
    finally {
        await client.close()
    }
}

const createPost = async (req, res) => {
    const { username, user_id, date, img } = req.body
    const _id = uuidv4()
    const liked = [];
    const comments = [];
    const title = "";
    const description = "";

    const client = new MongoClient(MONGO_URI)
    try {
        await client.connect()
        const db = client.db(DB)
        const addCreatedPost = await db.collection(USERS_COLLECTION).updateOne({username}, {$push: {createdPosts: _id}})

        if(addCreatedPost.matchedCount === 0){
            return res.status(404).json({
                status: 404,
                message: "You have to be logged in to post a drawing"
            })
        } else if (addCreatedPost.modifiedCount === 0) {
            return res.status(400).json({
                status: 400,
                message: "Post already added"
            })
        } else {
            const createNewPost = await db.collection(POSTS_COLLECTION).insertOne({ _id, user_id, username, date, img, title, description, shared: false, liked, comments })
            res.status(200).json({
                status: 200,
                data: createNewPost
            })
            console.log(createNewPost)
        }
    } 
    catch(error){
        console.error("Error creating user", error)
        res.status(500).json({
            status: 500,
            message: error.message
        })
    }
    finally {
        await client.close()
    }
}

const editPost = async (req, res) => {
    const client = new MongoClient(MONGO_URI)

    const { newTitle, newDescription, shared } = req.body;
    const userId = req.params.userId;
    const doodleId = req.params.doodleId

    try{
        await client.connect()
        const db = client.db(DB)
        const updatedPost = await db.collection(POSTS_COLLECTION).updateOne({_id: doodleId, user_id: userId}, {$set: {title: newTitle, description: newDescription, shared: shared }})

        if(updatedPost.matchedCount === 0){
            return res.status(404).json({
                status: 404,
                message: "No doodle found"
            })
        }
        if(updatedPost.matchedCount === 1 && updatedPost.modifiedCount === 0){
            return res.status(409).json({
                status: 409,
                message: "No changes were made"
            })
        }
        res.status(200).json({
            status: 200,
            data: updatedPost
        })
    }
    catch(error){
        console.error("Error editing post", error)
        res.status(500).json({
            status: 500,
            message: error.message
        })
    }
    finally {
        await client.close()
    }
}

const deletePost = async (req, res) => {
    const client = new MongoClient(MONGO_URI);
    const userId = req.params.userId;
    const doodleId = req.params.doodleId

    try{
        const db = client.db(DB);
        const deletedPost = await db.collection(POSTS_COLLECTION).deleteOne({_id: doodleId, user_id: userId})
        const updatedUserCreatedPosts = await db.collection(USERS_COLLECTION).updateOne({_id: userId}, {$pull: {createdPosts: doodleId}})
        if(deletedPost.deletedCount === 0){
            res.status(409).json({
                status: 409, 
                message: "No post with this _id exists"
            })
        }
        else {
            res.json({
                status: 200,
                data: deletedPost
            })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            message: error.message,
        })
    } finally {
        client.close();
    }
}



module.exports = { getUsers, getUserLogin, createUser, getPosts, createPost, editPost, deletePost };