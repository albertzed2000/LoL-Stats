import React, {Component} from 'react';





export default class IndexPage extends Component {

    constructor(props){
        super(props);
        this.state = {
            username: ""
        }
    }

    render(){
        return(

            <div>
                <form>
                <label>
                    Username:
                    <input type="text" name="name" />
                </label>

                <input type="submit" value="Submit" />
                </form>

            </div>



        )




    }

}