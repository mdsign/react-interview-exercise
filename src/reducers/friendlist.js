import * as types from '../constants/ActionTypes';

const initialState = {
  friendsById: [
    {
      name: 'Donald Trump',
      gender: 'male',
      starred: false
    },
    {
      name: 'Hillary Clinton',
      gender: 'female',
      starred: true
    },
    {
      name: 'Barack Obama',
      gender: 'male',
      starred: true
    },
    {
      name: 'George W Bush',
      gender: 'male',
      starred: true
    },
    {
      name: 'Bill Clinton',
      gender: 'male',
      starred: true
    },
    {
      name: 'Ronald Regan',
      gender: 'male',
      starred: true
    },   
    {
      name: 'John F. Kennedy',
      gender: 'male',
      starred: true
    },
    {
      name: 'Theodore Roosevelt',
      gender: 'male',
      starred: true
    },
    {
      name: 'Abraham Lincoln',
      gender: 'male',
      starred: false
    },
    {
      name: 'George Washington',
      gender: 'male',
      starred: false
    }
  ]
};

export default function friends(state = initialState, action) {
  switch (action.type) {
    case types.ADD_FRIEND:
      return {
        ...state,
        friendsById: [
          ...state.friendsById,
          {
            name: action.data.name,
            gender: action.data.gender
          }
        ],
      };
    case types.DELETE_FRIEND:
      return {
        ...state,
        friendsById: state.friendsById.filter((item, index) => index !== action.id)
      };
    case types.STAR_FRIEND:
      let friends = [...state.friendsById];
      let friend = friends.find((item, index) => index === action.id);
      friend.starred = !friend.starred;
      return {
        ...state,
        friendsById: friends
      };

    default:
      return state;
  }
}
