import styled from "styled-components"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

const NewAccount = () => {
    const [ username, setUsername ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ loginEmail, setLoginEmail ] = useState("")
    const [ errorMessage, setErrorMessage ] = useState(null)
    const [ fetchingStatus, setFetchingStatus ] = useState("idle")
    const navigate = useNavigate()

    ///// Handle submit for signing up
    const handleSubmit = (ev) => {
        ev.preventDefault()
        setFetchingStatus("signing up...")
        const body = JSON.stringify({username, password, email: loginEmail})
        const options = {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }, body
        }
        fetch("/signup", options)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if(data.status !== 200){
                setFetchingStatus("idle")
                throw new Error(data.message)
            }
            else{
                setErrorMessage(null)
                setFetchingStatus("idle")
                navigate("/")
            }
        })
        .catch(err => {
            setErrorMessage(err.message)
        })
    }



    return <div className="pages">
        <div style={{display: "flex", justifyContent: "center"}}>
            <h3>Sign up</h3>
        <form onSubmit={handleSubmit} style={{display: "flex", flexDirection: "column", width: "fit-content", margin: "0 auto"}}>
            <label className="signUpLabelsSpacing" htmlFor="usernameSignUpInput">Username: 
                <input id="usernameSignUpInput" type="text" style={{margin: "0.5rem"}} onChange={(ev) => {setUsername(ev.target.value)}}></input>
            </label>
            <label className="signUpLabelsSpacing" htmlFor="passwordSignUpInput">Password: 
                <input id="passwordSignUpInput" type="password" style={{margin: "0.5rem"}} onChange={(ev) => {setPassword(ev.target.value)}}></input>
            </label>
            <label className="signUpLabelsSpacing" htmlFor="emailSignUpInput">Email: 
                <input id="emailSignUpInput" type="email" style={{margin: "0.5rem"}} onChange={(ev) => {setLoginEmail(ev.target.value)}}></input>
            </label>
            <button disabled={fetchingStatus !== "idle"} style={{width: "fit-content", margin: "0 auto"}}>Sign up</button>
        </form>
        {errorMessage === null ? <></> : <>
            <p className="errorMessageLogin">{errorMessage}</p>
        </>}
        </div>
    </div>
}

export default NewAccount

