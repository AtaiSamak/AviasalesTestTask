import React, {Component} from "react";
import styled from "styled-components";
import logo from "./logo.svg"
import Setting from "../setting";
import CategoryPanel from "../categoryPanel";
import Ticket from "../ticket";
import Button from "../button/button";

const StyledApp = styled.div`
    max-width: 756px;
    width: 100%;
    margin: 0 auto;
`;

const Logo = styled.img`
    display: block;
    width: 82px;  
    margin: 30px auto 20px;
`;

const Container = styled.div`
    display: flex;
    justify-content: space-between;

    & .ticket-container {
        max-width: 502px;
        width: 100%;
    }
`;

export default class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            setting: [
                {id: "all", label: "Все", active: false},
                {id: "withoutTransfer", label: "Без пересадки", transfer: 0, active: false},
                {id: "oneTransfer", label: "1 пересадка", transfer: 1, active: false},
                {id: "twoTransfer", label: "2 пересадки", transfer: 2, active: false},
                {id: "threeTransfer", label: "3 пересадки", transfer: 3, active: false}
            ],
            categoryPanel: [
                {id: "cheep", label: "Самый дешевый", active: true},
                {id: "fast", label: "Самый быстрый", active: false},
                {id: "optimal", label: "Оптимальный", active: false}
            ],
            numberOfTickets: 5
        }
    }
    
    changeActive(data, id) {
        const index = data.findIndex((item) => item.id === id);
        const newData = [...data];
        newData[index] = {...data[index], active: !data[index].active};

        return newData;
    }

    onChangeSetting = (event) => {
        const id = event.target.id;

        this.setState(({setting}) => {
            return {
                setting: this.changeActive(setting, id)
            }
        })
    }

    onChangeCategoryPanel = (id) => {
        this.setState(({categoryPanel}) => {
            const newCategoryPanel = categoryPanel.map((item) => ({...item, active: false}));
            return {
                categoryPanel: this.changeActive(newCategoryPanel, id)
            }
        })
    }

    onShowMoreNoT = (num) => {
        this.setState({numberOfTickets: this.state.numberOfTickets + num});
    }

    render() {
        const {setting, categoryPanel: ctgs, numberOfTickets} = this.state;

        return (
            <StyledApp>
                <Logo src={logo} alt="#"/>
                <Container>
                    <Setting
                        onClick={this.onChangeSetting}
                        data={setting}/>
                    <div className="ticket-container">
                        <CategoryPanel
                            onChange={this.onChangeCategoryPanel}
                            data={ctgs}/>
                        <Ticket
                            filter={setting}
                            category={ctgs[ctgs.findIndex((item) => item.active)].id}
                            numOfTickets={numberOfTickets}/>
                        <Button
                            label={numberOfTickets === 5 ?"Показать еще 5 билетов!" : "Скрыть!"}
                            active={true}
                            onChange={numberOfTickets === 5? () => this.onShowMoreNoT(5) : () => this.onShowMoreNoT(-5)}
                            btnType={'footer'}/>
                    </div>
                </Container>
            </StyledApp>
        )
    }
}
