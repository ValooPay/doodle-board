import { UserLoginContext } from "../contexts/UserLogInContext"
import { useContext } from "react"
import { useParams } from "react-router-dom"
import { useNavigate, Link } from "react-router-dom"
import { AllPostsContext } from "../contexts/AllPostsContext"
import { UserSpecificPostsContext } from "../contexts/UserSpecificPostsContext"
import styled from "styled-components"

const ManageDoodles = () => {
    const { userLogin } = useContext(UserLoginContext)
    const { allPosts } = useContext(AllPostsContext)
    const { userSpecificPosts } = useContext(UserSpecificPostsContext)
    const objectId = useParams()
    const navigate = useNavigate()

    return userLogin === null ? <div className="pages">Log in to view content</div> : allPosts === null ? <p>Loading...</p> : userSpecificPosts === null ? <p>Loading...</p> : userLogin._id === objectId.user_id ? <>
        <div className="pages">
            <div>
                <h2>Hidden doodles</h2>
                {userLogin.createdPosts.length === 0 ? <p>No doodles created... yet! &#128064;</p> : !userSpecificPosts.find((post) => post.shared === false) ? <p>No hidden doodles... yet! &#128064;</p> : 
                <StyledPostsGrid>
                    {allPosts.map((post) => {
                        if((post.shared === false || post.shared === null) && post.user_id === userLogin._id){
                            return <Link key={post._id} to={`/managedoodles/${userLogin._id}/${post._id}`}><img src={post.img} /></Link>
                    }
                    })}
                </StyledPostsGrid>
                }
                <h2>Shared doodles</h2>
                {userLogin.createdPosts.length === 0 ? <p>No doodles created... yet! &#128064;</p> : !userSpecificPosts.find((post) => post.shared === true) ? <p>No shared doodles... yet! &#128064;</p> : 
                <StyledPostsGrid>
                    {allPosts.map((post) => {
                        if(post.shared === true && post.user_id === userLogin._id){
                            return <Link key={post._id} to={`/managedoodles/${userLogin._id}/${post._id}`}><img src={post.img} /></Link>
                        }
                    })}
                </StyledPostsGrid>
                }
            </div>
            <h2>Liked doodles</h2>
            {userLogin.likedPosts.length === 0 ? <p>No doodles liked... yet! &#128064;</p>
            :
            <StyledPostsGrid>
                {allPosts.map((post) => {
                    if(userLogin.likedPosts.includes(post._id)){
                        return <img src={post.img} key={post.img}></img>
                    }
                })}
            </StyledPostsGrid>
            }
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