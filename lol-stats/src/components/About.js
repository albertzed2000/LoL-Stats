import React from "react";
import Navi from "./navi"
import "../App.css"

export default class About extends React.Component{




    render(){


        return(
            <div className="aboutWhole">
                <Navi/>

                <div className="about-text-all">
                        
                    <div className="about-big-words">
                        LOL Stats
                    </div>

                    <div className="about-sub-big-words">
                        "Because to know the game, you must first know yourself."
                    </div>
                    <br/><br/><br/><br/><br/><br/><br/>

                    <div className="about-blurb1">
                        LOL Stats is a League of Legends statistics engine that uses Riot Games' API to conveniently and quickly display
                        in-depth gameplay statistics, ranging from your KDA ratio to items you purchased in the game, or what champion you played.

                    </div>
                    <br/><br/><br/><br/><br/><br/><br/>

                    <div className="aboutWhy">
                        Why?
                    </div>

                    <div className="aboutWhyBlurb">
                        LoL Stats was created as a passion project for the game League of Legends, and inspired by other gameplay statistical analysis
                        tools including OP.GG. It's built using React and Bootstrap/CSS, and uses an AWS-based API proxy server in order to
                        send and receive information to the Riot Development API. 
                    </div>
                    <br/><br/><br/><br/><br/><br/><br/>

                    <div className="aboutHow">
                        How To Use
                    </div>

                    <div className="aboutHowBlurb">
                        Simply type in you or a friend's username, and click submit. Then, our code does the work and retrieves vital information
                        about your recent matches and your rank!
                    </div>
                </div>
                <br/><br/><br/><br/><br/><br/><br/>
            </div>
        )
    }
}