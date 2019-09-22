import root from "./reducers"
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from "redux";

const configureStore = () => {
    const middlewares = [thunk]
    
    const store = createStore(root, applyMiddleware(...middlewares))
    return store
}

export default configureStore