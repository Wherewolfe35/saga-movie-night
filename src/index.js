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
import { put, takeEvery } from 'redux-saga/effects';


// Create the rootSaga generator function
function* rootSaga() {
    yield takeEvery('ADD_MOVIES', addMovies);
    yield takeEvery('GET_DETAILS', allDetails);
    yield takeEvery('UPDATE_MOVIE', updateMovies);
    yield takeEvery('ADD_GENRE', addGenre);
    yield takeEvery('DELETE_GENRE', deleteGenre);
    yield takeEvery('SEARCH_MOVIES', search);
    yield takeEvery('NEW_GENRE', newGenre);
    yield takeEvery('REMOVE_GENRE', removeGenre);
}
//request to grab all movies from movies table and store in movies reducer
function* addMovies(action) {
    try {
        let movieResponse = yield axios.get('/movie');
        let genreResponse = yield axios.get('/genre');
        console.log('add movies saga');
        yield put({
            type: 'SET_MOVIES',
            payload: movieResponse.data
        })
        yield put({
            type: 'SET_GENRES',
            payload: genreResponse.data
        })
    } catch (error) {
        console.log('error in getting movies request', error);
    }
}
//request to grab selected movie details and genres and place in appropriate reducers
function* allDetails(action) {
    try {
        let response = yield axios.get(`/movie/${action.payload}`);
        console.log('Details from server', response.data);
        yield put({
            type: 'SET_DETAILS',
            payload: response.data
        })
    } catch (error) {
        console.log('error in allDetails request', error);
    }
}
//request to database to update title and description and then request the new information
function* updateMovies(action) {
    try {
        yield axios.put(`/movie`, action.payload);
        yield put({
            type: 'GET_DETAILS',
            payload: action.payload.id
        })
    } catch (error) {
        console.log('error in updateMovies request', error);
    }
}

//request to add a genre to the selected move and then request updated movie details
function* addGenre(action) {
    try {
        yield axios.post('/genre/movie', action.payload);
        yield put({
            type: 'GET_DETAILS',
            payload: action.payload.movies_id
        })
    } catch (error) {
        console.log('error in addGenre request', error);
    }
}

//request to remove selected genre from specified movie and then request updated details
function* deleteGenre(action) {
    try {
        yield axios.delete(`/genre/${action.payload.movies_id}/${action.payload.genres_id}`);
        yield put({
            type: 'GET_DETAILS',
            payload: action.payload.movies_id
        })
    } catch (error) {
        console.log('error in deleteGenre request', error);
    }
}

//request to search movie database with specified query, q
function* search(action) {
    try {
        let response = yield axios.get(`/movie?q=${action.payload}`);
        yield put({
            type: 'SET_MOVIES',
            payload: response.data
        })
    } catch (error) {
        console.log('error in search request', error);
    }
}

//request to add new movie genre to general list of genres
function* newGenre(action) {
    try {
        yield axios.post('/genre', action.payload);
        yield put({
            type: 'ADD_MOVIES',
        });
    } catch (error) {
        console.log('error in newGenre request', error);
    }
}

//request to delete movie genre from general genre list
function* removeGenre(action) {
    try {
        yield axios.delete(`/genre/${action.payload.id}`);
        yield put({
            type: 'ADD_MOVIES',
        });
    } catch (error) {
        console.log('error in removeGenre request', error);
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

//Used to store current details for the selected movie
const currentDetails = (state = '', action) => {
    switch (action.type) {
        case 'SET_DETAILS':
            return action.payload;
        case 'EDIT_TITLE':
            return [{ ...state[0], title: action.payload }];
        case 'EDIT_DESCRIPTION':
            return [{ ...state[0], description: action.payload }];
        default:
            return state;
    }
}

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        movies,
        genres,
        currentDetails,
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(<Provider store={storeInstance}><App /></Provider>,
    document.getElementById('root'));
registerServiceWorker();
