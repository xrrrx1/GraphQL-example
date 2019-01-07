import React, { useState } from "react";
import styled from "styled-components";
import { graphql } from "react-apollo";

import { getBooksQuery } from "../queries/queries";

import BookDetails from "./BookDetails";

const StyledBookList = styled.div`
  padding: 0;
`;

const StyledBookListLi = styled.div`
  display: inline-flex;
  margin: 12px;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #880e4f;
  box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  color: #880e4f;
`;

const BookList: React.FunctionComponent<BookList> = props => {
  const [selected, changeSelectedValue] = useState(null);

  const displayBooks = () => {
    const data = props.data;
    if (data.loading) {
      return <React.Fragment>Loading books...</React.Fragment>;
    } else if (data.error) {
      return <h1>ERROR</h1>;
    } else {
      return data.books.map(book => {
        return (
          <StyledBookListLi key={book.id} onClick={() => changeSelectedValue(book.id)}>
            {book.name}
          </StyledBookListLi>
        );
      });
    }
  };

  return (
    <StyledBookList>
      <ul>{displayBooks()}</ul>
      <BookDetails bookId={selected} />
    </StyledBookList>
  );
};

type BookList = {
  data: { loading: string; error: string; books: Array<{ id: string; name: string }> };
};

type Response = {};

type InputProps = {};

type Variables = {};

export default graphql<BookList, InputProps, Response, Variables>(getBooksQuery)(BookList);
