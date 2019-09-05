import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  html {
    font: 125%/1.4 'Cabin Condensed','georgia',sans-serif;
    box-sizing: border-box;
    overflow-y: scroll;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  body {
    color: hsla(0,0%,0%,0.87);
    font-family: 'Cabin Condensed','georgia',sans-serif;
    font-weight: 400;
    word-wrap: break-word;
    font-kerning: normal;
    font-feature-settings: "kern", "liga", "clig", "calt";
    letter-spacing: .03em;
  }
  h1 {
    margin-left: 0;
    margin-right: 0;
    margin-top: 0;
    padding-bottom: 0;
    padding-left: 0;
    padding-right: 0;
    padding-top: 0;
    margin-bottom: 1.4rem;
    color: inherit;
    font-family: 'Patua One',sans-serif;
    font-weight: 400;
    text-rendering: optimizeLegibility;
    font-size: 2rem;
    line-height: 1.1;
  }
  h2 {
    margin-left: 0;
    margin-right: 0;
    margin-top: 0;
    padding-bottom: 0;
    padding-left: 0;
    padding-right: 0;
    padding-top: 0;
    margin-bottom: 1.4rem;
    color: inherit;
    font-family: 'Patua One',sans-serif;
    font-weight: 400;
    text-rendering: optimizeLegibility;
    font-size: 1.51572rem;
    line-height: 1.1;
  }
  h3 {
    margin-left: 0;
    margin-right: 0;
    margin-top: 0;
    padding-bottom: 0;
    padding-left: 0;
    padding-right: 0;
    padding-top: 0;
    margin-bottom: 1.4rem;
    color: inherit;
    font-family: 'Patua One',sans-serif;
    font-weight: 400;
    text-rendering: optimizeLegibility;
    font-size: 1.31951rem;
    line-height: 1.1;
  }
  p {
    margin-left: 0;
    margin-right: 0;
    margin-top: 0;
    padding-bottom: 0;
    padding-left: 0;
    padding-right: 0;
    padding-top: 0;
    margin-bottom: 1.4rem;
  }
  
`

export default GlobalStyle