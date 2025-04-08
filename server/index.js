const express = require("express");
const morgan = require("morgan");

const PORT = 4000;

const app = express();

const { getUsers, getUserLogin, createUser, getPosts, createPost, editPost, likePost, unlikePost, commentOnPost, removeCommentFromPost, deletePost } = require("./handlers")

app.use(express.json());
app.use(morgan("tiny"));

///// USER(S)-RELATED HANDLERS
app.get("/users", getUsers);
app.post("/userlogin", getUserLogin);
app.post("/signup", createUser);


///// POST(S)-RELATED HANDLERS

///// GET POSTS & MAKE A NEW POST
app.get("/posts", getPosts);
app.post("/newpost", createPost);

///// EDIT POST
app.patch("/editpost/:userId/:doodleId", editPost);
app.patch("/like/:postId/:userId", likePost);
app.patch("/unlike/:postId/:userId", unlikePost);
app.patch("/comment/:postId/:userId", commentOnPost);
app.patch("/removecomment/:postId", removeCommentFromPost)

///// DELETE POST
app.delete("/deleted/:userId/:doodleId", deletePost);


app.use(/(.*)/, (req, res) => {
    res.status(404).json({
        status: 404,
        message: "You've hit the catch all! Uh oh..."
    });
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
});