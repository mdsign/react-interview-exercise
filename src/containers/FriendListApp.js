import React, { Component } from "react";
import styles from "./FriendListApp.css";
import { connect } from "react-redux";

import { addFriend, deleteFriend, starFriend } from "../actions/FriendsActions";
import { FriendList, AddFriendInput, Pagination } from "../components";

class FriendListApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPageItems: []
    };
    this.onChangePage = this.onChangePage.bind(this);
  }

  onChangePage(currentPageItems) {
    // update state with new page of items
    this.setState({ currentPageItems: currentPageItems });
  }

  render() {
    const {
      friendlist: { friendsById }
    } = this.props;

    const actions = {
      addFriend: this.props.addFriend,
      deleteFriend: this.props.deleteFriend,
      starFriend: this.props.starFriend
    };

    return (
      <div className={styles.friendListApp}>
        <h1>The FriendList</h1>
        <AddFriendInput addFriend={actions.addFriend} />
        <FriendList friends={this.state.currentPageItems} actions={actions} />
        <Pagination items={friendsById} onChangePage={this.onChangePage} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(
  mapStateToProps,
  {
    addFriend,
    deleteFriend,
    starFriend
  }
)(FriendListApp);
