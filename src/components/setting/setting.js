import React, { Component } from "react";
import styled from "styled-components";

const StyledSetting = styled.div`
    height: 252px;
    width: 232px;
    background-color: #fff;
    padding-bottom: 10px;
    border-radius: 5px;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
    & h1 {
        font-style: normal;
        font-weight: 600;
        font-size: 12px;
        line-height: 12px;

        letter-spacing: 0.5px;
        text-transform: uppercase;
        margin: 20px 20px 10px;
    }
`;

const Input = styled.input`
    position: absolute;
    z-index: -1;
    opacity: 0;

    &+label {
        display: inline-flex;
        align-items: center;
        user-select: none;
        font-weight: normal;
        font-style: normal;
        font-size: 13px;
        line-height: 20px;
        padding: 10px 0 10px 20px;
        cursor: pointer;
        width: 100%;
        background-color: #fff;
    }
    &+label:hover{
        background-color: #F1FCFF;
    }
    &+label::before {
        content: '';
        display: inline-block;
        width: 20px;
        height: 20px;
        flex-shrink: 0;
        flex-grow: 0;
        border: 1px solid #9ABBCE;
        border-radius: 2px;
        margin-right: .8em;
        background-repeat: no-repeat;
        background-position: center center;
        background-size: 50% 50%;
    }
    &:checked+label::before {
        border-color: #2196F3;
        background-color: #fff;
        background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 78.369 78.369'%3e%3cpath style='fill: rgb(33, 150, 243);' d='M78.049,19.015L29.458,67.606c-0.428,0.428-1.121,0.428-1.548,0L0.32,40.015c-0.427-0.426-0.427-1.119,0-1.547l6.704-6.704
		c0.428-0.427,1.121-0.427,1.548,0l20.113,20.112l41.113-41.113c0.429-0.427,1.12-0.427,1.548,0l6.703,6.704
		C78.477,17.894,78.477,18.586,78.049,19.015z'/%3e%3c/svg%3e");
    }
`;

export default class Setting extends Component {
    render() {
        const {onClick, data} = this.props;

        const checkboxes = data.map((item) => {
            const {label, id} = item;
            
            return (
                <li key={id} style={{listStyleType: "none"}}>
                    <Input type="checkbox" id={id} onClick={onClick}/>
                    <label htmlFor={id}>{label}</label><br/>
                </li>
            )
        });

        return(
            <StyledSetting>
                <h1>Количество пересадок</h1>
                <ul style={{margin: "0", padding: "0"}}>
                    {checkboxes}
                </ul>
            </StyledSetting>
        )
    }
}