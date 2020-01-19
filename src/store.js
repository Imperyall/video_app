  
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";

const configureStoreProd = initialState => {
    const middlewares = [
        thunk,
    ];

    const store = createStore(
        reducers,
        initialState,
        compose(applyMiddleware(...middlewares))
    );

    return store;
};

const configureStoreDev = initialState => {
    const middlewares = [
        thunk,
    ];

    const composeEnhancers =
        typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
            ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
            : compose;

    const store = createStore(
    reducers,
    initialState,
    composeEnhancers(applyMiddleware(...middlewares))
    );

    return store;
};


const configureStore =
  process.env.NODE_ENV === "production"
    ? configureStoreProd
    : configureStoreDev;
export default configureStore;