import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
:root{
    --color-french-rose: #F44174;
    --color-honeydew: #E1EFE6;
    --color-dark-green: #062726;
    --color-orange1: #dda15e;
    --color-orange2: #bc6c25;
    --color-teal1: #006d77;
    --color-teal2: #83c5be;
    --color-white: #edf6f9;
    --color-light-orange: #FEE1C7;
    --color-bittersweet: #FA7E61;
    --color-peach1: #ffddd2;
    --color-peach2: #e29578;
}

body {
    max-width: 100dvw;
    min-height: 100dvh;
    text-align: center;
    font-family: "Exo 2";
    word-break: break-word;
    background-color: var(--color-teal2);
    overflow-x: hidden;
    color: var(--color-dark-green);
    display: flex;
    flex-direction: column;
}

button{
    font-family: "Exo 2";
    font-weight: bold;
    font-size: 0.9rem;
    background-color: var(--color-orange1);
    color: var(--color-white);
    border: 3px solid var(--color-orange2);
    border-radius: 5px;
    padding: 0.3rem;
}
button:hover{
    cursor: pointer;
}
button:active{
    background-color: var(--color-orange2);
    border-style: inset;
    transform: scale(0.95);
}
button:disabled{
    opacity: 50%;
    cursor: not-allowed;
}

h1{
    font-family: "Rubik Bubbles";
    font-weight: bold;
    font-size: 7rem;
    color: white;
    text-shadow: 7px 7px  rgba(0, 0, 0, 0.2);
}
h2{
    font-family: "Rubik Bubbles";
    font-size: 3rem;
    color: white;
    margin: 2rem;
    text-shadow: 4px 4px  rgba(0, 0, 0, 0.2);
}

a{
    color: var(--color-peach1);
    text-shadow: 2px -1px 1px var(--color-french-rose);
    text-decoration: none;
}
a:hover{
    color: var(--color-white);
    cursor: pointer;
}
a:active{
    color: var(--color-peach2);
    transform: scale(0.95);
}

li{
    padding: 0.5rem;
}

li::marker{
    color: var(--color-white);
}

input, textarea{
    font-family: "Exo 2";
    border: 2px solid var(--color-orange2);
    padding: 4px;
}
`

export default GlobalStyles