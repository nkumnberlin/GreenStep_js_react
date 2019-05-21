import React, {Component} from 'react';
import axios from 'axios';

export default class DestinationInput extends Component{
    state = {
        address: ""
    };

    handleChange = event => {
        this.setState({address: event.target.value});
    };

    handleSubmit = event => {
        event.preventDefault();
        const departure = {
            address: this.state.address
        }
        axios.post('localhost:5000', {departure})
            .then(res =>{
                console.log(res);
                console.log(res.data);
            })
    };
    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                <label>
                    Submit:
                    <input type='text' name='address' onChange={this.handleChange}/>
                </label>
                <button type="submit"></button>
            </form>
        )
    }
}