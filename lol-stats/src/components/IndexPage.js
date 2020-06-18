import React, {Component} from 'react';
import LargeSearchBar from "./largeSearchBar";
import IndexCarousel from "./IndexCarousel";
import "bootstrap/dist/css/bootstrap.min.css"


export default class IndexPage extends Component {

    render(){
        return(

            <div className="indexWhole container-fluid">
                <div className="indexBigWords">
                    LoL Statsasdfgthrngbfgetyhgfetrhfdr

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