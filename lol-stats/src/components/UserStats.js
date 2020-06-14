import React, {Component} from 'react';




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
        //load stats into states

    }

    render(){


        return(
        <div>
        user was found!
        {this.state.encryptedSummonerId}
        </div>

        )
    }
}