import { ADD_ACTIVE_TWEET } from "./action.types";

export const reducer = (state, action) => {
  switch (action.type) {
    case ADD_ACTIVE_TWEET:
      return { ...state, activeTweet: action.payload };
    default:
      return state;
  }
};
