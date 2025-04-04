const express = require("express");
const morgan = require("morgan");

const PORT = 4000;

const app = express();

const { getUsers, getUserLogin, createUser, getPosts, createPost, editPost, deletePost } = require("./handlers")

app.use(express.json());
app.use(morgan("tiny"));

///// USER(S)-RELATED HANDLERS
app.get("/users", getUsers);
app.post("/userlogin", getUserLogin);
app.post("/signup", createUser);

///// POST(S)-RELATED HANDLERS
app.get("/posts", getPosts);
app.post("/newpost", createPost);

///// EDIT POST
app.patch("/editpost/:userId/:doodleId", editPost);

///// DELETE POST
app.delete("/deleted/:userId/:doodleId", deletePost)


app.use(/(.*)/, (req, res) => {
    res.status(404).json({
        status: 404,
        message: "You've hit the catch all! Uh oh..."
    });
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
});