import styled from "styled-components"

const Homepage = () => {
    return <div className="pages">
        <h2>Welcome to the</h2>
        <h1>Doodle Board</h1>
        <StyledHomepageRules>
            <h3>Make sure you read these simple rules before making an account!</h3>
            <ul className="homepageRules">
                <li>Be respectful to one another.</li>
                <li>Try to keep things SFW!</li>
                <li>Let your creativity flow and have fun!</li>
            </ul>
        </StyledHomepageRules>
        <div className="cloud transparency"></div>
    </div>
}

export default Homepage

const StyledHomepageRules = styled.div`
    width: fit-content;
    margin: 2rem auto;
    padding: 2rem;
    h3{
        font-size: 2rem;
        font-weight: bold;
    }
`