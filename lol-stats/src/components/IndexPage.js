import React, {Component} from 'react';
import axios from 'axios';

export default class IndexPage extends Component {

    constructor(props){
        super(props);
        this.state = {
            username: "",
            foundUser: false,
            yeet: "initial"
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeUser = this.onChangeUser.bind(this);
        this.checkUser = this.checkUser.bind(this);
    }


    onChangeUser(e){
        this.setState({
            username: e.target.value,
        });

    }


    async checkUser(){

        await axios.get('https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/albertzed?api_key=RGAPI-dc9629ff-9e1c-4f16-a07c-05cc83cbfe8a', {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36",
                "Accept-Language": "en-US,en;q=0.9",
                "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
                "Origin": "localhost:3000",
                "X-Riot-Token": "RGAPI-dc9629ff-9e1c-4f16-a07c-05cc83cbfe8a",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, HEAD, OPTIONS"
            }
        }).then(res => res.json())
        .then(data => {
            console.log(data);
            this.setState({foundUser: true, yeet: data});
        })
    }


    async onSubmit(e){
        e.preventDefault();
        //this.checkUser();

        await axios.get("https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/albertzed?api_key=RGAPI-dc9629ff-9e1c-4f16-a07c-05cc83cbfe8a", {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36",
                "Accept-Language": "en-US,en;q=0.9",
                "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
                "Origin": "localhost:3000",
                "X-Riot-Token": "RGAPI-dc9629ff-9e1c-4f16-a07c-05cc83cbfe8a"
            }
        })
        .then(res => console.log(res))
        

        if(this.state.foundUser){
            console.log(this.state.foundUser);
            window.location = "/user-found/" + this.state.username;
        }

        else{
            console.log(this.state.foundUser);
            window.location = "/user-not-found/" + this.state.username;
        }
        



    }

    render(){
        return(

            <div>
                <form onSubmit={this.onSubmit}>
                <label>
                    Username:
                    <input type="text" onChange={this.onChangeUser}/>
                </label>

                <input type="submit" value="Submit" />
                </form>
                {this.state.yeet}

            </div>



        )




    }

}