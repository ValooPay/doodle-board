# Doodle board

## Capstone/Final project for the full stack web development bootcamp at Concordia

### Welcome to my final project, my little doodle board!!

First, let me give you a little tiny bit of context.
When I was a kid, just surfing the web aimlessly as you do in the early 2000s, I stumbled across a website that called itself a "oekaki board" (oekaki meaning scribbles/doodles/drawing, in Japanese). It was a website where people could draw and share their art with people and post them, kind of like a forum. In the early days of the Internet, I thought that was incredibly awesome!

Oekaki boards have always held a special place in my heart, I've met some wonderful people through it and learned so much from my experiences... So, I wanted to see if I could recreate something similar for my final project!

Hope you enjoy this silly little website!! 🌞

### Preview

Quick preview & walkthrough: 
https://youtu.be/7Tyty6oGY-o?si=_-HPuvkv8i6a4Yjv

### Features

- Sign up & Log in
- Create new drawing (when logged in)
- View all posts
- View shared/hidden posts made by logged in user & their liked posts
- Update post (Title, description, share status, delete post)
- Post comment & delete comment
- Like & unlike post

### Tech

- **Database**: MongoDB (check DATABASE_DOCUMENTATION.md for details)
- **Frontend**: HTML, CSS, Javascript, React
- **Backend**: Node.js, Express.js

### Endpoints

#### **Users**

| URL | Method | Description | 200 Response | Unsuccessful status codes |
| --- | --- | --- | --- | --- |
| `"/users"` | `GET` | Returns array of all the users (username & created posts) | `{data: allUsers}` | 404, 500 |
| `"/userlogin"` | `POST` | Logs in user upon finding match in database | `{data: userLogin, timestamp: loginDate}` | 400, 404, 500 |
| `"/autologin"` | `POST` | Checks time "token" to see if user should be logged in automatically or not | `{data: foundUser}` | 401, 404, 408, 500 |
| `"/signup"` | `POST` | Creates new user (check DATABASE_DOCUMENTATION for full info) | `{data: newUser}` | 400, 500 |

#### **Posts**

| URL | Method | Description | 200 Response | Unsuccessful status codes |
| --- | --- | --- | --- | --- |
| `"/posts"` | `GET` | Returns an array of all the created posts | `{data: allPosts}` | 404, 500 |
| `"/posts/:userId"` | `GET` | Returns an array of posts created by a specific user | `{data: userPosts}` | 404, 500 |
| `"/newpost"` | `POST` | Creates a new post with the finished drawing | `{data: createNewPost}` | 400, 404, 500 |
| `"/editpost/:userId/:doodleId"` | `PATCH` | Edit content of a post made by user | `{data: updatedPost}` | 404, 409, 500 |
| `"/like/:postId/:userId"` | `PATCH` | Adds (post)_id to user's list of Liked posts & adds (user)_id to the post's likes | `{data: {addLikeToPost, addLikeToUser}}` | 404, 409, 500 |
| `"/unlike/:postId/:userId"` | `PATCH` | Removes (post)_id to user's list of Liked posts & removes (user)_id to the post's likes | `{data: {removeLikeToPost, removeLikeToUser}}` | 404, 409, 500 |
| `"/comment/:postId/:userId"` | `PATCH` | Adds object with username, date & message to a post's comments | `{data: updatedPost}` | 404, 500 |
| `"/removecomment/:postId"` | `PATCH` | Removes object with username, date & message to a post's comments | `{data: removeMessageFromPost}` | 404, 409, 500 |
| `"/deleted/:userId/:doodleId"` | `DELETE` | Deletes selected post from logged in user | `{data: deletedPost}` | 409, 500 |