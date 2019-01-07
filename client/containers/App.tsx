import React, { useContext, useEffect } from "react";
import ApolloClient from "apollo-boost";
import fetch from "isomorphic-fetch";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from "react-apollo";
import styled from "styled-components";

import Title from "../components/Title";
import BookList from "../components/BookList";
import AddBook from "../components/AddBook";
import { AppTitleContext } from "../context/context";

const StyledApp = styled.div`
  h1 {
    text-align: center;
  }
  padding: 0px;
  box-sizing: border-box;
  width: 60%;
  height: 100%;
`;

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  fetch: fetch,
  cache: new InMemoryCache(),
});

export const App: React.FunctionComponent = () => {
  const appTitle = useContext(AppTitleContext);

  useEffect(() => {
    document.title = appTitle;
  });

  return (
    <ApolloProvider client={client}>
      <StyledApp>
        <Title />

        <BookList />
        <AddBook />
      </StyledApp>
    </ApolloProvider>
  );
};
