import React, { Component } from "react";
import styled from "styled-components";

const StyledButton = styled.button`
    background-color: ${props => props.active ? '#2196F3' : '#fff'};
    width: 100%;
    outline: none;
    border: 1px solid #DFE5EC;
    padding: 14px 15px;

    font-family: Open Sans;
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 20px;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    color: ${props => props.active ? '#fff' : '#4A4A4A'};

    &:first-child {
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
        border-right: none;
    }

    &:last-child {
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
        border-left: none;
    }

    &:hover {
        cursor: pointer;
        background-color: ${props => props.active ? '' : '#F1FCFF'};
    }
`;

const FooterBtn = styled(StyledButton)`
    margin: 20px 0;
    &:last-child {
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
        border: none;
    }
`;

export default class Button extends Component {
    render() {
        const {label, active, onChange, btnType} = this.props;
        if(btnType === "footer") {
            return <FooterBtn
                        active={active}
                        onClick={onChange}>
                            {label}
                    </FooterBtn>
        }

        return (
            <StyledButton
                active={active}
                onClick={onChange}
            >
                {label}
            </StyledButton>
        )
    }
}