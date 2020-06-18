import React, {Component} from "react";
import Navi from "./navi";
import LargeSearchBar from "./largeSearchBar";
import "../App.css"


export default class UserNotFound extends Component {




    render(){

        return(

            <div className="pageContent">
                <Navi/>

                <div className="big404">
                    404
                </div>
                Sorry! The username could not be found. Try again!
                <br/><br/><br/><br/>
                <LargeSearchBar/>
                <br/><br/><br/><br/>
                <br/><br/><br/><br/>
                <br/><br/>
            </div>
        )
    }


}