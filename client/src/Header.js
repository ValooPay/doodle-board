import styled from "styled-components";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { UserLoginContext } from "./contexts/UserLogInContext.js"


const Header = () => {
    const [ loginUsername, setLoginUsername ] = useState("");
    const [ loginPassword, setLoginPassword ] = useState("");
    const [ fetchingStatus, setFetchingStatus ] = useState("idle")
    const [ errorMessage, setErrorMessage ] = useState(null)
    const { userLogin, logIn, logOut } = useContext(UserLoginContext)
    const navigate = useNavigate()

    ///// Handle submit for logging in
    const handleSubmit = (ev) => {
        ev.preventDefault()
        setFetchingStatus("fetching")
        const body = JSON.stringify({username: loginUsername, password: loginPassword})
        const options = {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }, body
        }
        fetch("/userlogin", options)
        .then(response => response.json())
        .then(data => {
            if(data.status !== 200){
                setFetchingStatus("idle")
                throw new Error(data.message)
            }
            else{
                logIn(data.data)
                setErrorMessage(null)
                setFetchingStatus("idle")
                localStorage.setItem("timestamp", JSON.stringify(data.timestamp))
                localStorage.setItem("userId", JSON.stringify(data.data._id))
            }
        })
        .catch(err => {
            setErrorMessage(err.message)
        })
    }

    return <> 
    <StyledHeader>
        {userLogin === null ? <>
        <Link to="/" style={{margin: "auto 0"}}>Home</Link>
        <StyledLoginSignup>
            <form onSubmit={handleSubmit}>
                <label className="headerSpacing" htmlFor="usernameInput">Username: <input onChange={(ev) => {setLoginUsername(ev.target.value)}} id="usernameInput" type="text" placeholder="Your Username"></input></label>
                <label className="headerSpacing" htmlFor="passwordInput">Password: <input onChange={(ev) => {setLoginPassword(ev.target.value)}} id="passwordInput" type="password" placeholder="Your Password"></input></label>
                <button disabled={fetchingStatus !== "idle"} type="submit">Log in</button>
            </form>
            <Link to="/newAccount" style={{margin: "auto 4rem"}}>Sign up</Link>
        </StyledLoginSignup>
        </> : <>
        <Link to="/posts" style={{margin: "auto 0"}}>Posts</Link>
        <Link to={`/createdrawing/${userLogin._id}`} style={{display:"flex", marginRight: "auto", marginLeft: "2rem", width:"fit-content"}} >New drawing</Link>
        <StyledLoginSignup>
        <p style={{marginRight: "1.5rem"}}>Hello <Link to={`/managedoodles/${userLogin._id}`}>{userLogin.username}</Link> !</p> 
        <Link onClick={logOut}>Log out</Link>
        </StyledLoginSignup>
        </>}
    </StyledHeader>
    {errorMessage === null ? <></> : <>
        <p className="errorMessageLogin">{errorMessage}</p>
    </>}
    </>
}

export default Header

const StyledHeader = styled.div`
    display: flex;
    flex-direction: row;
    top: 0;
    position: sticky;
    justify-content: space-between;
    padding: 1rem 0;
    background-color: var(--color-teal1);
    color: var(--color-orange1);
    text-shadow: 2px -1px 1px var(--color-orange2);
    font-weight: bold;
    font-size: 1.5rem;
    padding-left: 1rem;
    z-index: 5;
`

const StyledLoginSignup = styled.div`
    font-size: 1.25rem;
    padding-right: 1rem;
    display: flex;
    flex-direction: row;
    position: relative;
`