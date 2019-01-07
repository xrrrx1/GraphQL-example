import React, { Fragment } from "react";
import styled from "styled-components";
import { graphql } from "react-apollo";

import { getBookQuery } from "../queries/queries";

const StyledBookDetails = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 40%;
  height: 100%;
  background: #ad1457;
  padding: 30px;
  overflow: auto;
  box-shadow: -2px -3px 5px rgba(0, 0, 0, 0.3);
  box-sizing: border-box;
  color: #fff;
`;

const BookDetails: React.FunctionComponent<Details> = props => {
  const displayBookDetails = () => {
    const { book } = props.data;
    if (book) {
      return (
        <Fragment>
          <h2>{book.name}</h2>
          <p>{book.genre}</p>
          <p>{book.author.name}</p>
          <p>All books by this author</p>
          <ul>
            {book.author.books.map(item => {
              return <li key={item.id}>{item.name}</li>;
            })}
          </ul>
        </Fragment>
      );
    } else {
      <Fragment>No books selected...</Fragment>;
    }
  };

  return <StyledBookDetails>{displayBookDetails()}</StyledBookDetails>;
};

type Details = {
  data: {
    book: {
      name: string;
      genre: string;
      author: {
        name: string;
        books: [
          {
            id: string;
            name: string;
          }
        ];
      };
    };
  };
  bookId: string;
};

type Response = {};

type InputProps = {};

type Variables = {};

export default graphql<Details, InputProps, Response, Variables>(getBookQuery, {
  options: props => {
    return {
      variables: {
        id: props.bookId,
      },
    };
  },
})(BookDetails);
