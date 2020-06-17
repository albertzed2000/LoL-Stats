import React, {Component} from 'react';
import axios from "axios";

import "./styles/UserStats.css"

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

//props.stats
const Match = props => (
    <div>
            
        <Row>
            <Col md={5}>
                <Row>
                    {props.stats["mapId"]}
                </Row>

                <Row>
                    {props.stats["champion"]}
                </Row>

                <Row>
                    {props.stats["duration"]}
                </Row>
            </Col>


            <Col md={2}>
                {"KDA:" + props.stats["kills"] + "/" + props.stats["deaths"] + "/" + props.stats["deaths"]}
            </Col>


            <Col md={5}>
                <Row>
                    {props.stats["item0"] + " "}
                    {props.stats["item1"] + " "}
                    {props.stats["item2"]}
                </Row>
                <Row>
                    {props.stats["item3"] + " "}
                    {props.stats["item4"] + " "}
                    {props.stats["item5"] + " "}
                </Row>
            </Col>






        </Row>




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
            soloTier: "Unranked",   //summoner solo/duo tier (eg. silver)
            flexRank: "",   // summoner flex queue rank (eg. III)
            flexTier: "Unranked",   //summoner flex queue tier (eg. silver)
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


            res.data.forEach((rankInfo)=>{
                //checks if player is ranked, and updates their rank if so

                // eslint-disable-next-line
                if (rankInfo["queueType"] == "RANKED_SOLO_5x5"){
                    this.setState({
                        soloTier: rankInfo["tier"],
                        soloRank: rankInfo["rank"],
                    })
                }

                // eslint-disable-next-line
                else if(rankInfo["queueType"] == "RANKED_FLEX_SR"){
                    this.setState({
                        flexTier: rankInfo["tier"],
                        flexRank: rankInfo["rank"],
                    })
                }
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

                <div className="summonerInfo">

                    <Row>
                        <Col md={3}>
                            Lv: {this.state.summonerLevel}
                        </Col>

                        <Col md={3}>
                            {this.state.username}
                        </Col>
                        
                        <Col md={3}>
                        Solo: {this.state.soloTier + " " + this.state.soloRank}
                        </Col>

                        <Col md={3}>
                        Flex: {this.state.flexTier +  " " + this.state.flexRank}
                        </Col>
                        
                    </Row>
                </div>


                {this.matchList()}
            </div>

        )
    }
}