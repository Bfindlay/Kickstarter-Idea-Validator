import React, { Component } from "react";
import { connect } from "react-redux";
import {} from "../";
import { submitIdea } from '../actions';
import Button from "@material-ui/core/Button";

const styles = {
  button: {
    margin: 0.2
  },
  input: {
    display: "none"
  }
};

class App extends Component {
  constructor() {
    super();
    this.state = {
        idea: '',
    
    }
  }

  handleIdeaChange({target}){
    this.setState({idea : target.value})
  }

  submitIdea(){
    const { idea } = this.state;
    this.props.submitIdea({idea: idea})
    console.log('idea submitted');
  }

  render() {
    return (
      <div className="content-box">
        <div className="top-panel">
          <div className="text-input">
            <input
                onChange= {this.handleIdeaChange.bind(this)}
                type="text"
                id="input1"
                placeholder="Type Your Kickstarter Idea Here"
            />
            <label htmlFor="input1">Idea</label>
          </div>
        </div>
        <div className="bottom-panel">
            <Button onClick={this.submitIdea.bind(this)} variant="contained" color="primary" style={styles.button}>
                Submit
            </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProp = ({ App }) => ({ App });
export default connect(
  mapStateToProp,
  {submitIdea}
)(App);
