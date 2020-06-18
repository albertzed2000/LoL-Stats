import React, {Component} from 'react';
import LargeSearchBar from "./largeSearchBar";
import IndexCarousel from "./IndexCarousel";
export default class IndexPage extends Component {

    render(){
        return(

            <div className="indexWhole">
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