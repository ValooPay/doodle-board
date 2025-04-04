Users

{
    _id: uuid(), (string)
    username, (string)
    email, (string)
    password, (string)
    createdPosts, (array)
    likedPosts (array)
}


Posts

{
    user_id, (string)
    (post)_id, (string)
    title, (string)
    date, (string)
    img, (object, {src, alt} ? )
    shared, (true/false)
    liked,
    comments: {user (string), date(string), comment(string)}
}