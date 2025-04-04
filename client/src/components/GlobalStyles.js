import { createGlobalStyle } from "styled-components";

const GlobalStyles = CreateGlobalStyle`
    :root {
    --gradient-bg: linear-gradient(
        180deg,
        hsl(0deg 65% 77%) 0%,
        hsl(5deg 71% 77%) 18%,
        hsl(10deg 76% 78%) 26%,
        hsl(14deg 80% 79%) 33%,
        hsl(18deg 83% 80%) 39%,
        hsl(22deg 86% 80%) 44%,
        hsl(26deg 88% 81%) 50%,
        hsl(29deg 89% 82%) 56%,
        hsl(33deg 89% 83%) 61%,
        hsl(38deg 89% 84%) 67%,
        hsl(42deg 88% 85%) 74%,
        hsl(48deg 86% 87%) 82%,
        hsl(55deg 84% 88%) 100%
        );
    }
`