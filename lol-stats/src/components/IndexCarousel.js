import React, { Component } from 'react'  
import Carousel from 'react-bootstrap/Carousel'  
import "../App.css"


export default class IndexCarousel extends Component {  
        render() {  

                let itemStyle = {'height': "6em"};
                //text carousel that transitions between a few different texts
                return (
                        <div>   
                        <Carousel fade={true} controls={false} indicators={false} interval={2000}>  
                         <Carousel.Item style={itemStyle}>
                                 <h1>Get your league stats now.</h1>
                         </Carousel.Item>

                         <Carousel.Item style={itemStyle}>
                                <h1>What are you waiting for?</h1>
                         </Carousel.Item>

                         <Carousel.Item style={itemStyle}>
                                <h1>Find out if you're as good as you say.</h1>
                         </Carousel.Item>
                         <Carousel.Item style={itemStyle}>
                                <h1>Built by fans of Doublelift.</h1>
                         </Carousel.Item>
                         <Carousel.Item style={itemStyle}>
                                <h1>Challenger player-approved.</h1>
                         </Carousel.Item>

                                        </Carousel>
                        </div>  
                )  
        }  
}  
  