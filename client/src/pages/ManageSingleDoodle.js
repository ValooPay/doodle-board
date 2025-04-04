import { UserLoginContext } from "../contexts/UserLogInContext"
import { useContext, useState } from "react"
import { useParams } from "react-router-dom"
import { Navigate, useNavigate } from "react-router-dom"
import { AllPostsContext } from "../contexts/AllPostsContext"
import styled from "styled-components"

const ManageSingleDoodle = () => {
    const { userLogin } = useContext(UserLoginContext)
    const { allPosts, setRefetch } = useContext(AllPostsContext)
    const navigate = useNavigate()

    const userAndDoodleId = useParams()
    const userId = userAndDoodleId.user_id
    const doodleId = userAndDoodleId._id
    
    const [newTitle, setNewTitle] = useState()
    const [newDescription, setNewDescription] = useState()
    const [shared, setShared] = useState()
    const [status, setStatus] = useState("idle")
    const [errorMessage, setErrorMessage] = useState(null)

    ///// Checks beforehand to see if user is logged in
    if(userLogin === null){
        return <div className="pages"><p>Log in to view content</p></div>
    }
    if(userLogin._id !== userId){
        navigate("/posts")
    }

    ///// Find post with the same doodleId
    const foundPost = allPosts.find((post) => post._id === doodleId)

    ///// Function to edit post
    const handleSubmit = (ev) => {
        ev.preventDefault()
        setStatus("Processing...")
        const body = JSON.stringify({newTitle, newDescription, shared})
        const options = {
            method: "PATCH",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }, body
        }
        fetch(`/editpost/${userId}/${doodleId}`, options)
        .then(response => response.json())
        .then(data => {
            if(data.status !== 200){
                setStatus("idle")
                throw new Error(data.message)
            }
            else{
                setRefetch((fetch) => fetch + 1)
                setStatus("idle")
                return <p>Edited successfully!</p>
            }
        })
        .catch(err => {
            setErrorMessage(err.message)
        })
    }

    /// Function to delete post
    const handleDelete = (ev) => {
        ev.preventDefault()
        setStatus("Processing...")
        const options = {
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        }
        fetch(`/deleted/${userId}/${doodleId}`, options)
        .then(response => response.json())
        .then(data => {
            if(data.status !== 200){
                setStatus("idle")
                throw new Error(data.message)
            }
            else{
                setRefetch((fetch) => fetch + 1)
                setStatus("idle")
                navigate(`/managedoodles/${userId}`)
                return <p>Successfully deleted!</p>
            }
        })
        .catch(err => {
            setErrorMessage(err.message)
        })
    }

    return userLogin._id === null ? <></> : <>
    <div className="pages">
        <StyledPostEdit>
            <img src={foundPost.img} />
            { <div style={{display: "flex", flexDirection: "column", border: "1px dashed var(--color-teal1)", justifyContent: "center", padding: "1rem"}}>
            <form onSubmit={handleSubmit} style={{display: "flex", flexDirection: "column"}}>
                <label htmlFor="title" style={{display: "flex", justifyContent: "space-between", margin: "0.5rem"}}>Title: 
                    <input type="text" placeholder={foundPost.title === null ? "Title" : <></>} defaultValue={foundPost.title !== null ? foundPost.title : null} id="title" onChange={(ev) => {setNewTitle(ev.target.value)}}></input>
                </label>
                <label htmlFor="description" style={{display: "flex", justifyContent: "space-between", margin: "0.5rem"}}>Description: 
                    <textarea type="text" placeholder={foundPost.description === null ? "Description" : <></>} defaultValue={foundPost.description !== null ? foundPost.description : null} id="description" onChange={(ev) => {setNewDescription(ev.target.value)}}></textarea>
                </label>
                <button type="submit" disabled={status !== "idle"} onClick={() => setShared(true)} style={{width: "fit-content", margin: "0.5rem auto"}}>Post</button>
                <button type="submit" disabled={status !== "idle"} style={{width: "fit-content", margin: "0.5rem auto"}}>Save</button>
                <button type="submit" disabled={status !== "idle"} onClick={handleDelete} style={{width: "fit-content", margin: "0.5rem auto"}}>Delete</button>
            </form>
            </div> }
        </StyledPostEdit>
        {errorMessage === null ? <></> : <p>{errorMessage}</p>}
    </div>
</>
}

export default ManageSingleDoodle

const StyledPostEdit = styled.div`
    display: flex;
    flex-direction: row;
    background-color: var(--color-white);
    padding: 1rem;
    margin: 3rem;
    border-radius: 5px;
    border: dashed 2px var(--color-teal1);
    max-width: 100%;
    justify-content: space-around;
    img{
        max-width: 50%;
        border: dashed 1px var(--color-teal1);
    }
`