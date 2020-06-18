import React, {Component} from "react";
import Navi from "./navi";



export default class UserNotFound extends Component {




    render(){

        return(

            <div>
                <Navi/>
                Sorry! This user doesn't exist! Try again.
            </div>
        )
    }


}