import { combineReducers } from 'redux';
// import {  } from '../actions';

function test1(state = {}, action) {
  switch (action.type) {
    case 'TEST':
      console.log('test');
      return state;
    default:
      console.log('default');
      return state;
  }
}

function test2(state = {}, action) {
  switch (action.type) {
    case 'TEST':
      console.log('test2');
      return state;
    default:
      console.log('default2');
      return state;
  }
}
export default combineReducers({
  test1,
  test2
});
