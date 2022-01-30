import React, { Component } from "react";
import styled from "styled-components";

const StyledTicket = styled.div`
    width: 100%;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
    margin-top: 20px;
    padding: 20px;
    &:last-child {
        margin-bottom: 20px;
    }
`;

const TicketHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    & span {
        font-style: normal;
        font-weight: 600;
        font-size: 24px;
        line-height: 24px;
        color: #2196F3;
    }

    & img {
        height: 36px;
    }
`;

const TicketContent = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const Block = styled.div`
    width: 33.33333%;
    & h2 {
        font-family: Open Sans;
        font-style: normal;
        font-weight: 600;
        font-size: 12px;
        line-height: 18px;
        letter-spacing: 0.5px;
        text-transform: uppercase;
        color: #A0B0B9;
        margin: 10px 0 0;
    }

    & p {
        font-family: Open Sans;
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        line-height: 21px;
        color: #4A4A4A;
        margin: 0;
    }
`;


const TicketData = ({data, getTimeFromMins}) => {
    const {origin, destination, duration, stops} = data;

    return (
        <>
            <Block>
                <h2>{origin} - {destination}</h2>
                <p>10:45 – 08:00</p>
            </Block>
            <Block>
                <h2>В пути</h2>
                <p>{getTimeFromMins(duration)}</p>
            </Block>
            <Block>
                <h2>{stops.length === 0 ? "Без пересадок" : `${stops.length} ${stops.length > 1 ? 'пересадки' : 'пересадка'}`}</h2>
                <p>{stops.join(' ')}</p>
            </Block>
        </>
    )
}

export default class TicketItem extends Component {
    getTimeFromMins(mins) {
        let hours = Math.trunc(mins / 60);
        let minutes = mins % 60;
        return hours + 'ч ' + minutes + 'м';
    };

    render() {
        const {ticket} = this.props;
        const {price, carrier} = ticket;

        return (
            <StyledTicket>
                <TicketHeader>
                    <span>{price.toLocaleString('ru-RU')} Р</span>
                    <img src={`https://pics.avs.io/99/36/${carrier}.png`} alt="#"/>
                </TicketHeader>
                <TicketContent>
                    <TicketData
                        data={ticket.segments[0]}
                        getTimeFromMins={this.getTimeFromMins}/>
                    <TicketData
                        data={ticket.segments[1]}
                        getTimeFromMins={this.getTimeFromMins}/>
                </TicketContent>
            </StyledTicket>
        )
    }
}