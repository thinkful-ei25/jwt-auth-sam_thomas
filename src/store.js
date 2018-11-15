import {createStore, applyMiddleware, combineReducers, compose} from 'redux';
import {reducer as formReducer} from 'redux-form';
import thunk from 'redux-thunk';
import authReducer from './reducers/auth';
import activityReducer from './reducers/activity';
import protectedDataReducer from './reducers/protected-data';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    combineReducers({
        form: formReducer,
        auth: authReducer,
        protectedData: protectedDataReducer,
        activity: activityReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
);

// Hydrate the authToken from localStorage if it exist


export default store;
