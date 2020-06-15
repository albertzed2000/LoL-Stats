import React, {Component} from 'react';
import axios from "axios";



export default class UserStats extends Component {

    constructor(props){
        super(props);

        //initialize state empty except for encryptedSummonerId passed in through url
        this.state = {
            foundUser: false,
            username: this.props.match.params.username,
            accountId: "",
            summonerLevel: 0,

        }
    }

    async componentDidMount(){
        //load stats into state by calling api proxy server
        await axios.get('https://m6m1r9620d.execute-api.us-west-2.amazonaws.com/rgapi/summoner/na1/' + this.state.username)
        .then(res => {
            console.log(res.data["accountId"]); //debugging purposes
            this.setState({
                foundUser: true,
                accountId: res.data["accountId"],
                summonerLevel: res.data["summonerLevel"]
                }); //set state to accountId
        })
        .catch((err) => {
            console.log(err); //debugging purposes
        })

        //if user can't be found for whatever reason, redirect to user not found page
        if(!this.state.foundUser){
            window.location = "/user-not-found/" + this.state.username;
        }
    }

    render(){


        return(
        <div>
        {this.state.username} <br/>
        {this.state.foundUser}<br/>
        {this.state.summonerLevel}<br/>
        {this.state.accountId}<br/>
        </div>

        )
    }
}