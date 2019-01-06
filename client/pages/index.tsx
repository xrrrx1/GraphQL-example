import * as React from "react";
import { App } from "../containers/App";
import { createGlobalStyle, ThemeProvider } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    background: #eee;
    font-family: Georgia, "Times New Roman", Times, serif;
    overflow-y: scroll;
  }
`;

const Index: React.FunctionComponent = () => (
  <React.Fragment>
    <GlobalStyle />
    <App />
  </React.Fragment>
);

export default Index;
