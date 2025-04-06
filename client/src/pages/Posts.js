import { AllPostsContext } from "../contexts/AllPostsContext.js"
import { useContext } from "react"
import styled from "styled-components"

const Posts = () => {
    const {allPosts} = useContext(AllPostsContext)

    return <div className="pages">
    {allPosts === null ? <><p>Nothing to see here</p></> : <>
    {allPosts.map((post) => {
        console.log(post)
        if(post.shared === true){
            return <StyledPost key={post._id}>
                <p>{post.username}</p>
                <p>{post.date}</p>
                <p>{post.title}</p>
                <p>{post.description}</p>
                <img src={post.img}></img>
                <p>{post.comments}</p>
            </StyledPost>
        }
    })}
    </>}
    </div>
}

export default Posts

const StyledPost = styled.div`
    background-color: var(--color-white);
    border: dashed 2px var(--color-teal1);
    padding: 1rem;
    margin: 2rem;
`