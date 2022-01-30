import React, {Component} from "react";
import styled from "styled-components";
import Button from "../button/button";

const StyledCategoryPanel = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: nowrap;
    border-radius: 5px;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
`;

export default class CategoryPanel extends Component {
    render() {
        const {onChange, data} = this.props;

        const buttons = data.map((item) => {
            const {id, active, label} = item;
            return <Button
                        key={id}
                        active={active}
                        label={label}
                        onChange={() => onChange(id)}
                        btnType={'usual'}/>
        });

        return (
            <StyledCategoryPanel>
                {buttons}
            </StyledCategoryPanel>
        )
    }
}