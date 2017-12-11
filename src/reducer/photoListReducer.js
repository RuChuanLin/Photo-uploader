import { INIT_PHOTOLIST, UPDATE_PHOTOLIST } from '../actions/types';

export default function(state = [], action) {
  switch (action.type) {
    case INIT_PHOTOLIST:
      return action.payload;
    case UPDATE_PHOTOLIST:
      return action.payload;
  }
  return state;
}
