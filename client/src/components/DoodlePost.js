import { AllPostsContext } from "../contexts/AllPostsContext"
import { UserSpecificPostsContext } from "../contexts/UserSpecificPostsContext"
import { UserLoginContext } from "../contexts/UserLogInContext"
import { useContext, useState } from "react"
import styled from "styled-components"
import { format } from 'date-format-parse'

const DoodlePost = ({post, userLogin, comment, setComment, status, setStatus, errorMessage, setErrorMessage }) => {
    const {setRefetch} = useContext(AllPostsContext) 
    const {setRefetchSpecificPosts} = useContext(UserSpecificPostsContext)
    const { setRefetchUser } = useContext(UserLoginContext)
    const [hiddenStatus, setHiddenStatus] = useState(true)
    const [like, setLike] = useState("")

    const handleLikeDoodle = () => {
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
            if(data.status !== 200){
                setStatus("Error liking post")
                throw new Error(data.message)
            }
            else {
                console.log(data)
                setRefetch((fetch) => fetch + 1)
                setRefetchUser((fetch) => fetch + 1)
                setRefetchSpecificPosts((fetch) => fetch + 1)
                setLike("")
            }
        })
        .catch(err => {
            setErrorMessage(err.message)
        })
    }

    const handleUnlikeDoodle = () => {
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
            if(data.status !== 200){
                setStatus("Error unliking post")
                throw new Error(data.message)
            }
            else {
                console.log(data)
                setRefetch((fetch) => fetch + 1)
                setRefetchUser((fetch) => fetch + 1)
                setRefetchSpecificPosts((fetch) => fetch + 1)
                setLike("")
            }
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
                    <StyledPostContainerTop>
                        <div style={{display: "flex", alignItems: "center"}}>
                            <p>User: <span>{post.username}</span></p>
                            <p style={{margin: "0 1rem"}}>Title: <span>{post.title}</span></p>
                        </div>
                        <div style={{display: "flex", alignItems: "center"}}>
                            <p>Date: <span>{format(post.date, "YYYY-MM-DD HH:mm:ss")}</span></p>
                            {userLogin === null ? <></> : post.liked.includes(userLogin._id) === false ? 
                                <div>
                                    <button className="likeButton grayedout" type="button" onClick={handleLikeDoodle}>♡</button>
                                    <p style={{position: "absolute"}}>{like}</p>
                                </div> 
                                :
                                <div>
                                    <button className="likeButton" type="button" onClick={handleUnlikeDoodle}>♥</button>
                                    <p style={{position: "absolute"}}>{like}</p>
                                </div>
                            }
                        </div>
                    </StyledPostContainerTop>
                    
                    <StyledPostContainerDesc>
                        <p>Description: </p>
                        <span>{post.description}</span>
                    </StyledPostContainerDesc>

                    <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}} >
                        
                        <div className="responsive">
                            <div className="postImg">
                                <img onClick={() => {hiddenStatus === true ? setHiddenStatus(false) : hiddenStatus}} src={post.img} style={{height: "auto", width: "100%", backgroundColor: "white", border: "dashed 1px var(--color-teal2)", cursor: "pointer"}} />
                                <a className="anchorDownloadImage" href={post.img} download="image.png">Download image</a>
                            </div>
                        </div>
                        {hiddenStatus === true ? <></> : 
                            <div className="postImgEnlarged">
                                <button style={{position: "absolute", right: "2rem", top: "2rem"}} onClick={() => {hiddenStatus === false ? setHiddenStatus(true) : hiddenStatus}}>X Close</button>
                                <img src={post.img} style={{height: "auto", width: "100%", backgroundColor: "white"}}></img>
                            </div>
                        }

                        <StyledPostContainerComments>
                            <p>Comments: </p>
                            <div style={{display: "flex", height: "100%", flexDirection: "column", justifyContent: "space-between"}}>
                                <div>
                                    {post.comments.map((comment) => {
                                        return <div key={comment.date} style={{padding: "0.5rem 0", borderBottom: "dashed 2px var(--color-teal1)"}}>
                                            <div style={{display: "flex", justifyContent: "space-between"}}>
                                                <div style={{display: "flex"}}>
                                                    <p>{comment.fromUser}</p>
                                                    <p>( {format(comment.date, "YYYY-MM-DD HH:mm:ss")} ) commented : </p>
                                                </div>
                                                {userLogin !== null && userLogin.username === comment.fromUser ? 
                                                    <button className="deleteCommentButton" onClick={() => {handleRemoveComment(comment)}}>X</button> : <></>}
                                            </div>
                                            <span>{comment.message}</span>
                                                
                                        </div>
                                    })}
                                </div>
                                {userLogin === null ? <></> : 
                                <form onSubmit={handlePostComment}>
                                    <label>
                                        <textarea style={{width: "100%"}} type="text" onChange={(ev) => {setComment(ev.target.value)}}></textarea>
                                        <button disabled={status !== "idle"} style={{margin: "0 1rem"}}>Add comment</button>
                                    </label>
                                </form>
                                }
                            </div>
                        </StyledPostContainerComments>
                    </div>
                </div>
}

export default DoodlePost

const StyledPostContainerTop = styled.div`
display: flex; 
justify-content: space-between; 
align-items: center; 
border-bottom: 1px dashed var(--color-teal2); 
padding-bottom: 1rem;
p{
    font-weight: bold;
}
span{
    font-weight: normal;
}
`
const StyledPostContainerDesc = styled.div`
display: flex; 
margin: 1rem 0;
p{
    font-weight: bold;
    word-break: keep-all
}
span{
    font-weight: normal;
    text-align: left;
    margin-left: 0.5rem;
}
`

const StyledPostContainerComments = styled.div`
display: flex; 
flex-direction: column;
/* justify-content: space-between; */
text-align: left;
width: 100%;
padding: 1rem;
border: 1px dashed var(--color-teal2);
margin-left: 1rem;
p{
    font-weight: bold;
    word-break: keep-all
}
span{
    font-weight: normal;
    text-align: left;
    margin-left: 0.5rem;
}
form{
    align-self: flex-end;
    width: 100%;
}
label{
    display: flex; 
    justify-content: center; 
    margin-top: 1rem;
}
`