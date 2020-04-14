import {createStore} from 'redux';
import rootReducer from "../reducers/reducer";
import {initialState} from "../reducers/reducer"

const store = createStore(rootReducer, initialState);
export default store;