import React, { useContext } from "react";
import styled from "styled-components";

import { HeadersColorContext } from "../context/context";

const StyledTitle = styled.h1<{ titleColor: string }>`
  color: ${props => props.titleColor};
`;

const Title: React.FunctionComponent = () => {
  const headerColor = useContext(HeadersColorContext);

  return <StyledTitle titleColor={headerColor}>Reading list</StyledTitle>;
};

export default Title;
