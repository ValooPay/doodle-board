import { UserLoginContext } from "../contexts/UserLogInContext"
import { useContext, useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Navigate, useNavigate } from "react-router-dom"
import { AllPostsContext } from "../contexts/AllPostsContext"
import styled from "styled-components"

const ManageSingleDoodle = () => {
    const { userLogin } = useContext(UserLoginContext)
    const { allPosts, setRefetch } = useContext(AllPostsContext)
    const navigate = useNavigate()
    const userAndDoodleId = useParams()


    
    ///// States
    const [newTitle, setNewTitle] = useState("")
    const [newDescription, setNewDescription] = useState("")
    const [shared, setShared] = useState("")
    const [status, setStatus] = useState("idle")
    const [errorMessage, setErrorMessage] = useState(null)
    const [image, setImage] = useState(null)
    
    ///// useEffect to set the default values of the inputs
    useEffect(() => {
        if(allPosts !== null){
            ///// Find post with the same doodleId
            const foundPost = allPosts.find((post) => post._id === userAndDoodleId._id)
            if(!foundPost){
                setErrorMessage("Post not found")
            } else{
                setNewTitle(foundPost.title)
                setNewDescription(foundPost.description)
                setShared(foundPost.shared)
                setImage(foundPost.img)
            }
        }
    }, [])

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
        fetch(`/editpost/${userAndDoodleId.user_id}/${userAndDoodleId._id}`, options)
        .then(response => response.json())
        .then(data => {
            if(data.status !== 200){
                setStatus("idle")
                throw new Error(data.message)
            }
            else{
                setRefetch((fetch) => fetch + 1)
                setStatus("idle")
                navigate(`/managedoodles/${userAndDoodleId.user_id}`)
                return console.log("Updated succesfully!")
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
        fetch(`/deleted/${userAndDoodleId.user_id}/${userAndDoodleId._id}`, options)
        .then(response => response.json())
        .then(data => {
            if(data.status !== 200){
                setStatus("idle")
                throw new Error(data.message)
            }
            else{
                setRefetch((fetch) => fetch + 1)
                setStatus("idle")
                navigate(`/managedoodles/${userAndDoodleId.user_id}`)
                return <p>Successfully deleted!</p>
            }
        })
        .catch(err => {
            setErrorMessage(err.message)
        })
    }

    return userLogin === null? <div className="pages"><p>Log in to view content.</p></div> : userLogin._id !== userAndDoodleId.user_id ? navigate("/posts") : allPosts === null ? <p>Loading...</p> : <>
    <div className="pages">
        <StyledPostEdit>
            <img src={image} />
            { <div style={{display: "flex", flexDirection: "column", border: "1px dashed var(--color-teal1)", justifyContent: "center", padding: "1rem"}}>
            <form onSubmit={handleSubmit} style={{display: "flex", flexDirection: "column"}}>
                <label htmlFor="newTitle" style={{display: "flex", justifyContent: "space-between", margin: "0.5rem"}}>Title: 
                    <input type="text" id="newTitle" onChange={(ev) => {setNewTitle(ev.target.value)}} placeholder="Title" defaultValue={newTitle} ></input>
                </label>
                <label htmlFor="newDescription" style={{display: "flex", justifyContent: "space-between", margin: "0.5rem"}}>Description: 
                    <textarea type="text" id="newDescription" onChange={(ev) => {setNewDescription(ev.target.value)}} placeholder="Description" defaultValue={newDescription} ></textarea>
                </label>
                <label htmlFor="sharedSwitch" style={{display: "flex", justifyContent: "left", margin: "0.5rem"}}> Share your doodle?: 
                    <input onClick={() => {shared === true ? setShared(false) : setShared(true)}} defaultChecked={shared === true} id="sharedSwitch" type="checkbox" style={{marginLeft: "1rem"}}></input>
                </label>
                <button type="submit" disabled={status !== "idle"} style={{width: "fit-content", margin: "0.5rem auto"}}>Save changes</button>
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