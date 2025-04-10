import { AllPostsContext } from "../contexts/AllPostsContext"
import { useContext, useState } from "react"

const DoodlePost = ({post, userLogin, comment, setComment, setLike, like, status, setStatus, errorMessage, setErrorMessage }) => {
    const {setRefetch} = useContext(AllPostsContext) 
    const [hiddenStatus, setHiddenStatus] = useState(true)

    const handleLikeDoodle = (ev) => {
        ev.preventDefault()
        setLike("Liking!")
        const body = JSON.stringify({userId: userLogin._id, postId: post._id})
        const options = {
            method: "PATCH",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }, body
        }
        fetch(`/like/${post._id}/${userLogin._id}`, options)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setRefetch((fetch) => fetch + 1)
            setLike("")
        })
        .catch(err => {
            setErrorMessage(err.message)
        })
    }

    const handleUnlikeDoodle = (ev) => {
        ev.preventDefault()
        setLike("Removing like...")
        const body = JSON.stringify({userId: userLogin._id, postId: post._id})
        const options = {
            method: "PATCH",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }, body
        }
        fetch(`/unlike/${post._id}/${userLogin._id}`, options)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setRefetch((fetch) => fetch + 1)
            setLike("")
        })
        .catch(err => {
            setErrorMessage(err.message)
        })
    }

    const handlePostComment = (ev) => {
        ev.preventDefault()
        setStatus("Processing...")
        const body = JSON.stringify({message: comment, username: userLogin.username, postId: post._id})
        const options = {
            method: "PATCH",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }, body
        }
        fetch(`/comment/${post._id}/${userLogin._id}`, options)
        .then(response => response.json())
        .then(data => {
            if(data.status !== 200){
                setStatus("idle")
                throw new Error(data.message)
            }
            else{
                setRefetch((fetch) => fetch + 1)
                setStatus("idle")
                return console.log("Comment succesfully posted!")
            }
        })
        .catch(err => {
            setErrorMessage(err.message)
            return <p>{errorMessage}</p>
        })
        }

    const handleRemoveComment = (comment) => {
        console.log(comment)
        const body = JSON.stringify({ postId: post._id, username: comment.fromUser, date: comment.date, message: comment.message })
        const options = {
            method: "PATCH",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }, body
        }
        fetch(`/removecomment/${post._id}`, options)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setRefetch((fetch) => fetch + 1)
        })
        .catch(err => {
            setErrorMessage(err.message)
        })

    }

    
return <div key={post._id}>
                    <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px dashed var(--color-teal2)", paddingBottom: "1rem" }}>
                        <div style={{display: "flex", alignItems: "center"}}>
                            <p style={{fontWeight: "bold"}}>User: <span style={{fontWeight: "normal"}}>{post.username}</span></p>
                            <p style={{fontWeight: "bold", margin: "0 1rem"}}>Title: <span style={{fontWeight: "normal"}}>{post.title}</span></p>
                        </div>
                        <div style={{display: "flex", alignItems: "center"}}>
                            <p style={{fontWeight: "bold"}}>Date: <span style={{fontWeight: "normal"}}>{post.date}</span></p>
                            {userLogin === null ? <></> : post.liked.includes(userLogin._id) === false ? 
                                <div>
                                    <button className="likeButton" onClick={handleLikeDoodle}>♡</button>
                                    <p style={{position: "absolute"}}>{like}</p>
                                </div> 
                                :
                                <div>
                                    <button className="likeButton" onClick={handleUnlikeDoodle}>♥</button>
                                    <p style={{position: "absolute"}}>{like}</p>
                                </div>
                            }
                        </div>
                    </div>
                    
                    <div style={{display: "flex", margin: "1rem 0"}}>
                        <p style={{fontWeight: "bold", wordBreak: "keep-all"}}>Description: </p>
                        <span style={{fontWeight: "normal", marginLeft: "0.5rem", textAlign: "left"}}>{post.description}</span>
                    </div>

                    <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}} >
                        <div onClick={() => {hiddenStatus === true ? setHiddenStatus(false) : hiddenStatus}} className="responsive">
                            <div className="postImg">
                                <img src={post.img} style={{height: "auto", width: "100%", backgroundColor: "white", border: "dashed 1px var(--color-teal2)"}} />
                            </div>
                        </div>
                        
                        {hiddenStatus === true ? <></> : 
                            <div className="postImgEnlarged">
                                <button style={{position: "absolute", right: "2rem", top: "2rem"}} onClick={() => {hiddenStatus === false ? setHiddenStatus(true) : hiddenStatus}}>X Close</button>
                                <img src={post.img} style={{height: "auto", width: "100%", backgroundColor: "white"}}></img>
                            </div>
                        }

                        <div style={{display: "flex", flexDirection: "column", justifyContent: "space-between", textAlign: "left", width: "100%", padding: "1rem", border: "1px dashed var(--color-teal2)", marginLeft: "1rem"}}>
                            <p style={{fontWeight: "bold"}}>Comments: </p>
                            {post.comments.map((comment) => {
                                return <div key={comment.date} style={{fontWeight: "normal", padding: "0.5rem 0 ", borderBottom: "dashed 2px var(--color-teal1)"}}>
                                    <div style={{display: "flex", justifyContent: "space-between", marginBottom: "0.2rem"}}>
                                        <div style={{display: "flex"}}>
                                            <p style={{fontWeight: "bold", textDecoration: "underline 1px",  marginRight: "0.5rem"}}>{comment.fromUser}</p>
                                            <p style={{textDecoration: "underline 1px"}}>( {comment.date} ) commented : </p>
                                        </div>
                                        {userLogin !== null && userLogin.username === comment.fromUser ? 
                                            <button className="deleteCommentButton" onClick={() => {handleRemoveComment(comment)}}>X</button> : <></>}
                                    </div>
                                    <p style={{margin: "0.75rem auto 0.25rem"}}>{comment.message}</p>
                                    
                                </div>
                            })}
                            
                            {userLogin === null ? <></> : 
                            <form onSubmit={handlePostComment} style={{alignSelf: "end", width: "100%"}}>
                                <label style={{display: "flex", justifyContent: "center", marginTop: "1rem"}}>
                                    <textarea style={{width: "100%"}} type="text" onChange={(ev) => {setComment(ev.target.value)}}></textarea>
                                    <button disabled={status !== "idle"} style={{margin: "0 1rem"}}>Add comment</button>
                                </label>
                            </form>
                            }
                        </div>
                    </div>
                </div>
}

export default DoodlePost