import React, { Fragment } from "react";
import styled from "styled-components";
import { graphql } from "react-apollo";

import { getBookQuery } from "../queries/queries";

interface Props {
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
}

interface Variables {
  bookId: string;
}

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
const StyledOtherBooks = styled.ul``;

class BookDetails extends React.Component<Props> {
  render() {
    return <StyledBookDetails>{this.displayBookDetails()}</StyledBookDetails>;
  }

  displayBookDetails = () => {
    const { book } = this.props.data;
    if (book) {
      return (
        <Fragment>
          <h2>{book.name}</h2>
          <p>{book.genre}</p>
          <p>{book.author.name}</p>
          <p>All books by this author</p>
          <StyledOtherBooks>
            {book.author.books.map(item => {
              return <li key={item.id}>{item.name}</li>;
            })}
          </StyledOtherBooks>
        </Fragment>
      );
    } else {
      <Fragment>No books selected...</Fragment>;
    }
  };
}

export default graphql<Variables>(getBookQuery, {
  options: props => {
    return {
      variables: {
        id: props.bookId,
      },
    };
  },
})(BookDetails);
