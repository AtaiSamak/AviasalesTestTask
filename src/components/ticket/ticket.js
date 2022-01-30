import React, { Component } from "react";
import GetService from "../../service/getService";
import Spinner from "../spinner/spinner";
import TicketItem from "../ticketItem";
import ErrorMsg from "../errorMsg";

export default class Ticket extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tickets: [],
            error: false
        }
    }

    getService = new GetService();

    componentDidMount() {
        this.getTickets();
    }

    getTickets() {
        this.getService.getTickets()
        .then((data) => {
            this.setState({tickets: data.tickets});
        })
        .catch(() => this.setState({error: true})) 
    }

    filterTickets(setting, numOfTickets) {
        const {tickets} = this.state;
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

    sortTickets = (tickets, category) => {
        if(category === "cheep") {
            return tickets.sort((a, b) => a.price > b.price ? 1 : -1);
        }
        else if(category === "fast") {
            return tickets.sort((a, b) => a.segments[0].duration > b.segments[0].duration ? 1 : -1)
        } else {
            return tickets;
        }
    }

    render() {
        if(this.state.error) {
            return <ErrorMsg/>
        }
        if(!this.state.tickets.length) {
            return <Spinner/>
        }

        const {filter, numOfTickets, category} = this.props;
        const tickets = this.sortTickets(this.filterTickets(filter, numOfTickets), category);
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
}