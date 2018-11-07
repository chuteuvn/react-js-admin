import { bindActionCreators } from 'redux';
import { put, take, call, cancelled, fork, cancel, takeEvery } from 'redux-saga/effects';
import * as cookies from './../utils/cookies';

import * as apiCaller from './apiCaller';

/**
 * Consts
 */
export const COOKIE_TOKEN = 'sdr_tk';

export const INIT_READY = 'INIT_READY'

export const LOGIN = 'LOGIN'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_ERROR = 'LOGIN_ERROR'
export const LOGIN_CANCEL = 'LOGIN_CANCEL'

export const LOGOUT = 'LOGOUT'



/**
 * Reducer
 */
const initialState = {
    ready: false,
    // user: {}
}

export const authenticationReducer = (state = initialState, action) => {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        console.log(action)
    }
    switch (action.type) {
        case INIT_READY:
            return { ...state, ready: true }

        case LOGIN:
            return { ...state, user: null }

        case LOGIN_ERROR:
            return { ...state, user: null }

        case LOGIN_SUCCESS:
            return { ...state, user: action.payload }

        default:
            return state
    }
}

/**
 * Actions
 */

export const actionLogin = (accessToken, loginOption, userType) => ({
    type: LOGIN,
    data: {
        accessToken, loginOption, userType
    }
})

export const mapActionsToProps = (dispatch) => {
    return bindActionCreators({
        login: actionLogin,
    }, dispatch);
}

/**
 * Apis
 */

const apiLogin = (accessToken, loginOption, userType, deviceId) => {
    return apiCaller.post('/auth/login', { accessToken, deviceId, loginOption, userType })
}

const apiGetProfile = () => {
    return apiCaller.get('/user/getProfile')
}

/**
 * sagas
 */

const authorize = function* (accessToken, loginOption, userType) {
    try {
        const rs = yield call(apiLogin, accessToken, loginOption, userType)
        yield put({ type: LOGIN_SUCCESS, payload: rs.data.data.user })
    } catch (error) {
        yield put({ type: LOGIN_ERROR, error })
    } finally {
        if (yield cancelled()) {
            yield put({ type: LOGIN_CANCEL })
        }
    }
}

export const loginFlow = function* () {
    while (true) {
        const {
            data: {
                accessToken,
                loginOption,
                userType
            }
        } = yield take(LOGIN)
        // fork return a Task object
        const task = yield fork(authorize, accessToken, loginOption, userType)
        const action = yield take([LOGOUT, LOGIN_ERROR, LOGIN_SUCCESS])
        if (action.type === LOGOUT)
            yield cancel(task)
    }
}

/**
 * check init flow
 */

export const initFlow = function* () {
    const token = cookies.get(COOKIE_TOKEN);
    if (token) {
        try {
            apiCaller.setToken(token);
            const rs = yield call(apiGetProfile);
            yield put({ type: LOGIN_SUCCESS, payload: rs.data.data })
        } catch (error) {

        }
    }
    yield put({ type: INIT_READY })
}