import { bindActionCreators } from 'redux';
import { put, take, call, cancelled, fork, cancel, takeEvery } from 'redux-saga/effects';

import * as apiCaller from './apiCaller';

/**
 * Consts
 */

export const GET_ALL_CITIES = 'GET_ALL_CITIES'
export const GET_ALL_CITIES_SUCCESS = 'GET_ALL_CITIES_SUCCESS'
export const GET_ALL_CITIES_ERROR = 'GET_ALL_CITIES_ERROR'


/**
 * Reducer
 */
const initialState = {
    cities: [],
    error: false
}

export const getAllCitiesReducer = (state = initialState, action) => {
    // if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    //     console.log(action)
    // }
    switch (action.type) {
        case GET_ALL_CITIES:
            return {
                ...state,
                cities: []
            }
        case GET_ALL_CITIES_SUCCESS:
            return {
                ...state,
                cities: action.payload
            }
        case GET_ALL_CITIES_ERROR:
            return {
                ...state,
                cities: [],
                error: action.error.message
            }

        default:
            return state
    }
}

/**
 * Actions
 */

export const getAllCities = () => ({
    type: GET_ALL_CITIES,
})

export const mapActionsToProps = (dispatch) => {
    return bindActionCreators({
        getAllCities: getAllCities,
    }, dispatch);
}

/**
 * Apis
 */


const apiGetAllCities = () => {
    return apiCaller.get('/admin/geo/getAllCities')
}
/**
 * sagas
 */

export const getAllCitiesFlow = function* () {
    while (true) {
        yield take(GET_ALL_CITIES);
        try {
            const rq = yield call(apiGetAllCities);
            yield put({ type: GET_ALL_CITIES_SUCCESS, payload: rq.data.data })
        } catch (error) {
            yield put({ type: GET_ALL_CITIES_ERROR, error })
        }
    }
}
