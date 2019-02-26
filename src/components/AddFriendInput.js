import React, { PureComponent, PropTypes } from "react";
import classnames from "classnames";
import styles from "./AddFriendInput.css";

class AddFriendInput extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name || "",
      gender: this.props.gender || ""
    };
  }

  handleNameChange = (e) => {
    this.setState({ name: e.target.value });
  };

  handleGenderSelect = e => {
    this.setState({
      gender: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    const friendData = {
      name: this.state.name,
      gender: this.state.gender
    };

    this.props.addFriend(friendData);
    this.setState({ name: "", gender: "" });
  };

  render() {
    return (
      <form>
        <div className={classnames("form-group", styles.formSpacing)}>
          <input
            type="text"
            autoFocus="true"
            className={classnames("form-control", styles.addFriendInput)}
            placeholder="Type the name of a friend to add"
            value={this.state.name}
            onChange={this.handleNameChange}
          />

          <select
            className={classnames("form-control", styles.addGender)}
            onChange={this.handleGenderSelect}
            value={this.state.gender}
          >
            <option value="" hidden>
              Select Gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

          <input
            type="submit"
            className="btn btn-primary"
            onClick={this.handleSubmit}
          />
        </div>
      </form>
    );
  }
}

AddFriendInput.propTypes = {
  addFriend: PropTypes.func.isRequired
};

export default AddFriendInput;
