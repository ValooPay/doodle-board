Users

{
    _id: uuid(), (string)
    username, (string)
    email, (string)
    password, (string)
    createdPosts, (array with post_id)
    likedPosts (array with post_id)
    timestamps (array of numbers)
}


Posts

{
    user_id, (string)
    (post)_id, (string)
    title, (string)
    date, (date object)
    img, (string (base64))
    shared, (boolean/true/false)
    liked (array (user_id)),
    comments: {(fromUser) username (string), date timestamp(date object), message (string)}
}