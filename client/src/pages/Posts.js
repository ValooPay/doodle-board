import { AllPostsContext } from "../contexts/AllPostsContext.js"
import { UserLoginContext } from "../contexts/UserLogInContext.js"
import { useContext, useState } from "react"
import BunchOfClouds from "../components/BunchOfClouds"
import DoodlePost from "../components/DoodlePost.js"
import styled from "styled-components"

const Posts = () => {
    const {allPosts, handleLoadMore, visible} = useContext(AllPostsContext)
    const {userLogin} = useContext(UserLoginContext)
    const [status, setStatus] = useState("idle")
    const [comment, setComment] = useState("")
    const [errorMessage, setErrorMessage] = useState("")


    return <div className="pages">
        <h1 style={{margin: "2rem 0 3rem"}}>Doodles</h1>
        <BunchOfClouds />
        {allPosts === null ? <p>Loading...</p> : <>
            {allPosts.filter((post) => post.shared === true).slice(0, visible).map((post) => {
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
            })}
            <div>
                {allPosts.filter((post) => post.shared === true).length <= visible === true ? <p style={{margin: "auto auto 2rem", fontWeight: "bold"}}>You're reached the end! Aww...</p> : <></>}
                <button className="loadMoreButton" id="loadMoreButton" disabled={allPosts.filter((post) => post.shared === true).length <= visible} onClick={handleLoadMore} type="button">Load more</button> 
            </div>
        </>}
    </div>
}

export default Posts

const StyledPost = styled.div`
    background-color: var(--color-honeydew);
    border: dashed 2px var(--color-teal1);
    padding: 1rem;
    margin: 2rem auto;
    width: 80vw;

`