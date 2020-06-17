import React, {Component} from 'react';
import axios from "axios";

const Match = props => (
    <div>
      {props.stats["kills"]}
    </div>
  )

export default class UserStats extends Component {

    constructor(props){
        super(props);

        //initialize state empty except for encryptedSummonerId passed in through url
        this.state = {
            foundUser: false,
            username: this.props.match.params.username, // summoner's username
            accountId: "",  //summoner's encryptedAccountId
            summonerId: "", //encryptedSummonerId
            summonerLevel: 0,   //in-game experience-based level rating
            soloRank: "",   // summoner solo/duo queue rank (eg. III)
            soloTier: "",   //summoner solo/duo tier (eg. silver)
            flexRank: "",   // summoner flex queue rank (eg. III)
            flexTier: "",   //summoner flex queue tier (eg. silver)
            matches: [],    //array of objects of basic match data (used to prepare loading in match data)
            matchData: [],  //array of objects, each containing in-depth info of each recent match summoner has played. contains object
            

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
        .catch((err) => {
            console.log(err);
        })


        //get match history of players
        await axios.get('https://m6m1r9620d.execute-api.us-west-2.amazonaws.com/rgapi/matchlist/na1/' + this.state.accountId)
        .then(res => {
            console.log(res.data["matches"][0]["platformId"]); //for debugging purposes
            
            if(res.data["matches"].length >=5){
                    this.setState({
                    matches: res.data["matches"].slice(0, 1), //get most recent 5 matches only (due to api rate limiting)
                })
            }
            else{ //if user has played less than 5 games, store all of them in this.state.matches
                this.setState({
                    matches: res.data["matches"],
                })
            }
        })


        //retrieve match info for each match inside this.state.matches
        await this.state.matches.forEach((match) => {
            axios.get('https://m6m1r9620d.execute-api.us-west-2.amazonaws.com/rgapi/match/na1/' + match["gameId"])
            .then(res => {
                console.log(res.data); //debugging purposes
                
                let tempMatchData = { //store general game data here
                    "region": match["platformId"], //string region
                    "matchId": match["gameId"], // string match id
                    "champion": match["champion"], // int champion that our summoner picked
                    "timestamp": match["timestamp"], //int unix gamestart timestamp
                    "duration": res.data["gameDuration"], //int, how long the game lasted in seconds, counted from 0:00 (gamestart)
                    "queueId": res.data["queueId"], //int, matchtype id
                    "mapId": res.data["mapId"], // int, map id that was played on 
                }


                var tempParticipantId = 0;
                //loop through participantIdentities and find our player
                res.data["participantIdentities"].forEach((participantIdentity) => {
                    if(participantIdentity["player"]["summonerName"] === this.state.username){ //check if we have found our summoner
                        console.log("found our summoner with username" + participantIdentity["player"]["summonerName"] + "and participantId " + participantIdentity["participantId"]) //debugging purposes
                        tempParticipantId = participantIdentity["participantId"]; // set player's participantId
                    }
                });

                //note: "summoner" and "player" terms are the same.
                //loop through participant stats, record stats if it is our summoner
                res.data["participants"].forEach((participant) => {
                    if(participant["participantId"] === tempParticipantId){ // check if we have found our player
                        console.log("we found the player")//debugging purposes

                        let tempPlayerStats = { // store playerStats
                            "win": participant["stats"]["win"],
                            "kills": participant["stats"]["kills"],
                            "deaths": participant["stats"]["deaths"],
                            "assists": participant["stats"]["assists"],
                            "item0": participant["stats"]["item0"],
                            "item1": participant["stats"]["item1"],
                            "item2": participant["stats"]["item2"],
                            "item3": participant["stats"]["item3"],
                            "item4": participant["stats"]["item4"],
                            "item5": participant["stats"]["item5"],
                            "item6": participant["stats"]["item6"],
                        };
                        console.log(tempPlayerStats);
                        console.log(tempMatchData);
                        console.log({...tempMatchData, ...tempPlayerStats});
                        this.setState({
                            matchData: this.state.matchData.concat([{...tempMatchData, ...tempPlayerStats}])
                        })
                    }
                });


            })
            .catch(err => console.log(err));
            
        })
        
        
        console.log(this.state.matches); //debugging purposes
    }

    matchList() {
        //returns styled matchList components for each match

        return this.state.matchData.map(singleMatchData => {
          return <Match stats={singleMatchData} />;
        })
      }

    render(){

        return(
        <div>
        {this.state.username} <br/>
        {this.state.foundUser}<br/>
        Level: {this.state.summonerLevel}<br/>
        Flex rank: {this.state.flexTier +  " " + this.state.flexRank}<br/>
        Solo/duo rank: {this.state.soloTier + " " + this.state.soloRank}<br/>
        
        {this.matchList()}
        </div>

        )
    }
}