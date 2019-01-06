import React, { useState } from "react";
import styled from "styled-components";
import { graphql, compose } from "react-apollo";

import { getAuthorsQuery, addBookMutation, getBooksQuery } from "../queries/queries";

interface Props {
  addBookMutation(argument: object): object;
}

const StyledForm = styled.form`
  background: #fff;
  padding: 20px;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 400px;
  label {
    text-align: right;
    padding: 6px;
  }
  input,
  select {
    margin: 4px 0;
    padding: 6px;
    box-sizing: border-box;
  }
  button {
    color: #fff;
    font-size: 2em;
    background: #ad1457;
    border: 0;
    padding: 0 10px;
    border-radius: 50%;
    cursor: pointer;
    position: absolute;
    bottom: 10px;
    left: 10px;
  }
`;
const StyledField = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
`;

class AddBook extends React.Component<Props> {
  state: {
    name: "";
    genre: "";
    authorId: "";
  };

  render() {
    return (
      <React.Fragment>
        <StyledForm onSubmit={this.submitForm}>
          <StyledField>
            <label>Book name:</label>
            <input type="text" onChange={e => this.setState({ name: e.target.value })} />
          </StyledField>
          <StyledField>
            <label>Genre:</label>
            <input type="text" onChange={e => this.setState({ genre: e.target.value })} />
          </StyledField>
          <StyledField>
            <label>Author:</label>
            <select onChange={e => this.setState({ authorId: e.target.value })}>
              <option>Select author</option>
              {displayAuthors(this.props)}
            </select>
          </StyledField>
          <button>+</button>
        </StyledForm>
      </React.Fragment>
    );
  }

  submitForm = e => {
    e.preventDefault();
    this.props.addBookMutation({
      variables: {
        name: this.state.name,
        genre: this.state.genre,
        authorId: this.state.authorId,
      },
      refetchQueries: [{ query: getBooksQuery }],
    });
  };
}

const displayAuthors = props => {
  const data = props.getAuthorsQuery;
  if (data.loading) {
    return <option disabled>Loading authors...</option>;
  } else if (data.error) {
    return <h1>ERROR</h1>;
  } else {
    return data.authors.map(author => {
      return (
        <option key={author.id} value={author.id}>
          {author.name}
        </option>
      );
    });
  }
};

export default compose(
  graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
  graphql(addBookMutation, { name: "addBookMutation" }),
)(AddBook);
