import React, {Component} from 'react';
import LargeSearchBar from "./largeSearchBar";
import IndexCarousel from "./IndexCarousel";
import Navi from "./navi"
import "bootstrap/dist/css/bootstrap.min.css"
import axios from 'axios'


export default class IndexPage extends Component {

    constructor(props){
        super(props);
        this.state = {
            "yeet": ""
        };
    }

    async callYeet(){
        await axios.get("https://radiant-plateau-97440.herokuapp.com/yeet")
        .then((qqqq)=>{
            console.log(qqqq)
            this.setState({"yeet": qqqq.data["yeet"]})
        })
    }

    render(){
        return(

            <div className="indexWhole container-fluid">
                <Navi/>
                <div className="indexBigWords">
                    LoL Stats

                </div>
                <IndexCarousel/>
                <LargeSearchBar/>
                <br/><br/><br/><br/><br/><br/>
                <br/><br/><br/><br/><br/><br/>
                <br/><br/><br/><br/><br/><br/>
                


            </div>

        )

    }

}