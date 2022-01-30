import React from "react";
import styled from "styled-components";

const StyledErrorMsg = styled.div`
    margin: 20px auto 0;
    width: 50%;
    text-align: center;
    color: red;
`;
const ErrorMsg = () => {
    return (
        <StyledErrorMsg>
            <span>Something goes wrong :(<br/> Please reload page!</span>
        </StyledErrorMsg>
    )
};

export default ErrorMsg;