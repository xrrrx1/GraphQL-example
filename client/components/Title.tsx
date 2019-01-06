import * as React from "react";
import styled from "styled-components";

interface Props {
  titleColor: string;
}

const StyledTitle = styled.h1<{ titleColor: string }>`
  color: ${props => props.titleColor};
`;

const Title: React.FunctionComponent<Props> = props => (
  <StyledTitle titleColor={props.titleColor}>Reading list</StyledTitle>
);

export default Title;
