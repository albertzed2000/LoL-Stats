import React, { Component } from 'react';

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import SearchBar from "./searchBar";

export default class Navi extends Component {

  render(){
    //note: sticky doesn't work since overflow property prevents this (we have enabled overflow everywhere)
    //a basic react-bootstrap navbar, allows navigation to same page's subsections and external
    //github, linkedin, email, and resume links
    return(

        <div>
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#Top">LOL Stats</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">

                <Nav className="mr-auto">
                    <Nav.Link  className="nav-text" href="/">Home</Nav.Link>

                </Nav>
                <Nav>
                    <SearchBar/>
            
                </Nav>
            </Navbar.Collapse>
        </Navbar>
        </div>
    )
}
}