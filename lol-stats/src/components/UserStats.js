import React, {Component} from 'react';
import axios from "axios";



export default class UserStats extends Component {

    constructor(props){
        super(props);

        //initialize state empty except for encryptedSummonerId passed in through url
        this.state = {
            username: "",
            encryptedSummonerId: this.props.match.params.encryptedSummonerId

        }
    }

    componentDidMount(){
        //load stats into state
        
    }

    render(){


        return(
        <div>
        {this.state.username}
        </div>

        )
    }
}