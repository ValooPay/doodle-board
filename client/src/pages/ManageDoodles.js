import { UserLoginContext } from "../contexts/UserLogInContext"
import { useContext } from "react"
import { useParams } from "react-router-dom"
import { useNavigate, Link } from "react-router-dom"
import { AllPostsContext } from "../contexts/AllPostsContext"
import styled from "styled-components"

const ManageDoodles = () => {
    const { userLogin, autoLoginStatus } = useContext(UserLoginContext)
    const { allPosts } = useContext(AllPostsContext)
    const objectId = useParams()
    const navigate = useNavigate()

    ///// Initial checks
    if(userLogin === null){
        return <div className="pages"><p>Log in to view content</p></div>
    }
    if(userLogin._id !== objectId.user_id){
        navigate("/posts")
    }

    return userLogin.createdPosts.length === 0 ? <p>No doodles to show... yet!</p> : userLogin._id === null ? <div className="pages">Log in to view content</div> : autoLoginStatus === false ? <p>Loading...</p> : allPosts === null ? <p>Loading...</p> : userLogin._id === objectId.user_id ? <>
        <div className="pages">
        <h2>Hidden doodles</h2>
            <StyledPostsGrid>
                {allPosts.map((post) => {
                    if((post.shared === false || post.shared === null) && post.user_id === userLogin._id){
                        return <Link key={post._id} to={`/managedoodles/${userLogin._id}/${post._id}`}><img src={post.img} /></Link>
                }
                })}
            </StyledPostsGrid>
            <h2>Shared doodles</h2>
            <StyledPostsGrid>
                {allPosts.map((post) => {
                    if(post.shared === true && post.user_id === userLogin._id){
                        return <Link key={post._id} to={`/managedoodles/${userLogin._id}/${post._id}`}><img src={post.img} /></Link>
                    }
                })}
            </StyledPostsGrid>
        </div>
    </> : navigate("/posts")
}

export default ManageDoodles

const StyledPostsGrid = styled.div`
    display: grid;
    grid-template-columns: auto auto auto auto;
    gap: 1rem;
    margin: 1rem;
    img{
        max-width: 100%;
        border: 1px dashed var(--color-teal1);
        background-color: var(--color-white);
    }
`