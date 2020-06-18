import React, {Component} from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css"

export default class LargeSearchBar extends Component {

    constructor(props){
        super(props);

        //initialize state with empty username, foundUser
        this.state = {
            username: "",
            foundUser: false,
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

    //in future, can add region select (possibly using dropdowns on index page?)
    async checkUser(){

        await axios.get('https://m6m1r9620d.execute-api.us-west-2.amazonaws.com/rgapi/summoner/na1/' + this.state.username)
        .then(res => {
            console.log(res.data["accountId"]); //debugging purposes
            this.setState({foundUser: true}); //set state to accountId
        })
        .catch((err) => {
            console.log(err); //debugging purposes
        })
    }


    async onSubmit(e){ //redirect user to userNotFound page or userFound page
        e.preventDefault();
        console.log(this.state.username); //debugging purposes
        await this.checkUser();
        

        if(this.state.foundUser){
            console.log(this.state.foundUser); //debugging purposes
            window.location = "/user/" + this.state.username; //send user to their statspage with accountId param
        }

        else{
            console.log(this.state.foundUser);
            window.location = "/user-not-found/" + this.state.username;
        }
        



    }

    render(){
        return(

            <div>
                <form className="form-group form-group-lg" onSubmit={this.onSubmit}>
                <label>
                    <input className="form-control input-lg" placeholder="Username" id="inputlg" type="text" onChange={this.onChangeUser}/>
                </label>

                <input className="input-sm" id="inputsm" type="submit" value="Go!" />
                </form>

            </div>



        )




    }

}