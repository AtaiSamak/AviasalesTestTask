import React from "react";
import TicketItem from "../ticketItem";
import withData from "../../service/withData";

const Ticket = (props) => {
    const filterTickets = (setting, numOfTickets) => {
        const {tickets} = props;
        if(setting[setting.findIndex((item) => item.id === "all")].active) {
            return tickets.slice(0, numOfTickets);
        }
        const filters = (setting.filter((item) => item.active)).map(item => item.transfer);
        if(filters.length === 0) {
            return tickets.slice(0, numOfTickets);
        }
        const sortedTickets = tickets.filter((ticket) => filters.indexOf(ticket.segments[0].stops.length) > -1);
        return sortedTickets.slice(0, numOfTickets);
    }

    const sortTickets = (tickets, category) => {
        if(category === "cheep") {
            return tickets.sort((a, b) => a.price > b.price ? 1 : -1);
        }
        else if(category === "fast") {
            return tickets.sort((a, b) => a.segments[0].duration > b.segments[0].duration ? 1 : -1)
        } else {
            return tickets;
        }
    }

    const {filter, numOfTickets, category} = props;
    const tickets = sortTickets(filterTickets(filter, numOfTickets), category);
    const elements = tickets.map((ticket, index) => {
        return <TicketItem
                    ticket={ticket}
                    key={index}/>
    });
        
    return (
        <>
            {elements}
        </>
    )
}

export default withData(Ticket);