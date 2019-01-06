import React from "react";
import styled from "styled-components";
import { graphql } from "react-apollo";

import { getBooksQuery } from "../queries/queries";

import BookDetails from "./BookDetails";

interface Props {
  data: {
    loading: string;
    error: string;
    books: [{ id: string; name: string }];
  };
}

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

class BookList extends React.Component<Props> {
  state = {
    selected: null,
  };
  render() {
    return (
      <StyledBookList>
        <ul>{this.displayBooks()}</ul>
        <BookDetails bookId={this.state.selected} />
      </StyledBookList>
    );
  }

  displayBooks = () => {
    const data = this.props.data;
    if (data.loading) {
      return <React.Fragment>Loading books...</React.Fragment>;
    } else if (data.error) {
      return <h1>ERROR</h1>;
    } else {
      return data.books.map(book => {
        return (
          <StyledBookListLi key={book.id} onClick={e => this.setState({ selected: book.id })}>
            {book.name}
          </StyledBookListLi>
        );
      });
    }
  };
}

export default graphql(getBooksQuery)(BookList);
