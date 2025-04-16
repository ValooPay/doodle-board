import DoodlePost from "../components/DoodlePost"
import { AllPostsContext } from "../contexts/AllPostsContext"
import { UserLoginContext } from "../contexts/UserLogInContext"
import { useContext, useState } from "react"
import { useParams } from "react-router-dom"
import styled from "styled-components"


const SinglePost = () => {
    const {allPosts} = useContext(AllPostsContext)
    const {userLogin} = useContext(UserLoginContext)
    const doodleId = useParams()
    const [status, setStatus] = useState("idle")
    const [comment, setComment] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    return <> 
        {allPosts !== null ? allPosts.map((post) => {
            if(doodleId._id === post._id){
                return <StyledPost key={post._id}>
                    <DoodlePost 
                    post={post} 
                    userLogin={userLogin} 
                    comment={comment}
                    setComment={setComment} 
                    status={status}
                    setStatus={setStatus}
                    errorMessage={errorMessage}
                    setErrorMessage={setErrorMessage}
                    />
                </StyledPost>
            }
        })
        : <p>Loading...</p>
        } 
        </>
}

export default SinglePost

const StyledPost = styled.div`
    background-color: var(--color-honeydew);
    border: dashed 2px var(--color-teal1);
    padding: 1rem;
    margin: 2rem auto;
    width: 80vw;

`