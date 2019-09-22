import { combineReducers } from "redux";

import problem from './problem'
import movie from './movie'

const rootReducer = combineReducers({
	movie,
	problem
})


export default rootReducer
