import { AllPostsContext } from "../contexts/AllPostsContext.js"
import { UserLoginContext } from "../contexts/UserLogInContext.js"
import { useContext, useState } from "react"
import DoodlePost from "../components/DoodlePost.js"
import styled from "styled-components"

const Posts = () => {
    const {allPosts} = useContext(AllPostsContext)
    const {userLogin} = useContext(UserLoginContext)
    const [status, setStatus] = useState("idle")
    const [comment, setComment] = useState("")
    const [like, setLike] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    // local status

    return <div className="pages">
    {allPosts === null ? <p>Loading...</p> : <>
    {allPosts.map((post) => {
        if(post.shared === true){
            return <StyledPost key={post._id}>
                <DoodlePost 
                    post={post} 
                    userLogin={userLogin} 
                    comment={comment}
                    setComment={setComment} 
                    setLike={setLike} 
                    like={like}
                    status={status}
                    setStatus={setStatus}
                    errorMessage={errorMessage}
                    setErrorMessage={setErrorMessage}
                />
            </StyledPost>
        }
    })}
    </>}
    </div>
}

export default Posts

const StyledPost = styled.div`
    background-color: var(--color-honeydew);
    border: dashed 2px var(--color-teal1);
    padding: 1rem;
    margin: 2rem auto;
    max-width: 80vw;
    img{
        background-color: var(--color-white)
    }
`