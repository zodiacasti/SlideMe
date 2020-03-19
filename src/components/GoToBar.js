import React from "react";

class GoToBar extends React.Component {
  state = { goTo: "" };

  onFormSubmit = e => {
    e.preventDefault();

    this.props.onSubmit(this.state.goTo);
  };

  render() {
    return (
      <div className="ui segment">
        <form className="ui form" onSubmit={this.onFormSubmit}>
          <div className="field">
            <label>Enter number between 1 and 10</label>
            <input
              value={this.state.goTo}
              onChange={e => this.setState({ goTo: e.target.value })}
              type="text"
            />
          </div>
        </form>
      </div>
    );
  }
}

export default GoToBar;
