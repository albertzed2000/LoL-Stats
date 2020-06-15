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
            summonerId: "",
            summonerLevel: 0,
            soloRank: "",
            soloTier: "",
            flexRank: "",
            flexTier: "",


        }
    }

    async componentDidMount(){
        //load stats into state by calling api proxy server

        //load base user stats by sending getSummonerById api request
        await axios.get('https://m6m1r9620d.execute-api.us-west-2.amazonaws.com/rgapi/summoner/na1/' + this.state.username)
        .then(res => {
            console.log(res.data["accountId"]); //debugging purposes
            this.setState({
                foundUser: true, //set founduser to true
                accountId: res.data["accountId"], //set accountId based on response
                summonerLevel: res.data["summonerLevel"], //set summonerLevel based on response
                summonerId: res.data["id"] //set summonerId based on response
                }); //set state to accountId
        })
        .catch((err) => {
            console.log(err); //debugging purposes
        })

        //if user can't be found for whatever reason, redirect to user not found page
        if(!this.state.foundUser){
            window.location = "/user-not-found/" + this.state.username;
        }


        //load summoner rank using getLeagueBySummonerId api request
        await axios.get("https://m6m1r9620d.execute-api.us-west-2.amazonaws.com/rgapi/rank/na1/" + this.state.summonerId)
        .then(res => {
            console.log(res.data[0]);
            this.setState({
                flexTier: res.data[0]["tier"],
                flexRank: res.data[0]["rank"],
                soloTier: res.data[1]["tier"],
                soloRank: res.data[0]["rank"],
            })
        })
    }

    render(){


        return(
        <div>
        {this.state.username} <br/>
        {this.state.foundUser}<br/>
        Level: {this.state.summonerLevel}<br/>
        {this.state.accountId}<br/>
        {this.state.summonerId}<br/>
        Flex rank: {this.state.flexTier +  " " + this.state.flexRank}<br/>
        Solo/duo rank: {this.state.soloTier + " " + this.state.soloRank}
        </div>

        )
    }
}