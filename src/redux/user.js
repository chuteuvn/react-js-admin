import { bindActionCreators } from 'redux';
import { put, take, call, cancelled, fork, cancel, takeEvery, select, takeLatest } from 'redux-saga/effects';

import * as apiCaller from './apiCaller';

/**
 * Consts
 */

export const GET_LIST_USE = 'GET_LIST_USE'
export const GET_LIST_USE_SUCCESS = 'GET_LIST_USE_SUCCESS'
export const GET_LIST_USE_ERROR = 'GET_LIST_USE_ERROR'

export const USER_UPDATE_STATUS = 'USER_UPDATE_STATUS'
export const USER_UPDATE_STATUS_SUCCESS = 'USER_UPDATE_STATUS_SUCCESS'
export const USER_UPDATE_STATUS_ERROR = 'USER_UPDATE_STATUS_ERROR'

/**
 * Reducer
 */
const initialState = {
    ready: false,
    users: [],
    status: '',
}

export const userReducer = (state = initialState, action) => {
    // if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    //     console.log(action)
    // }
    switch (action.type) {
        case GET_LIST_USE:
            return {
                ...state, users: []
            }

        case GET_LIST_USE_SUCCESS:
            return {
                ...state, users: action.payload
            }

        case GET_LIST_USE_ERROR:
            return {
                ...state, users: []
            }

        case USER_UPDATE_STATUS_SUCCESS:
            return {
                ...state,
                status: action.payload.message
            }

        case USER_UPDATE_STATUS_ERROR:
            return {
                ...state,
                status: action.error.message
            }

        default:
            return state
    }
}

/**
 * Actions
 */

export const getUsers = (offset, itemsPerPage, userType, query) => ({
    type: GET_LIST_USE,
    data: {
        offset,
        itemsPerPage,
        userType,
        query
    }
})

export const actionUpdateStatus = (userId, approved) => ({
    type: USER_UPDATE_STATUS,
    data: {
        userId, approved
    }
})

export const mapActionsToProps = (dispatch) => {
    return bindActionCreators({
        getUsers: getUsers,
        actionUpdateStatus: actionUpdateStatus,
    }, dispatch);
}

/**
 * Apis
 */


const apiSearchUse = (offset, itemsPerPage, userType, query) => {
    return apiCaller.post('/admin/user/searchUsers', { offset, itemsPerPage, filters: { userType, query } })
}

const apiUpdateStatus = (userId, approved) => {
    return apiCaller.post('/admin/user/updateStatus', { userId, approved })
}

/**
 * sagas
 */

export const updateStatusFlow = function* () {
    while (true) {
        const { data: { userId, approved } } = yield take(USER_UPDATE_STATUS);
        try {
            const rq = yield call(apiUpdateStatus, userId, approved);
            yield put({ type: USER_UPDATE_STATUS_SUCCESS, payload: rq.data })
        } catch (error) {
            yield put({ type: USER_UPDATE_STATUS_ERROR, error })
        }
    }
}

export const searchUse = function* (action) {
    while (true) {
        const {
            data: {
                offset,
                itemsPerPage,
                userType,
                query
            }
        } = yield take(GET_LIST_USE);

        try {
            const rq = yield call(apiSearchUse, offset, itemsPerPage, userType, query)
            yield put({ type: GET_LIST_USE_SUCCESS, payload: rq.data.data.users })
        } catch (error) {
            yield put({ type: GET_LIST_USE_ERROR, error })
        }
    }
}

