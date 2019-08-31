import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import axios from 'axios';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from "redux-saga/effects";

// Create the rootSaga generator function
function* rootSaga() {
  yield takeEvery('ADD_MOVIES', addMovies);
  yield takeEvery('GET_DETAILS', allDetails);
}

function* addMovies(action) {
    try {
        let response = yield axios.get('/movie');
        console.log('from server', response.data);
        yield put({
            type: 'SET_MOVIES',
            payload: response.data
        })
    } catch(error) {
        console.log('error in getting movies', error);
    }
}

function* allDetails(action) {
    try {
        let response = yield axios.get(`/movie/${action.payload}`);
        console.log('Details from server', response.data);
        yield put ({
            type: 'SET_DETAILS',
            payload: response.data[0]
        })
    } catch(error) {
        console.log('error in allDetails', error);
    }
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store movies returned from the server
const movies = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        default:
            return state;
    }
}

// Used to store the movie genres
const genres = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRES':
            return action.payload;
        default:
            return state;
    }
}

//Used to store the current movie detail
const currentMovie = (state = 0, action) => {
    switch (action.type) {
        case 'CURRENT_DETAIL':
            return action.payload;
        default:
            return state;
    }
}

//Used to store current details for the selected movie
const currentDetails = (state = [], action) => {
    switch (action.type) {
        case 'SET_DETAILS':
            return action.payload;
        case 'EDIT_TITLE':
            return {...state, title: action.payload};
        case 'EDIT_DESCRIPTION':
            return {...state, description: action.payload};
        default:
            return state;
    }
}

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        movies,
        genres,
        currentMovie,
        currentDetails
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(<Provider store={storeInstance}><App /></Provider>, 
    document.getElementById('root'));
registerServiceWorker();
