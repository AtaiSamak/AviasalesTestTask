import React, { Component } from "react"
import axios from "axios"
import ErrorMsg from "../components/errorMsg";
import Spinner from "../components/spinner";

const withData = (View) => {
    return class extends Component {
        state = {
            tickets: []
        }

        componentDidMount() {
            this.get('https://front-test.beta.aviasales.ru')
        }

        get = (url) => {
            axios.get(`${url}/search`)
                .then(res => {
                    axios.get(`${url}/tickets?searchId=${res.data.searchId}`)
                        .then(res => this.setState({tickets: res.data.tickets}))
                })
                .catch(res => {
                    throw new Error(`Something goes wrong: ${res}`)
                })
        }

        render() {
            if(this.state.error) {
                return <ErrorMsg/>
            }
            if(!this.state.tickets.length) {
                return <Spinner/>
            }
            
            return <View
                        tickets={this.state.tickets}
                        {...this.props}/>
        }
    }
}

export default withData;