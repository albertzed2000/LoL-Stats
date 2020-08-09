import React, {Component} from 'react';
import axios from "axios";

import "../App.css"
import "bootstrap/dist/css/bootstrap.min.css"

import Navi from "./navi"
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image"

import determineMap from "../resources/maps" //import mapdata
import determineQueue from "../resources/queues"
import determineChampion from "../resources/champion"
import determineSummonerSpell from "../resources/summonerSpells"


//*************************************************************************************** */



const Match = props => (
    
    <div className="container-fluid" style={props.stats["win"] ? {backgroundColor: '#99ffbb'} : {backgroundColor: "#ff9999"}}>
        <br/>
        <Row>

            <Col md={3}>


                <Row>
                    <Col md={8}>
                        {<Image  className= "img-responsive" width="50%" src = {require(`../resources/img/champion/${determineChampion(props.stats["champion"])}.png`)}/>}
                    </Col>

                    <Col md={4}>
                        <Row>
                            {<Image  className= "img-responsive" width="40%" src = {require(`../resources/img/summoner-spells/${determineSummonerSpell(props.stats["spell1Id"])}.png`)}/>}
                        </Row>

                        <Row>
                            {<Image  className= "img-responsive" width="40%" src = {require(`../resources/img/summoner-spells/${determineSummonerSpell(props.stats["spell2Id"])}.png`)}/>}
                        </Row>
                    </Col>
                </Row>




            </Col>

            <Col md={3}>
                <Row>
                    {determineMap(props.stats["mapId"])}
                </Row>

                <Row>
                    {determineChampion(props.stats["champion"])}
                </Row>

                <Row>
                    {Math.floor(props.stats["duration"] / 60).toString() + ":" + (props.stats["duration"] - (Math.floor(props.stats["duration"] / 60) * 60)).toString()}
                </Row>

                <Row>
                    {props.stats["time"]}
                </Row>

            </Col>

            <Col md={3}>
                <div className="queueType">
                    <Row>
                        {determineQueue(props.stats["queueId"])}
                    </Row>
                </div>

                <div className="killDeathAssist">
                    <Row>
                        {props.stats["kills"] + "/" + props.stats["deaths"] + "/" + props.stats["assists"]}    
                    </Row>
                </div>
                
            </Col>


            <Col md={3}>
                <Row>
                    <Col>
                        <Row>
                            {<Image  className= "img-responsive" width="15%" src = {require(`../resources/img/item/${props.stats["item0"]}.png`)}/>}
                            {<Image  className= "img-responsive" width="15%" src = {require(`../resources/img/item/${props.stats["item1"]}.png`)}/>}
                            {<Image  className= "img-responsive" width="15%" src = {require(`../resources/img/item/${props.stats["item2"]}.png`)}/>}
                            {<Image  className= "img-responsive" width="15%" src = {require(`../resources/img/item/${props.stats["item6"]}.png`)}/>}
                        </Row>

                        <Row>
                            {<Image  className= "img-responsive" width="15%" src = {require(`../resources/img/item/${props.stats["item3"]}.png`)}/>}
                            {<Image  className= "img-responsive" width="15%" src = {require(`../resources/img/item/${props.stats["item4"]}.png`)}/>}
                            {<Image  className= "img-responsive" width="15%" src = {require(`../resources/img/item/${props.stats["item5"]}.png`)}/>}
                        </Row>
                    </Col>
                </Row>

            </Col>






        </Row>



    <br/>
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
            soloTier: "UNRANKED",   //summoner solo/duo tier (eg. silver)
            flexRank: "",   // summoner flex queue rank (eg. III)
            flexTier: "UNRANKED",   //summoner flex queue tier (eg. silver)
            matches: [],    //array of objects of basic match data (used to prepare loading in match data)
            matchData: [],  //array of objects, each containing in-depth info of each recent match summoner has played. contains object
            summonerIconId: 0,

        }

        this.matchList = this.matchList.bind(this);
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
                summonerId: res.data["id"], //set summonerId based on response
                summonerIconId: res.data["profileIconId"]
                }); 
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
                    matches: res.data["matches"].slice(0, 6), //get most recent 5 matches only (due to api rate limiting)
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
                
                let date = new Date(match["timestamp"]);
                let month = "0" + date.getMonth();
                let day = "0" + date.getDay();
                let hours = date.getHours();
                let minutes = "0" + date.getMinutes();
                //determine when the game started
                let formattedTime = month.substr(-2) + "/" + day.substr(-2) + " " +  hours + ':' + minutes.substr(-2);

                let tempMatchData = { //store general game data here
                    "region": match["platformId"], //string region
                    "matchId": match["gameId"], // string match id
                    "champion": match["champion"], // int champion that our summoner picked
                    "time": formattedTime, //time at which game started
                    "duration": res.data["gameDuration"], //int, how long the game lasted in seconds, counted from 0:00 (gamestart)
                    "queueId": res.data["queueId"], //int, matchtype id
                    "mapId": res.data["mapId"], // int, map id that was played on 
                }


                var tempParticipantId = 0;
                //loop through participantIdentities and find our player
                res.data["participantIdentities"].forEach((participantIdentity) => {
                    if(participantIdentity["player"]["summonerName"].toLowerCase() === this.state.username.toLowerCase()){ //check if we have found our summoner
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
                            "userName": this.state.username,
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
                            "spell1Id": participant["spell1Id"],
                            "spell2Id": participant["spell2Id"],
                        };
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
        console.log(this.state.matchData);//debugging purposes
        return this.state.matchData.map(singleMatchData => {
          return <Match stats={singleMatchData} key={singleMatchData["matchId"]}/>;
        })

      }

    render(){
        return(
            <div>
                <Navi/>
                <div className="summonerInfo container-fluid">

                    <Row>
                        <Col md={3}>
                            {<Image  className= "img-responsive" height="100%" src = {require(`../resources/img/profileicon/${this.state.summonerIconId.toString()}.png`)}/>}
                        </Col>

                        <Col md={3}>
                            <Row>
                                <div className="displayUsername">
                                    {this.state.username}
                                </div>
                            </Row>

                            <Row>
                                Level {" " + this.state.summonerLevel}
                            </Row>
                        </Col>
                        
                        <Col md={3}>
                            <Row>
                                <Image  className= "img-responsive" width="30%" src = {require(`../resources/img/ranked-emblems/${this.state.soloTier}.png`)} alt={this.state.soloTier}/>
                            </Row>

                            <Row>
                            {this.state.soloTier + " " + this.state.soloRank} SOLO
                            </Row>
                        
                        </Col>

                        <Col md={3}>

                            <Row>
                                <Image className= "img-responsive" width="30%" src = {require(`../resources/img/ranked-emblems/${this.state.flexTier}.png`)} alt={this.state.flexTier}/>
                            </Row>

                            <Row>
                                {this.state.flexTier +  " " + this.state.flexRank + " "} FLEX
                            </Row>
                        </Col>
                        
                    </Row>
                </div>


                {this.matchList()}
                <br/><br/><br/><br/>
                <br/><br/><br/><br/>
                <br/><br/><br/><br/>
                <br/><br/><br/><br/>
                <br/><br/><br/><br/>
            </div>

        )
    }
}