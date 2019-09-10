import { combineReducers } from 'redux';
import pil from './pil';
import licenceHolder from './profile';
import establishment from './establishment';

const rootReducer = combineReducers({
  pil,
  licenceHolder,
  establishment
});

export default rootReducer;
