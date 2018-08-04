import React, { Component } from "react";
import { connect } from "react-redux";
import {} from "../";
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
  }

  componentWillMount() {}

  render() {
    return (
      <div className="content-box">
        <div className="top-panel">
          <div className="text-input">
            <input
              type="text"
              id="input1"
              placeholder="Type Your Kickstarter Idea Here"
            />
            <label htmlFor="input1">Idea</label>
          </div>
        </div>
        <div className="bottom-panel">
            <Button variant="contained" color="primary" style={styles.button}>
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
  {}
)(App);
