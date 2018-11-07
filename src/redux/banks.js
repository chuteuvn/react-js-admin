import { bindActionCreators } from 'redux';
import { put, take, call, cancelled, fork, cancel, takeEvery } from 'redux-saga/effects';

import * as apiCaller from './apiCaller';
import { stat } from 'fs';

/**
 * Consts
 */

export const GET_ALL_BANK = 'GET_ALL_BANK'
export const GET_ALL_BANK_SUCCESS = 'GET_ALL_BANK_SUCCESS'
export const GET_ALL_BANK_ERROR = 'GET_ALL_BANK_ERROR'

export const CREATE_A_BANK_ACCOUNT = 'CREATE_A_BANK_ACCOUNT'
export const CREATE_A_BANK_ACCOUNT_SUCCESS = 'CREATE_A_BANK_ACCOUNT_SUCCESS'
export const CREATE_A_BANK_ACCOUNT_ERROR = 'CREATE_A_BANK_ACCOUNT_ERROR'

export const UPDATE_A_BANK_ACCOUNT = 'UPDATE_A_BANK_ACCOUNT'
export const UPDATE_A_BANK_ACCOUNT_SUCCESS = 'UPDATE_A_BANK_ACCOUNT_SUCCESS'
export const UPDATE_A_BANK_ACCOUNT_ERROR = 'UPDATE_A_BANK_ACCOUNT_ERROR'

export const DELETE_A_BANK_ACCOUNT = 'DELETE_A_BANK_ACCOUNT'
export const DELETE_A_BANK_ACCOUNT_SUCCESS = 'DELETE_A_BANK_ACCOUNT_SUCCESS'
export const DELETE_A_BANK_ACCOUNT_ERROR = 'DELETE_A_BANK_ACCOUNT_ERROR'

/**
 * Reducer
 */

const initialState = {
    banks: [],
    error: false,
    bank: [],
    updateStatus: null,
    deleteStatus: null
}

export const banksReducer = (state = initialState, action) => {
    // if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    //     console.log(action)
    // }
    switch (action.type) {

        // get list all banks

        case GET_ALL_BANK:
            return {
                ...state,
                banks: []
            }

        case GET_ALL_BANK_SUCCESS:
            return {
                ...state,
                banks: action.payload,
            }

        case GET_ALL_BANK_ERROR:
            return {
                ...state,
                banks: []
            }

        // create a bank account

        case CREATE_A_BANK_ACCOUNT:
            return {
                ...state,
                bank: []
            }

        case CREATE_A_BANK_ACCOUNT_SUCCESS:
            return {
                ...state,
                bank: action.payload
            }

        case CREATE_A_BANK_ACCOUNT_ERROR:
            return {
                ...state,
                bank: [],
                error: action.error.message
            }

        //update a bank account

        case UPDATE_A_BANK_ACCOUNT:
            return {
                ...state,
                updateStatus: null
            }

        case UPDATE_A_BANK_ACCOUNT_SUCCESS:
            return {
                ...state,
                updateStatus: action.payload.message
            }

        case UPDATE_A_BANK_ACCOUNT_ERROR:
            return {
                ...state,
                updateStatus: action.error.message
            }

        // delete a bank account

        case DELETE_A_BANK_ACCOUNT:
            return {
                ...state,
                deleteStatus: null
            }

        case DELETE_A_BANK_ACCOUNT_SUCCESS:
            return {
                ...state,
                deleteStatus: action.payload.message
            }

        case DELETE_A_BANK_ACCOUNT_ERROR:
            return {
                ...state,
                deleteStatus: action.error.message
            }

        default:
            return state
    }
}

/**
 * Actions
 */

export const getAllBanks = () => ({
    type: GET_ALL_BANK,
})

export const actionCreateABankAccount = (accountNumber, accountHolder, bankName, bankBranchName, enabled) => ({
    type: CREATE_A_BANK_ACCOUNT,
    data: {
        accountNumber,
        accountHolder,
        bankName,
        bankBranchName,
        enabled
    }
})

export const actionUpdateABankAccount = (bankId, accountNumber, accountHolder, bankName, bankBranchName, enabled) => ({
    type: UPDATE_A_BANK_ACCOUNT,
    data: {
        bankId,
        accountNumber,
        accountHolder,
        bankName,
        bankBranchName,
        enabled
    }
})

export const actionDeleteABankAccount = (bankId) => ({
    type: DELETE_A_BANK_ACCOUNT,
    data: {
        bankId
    }
})

export const mapActionsToProps = (dispatch) => {
    return bindActionCreators({
        getAllBanks: getAllBanks,
        actionCreateABankAccount: actionCreateABankAccount,
        actionUpdateABankAccount: actionUpdateABankAccount,
        actionDeleteABankAccount: actionDeleteABankAccount,
    }, dispatch);
}

/**
 * Apis
 */

const apiGetAllBanks = () => {
    return apiCaller.post('/admin/banks/all')
}

const apiCreateABankAccount = (accountNumber, accountHolder, bankName, bankBranchName, enabled) => {
    return apiCaller.post('/admin/banks/create', { accountNumber, accountHolder, bankName, bankBranchName, enabled })
}

const apiUpdateABankAccount = (bankId, accountNumber, accountHolder, bankName, bankBranchName, enabled) => {
    return apiCaller.post(`/admin/banks/update/${bankId}`,
        {
            accountNumber,
            accountHolder,
            bankName,
            bankBranchName,
            enabled
        })
}

const apiDeleteABankAccount = (bankId) => {
    return apiCaller.post(`/admin/banks/delete/${bankId}`)
}

/**
 * sagas
 */

export const deleteABankAccountFlow = function* () {
    while (true) {
        const { data: { bankId } } = yield take(DELETE_A_BANK_ACCOUNT);

        try {
            const rq = yield call(apiDeleteABankAccount, bankId);
            yield put({ type: DELETE_A_BANK_ACCOUNT_SUCCESS, payload: rq.data.message });

        } catch (error) {
            yield put({ type: DELETE_A_BANK_ACCOUNT_ERROR, error })
        }
    }
}

export const updateABankAccountFlow = function* () {
    while (true) {
        const {
            data: {
                bankId, accountNumber, accountHolder, bankName, bankBranchName, enabled
            }
        } = yield take(UPDATE_A_BANK_ACCOUNT);

        try {
            const rq = apiCaller(apiUpdateABankAccount, bankId, accountNumber, accountHolder, bankName, bankBranchName, enabled)
            yield put({ type: UPDATE_A_BANK_ACCOUNT_SUCCESS, payload: rq.data })
        } catch (error) {
            yield put({ type: UPDATE_A_BANK_ACCOUNT_ERROR, error })
        }
    }
}

export const createABankAccountFlow = function* () {
    while (true) {
        const {
            data: {
                accountNumber, accountHolder, bankName, bankBranchName, enabled
            }
        } = yield take(CREATE_A_BANK_ACCOUNT);
        try {
            const rq = apiCaller(apiCreateABankAccount, accountNumber, accountHolder, bankName, bankBranchName, enabled);
            yield put({ type: CREATE_A_BANK_ACCOUNT_SUCCESS, payload: rq.data.data });
        } catch (error) {
            yield put({ type: CREATE_A_BANK_ACCOUNT_ERROR, error })
        }
    }
}

export const getAllBanksFlow = function* () {
    while (true) {
        yield take(GET_ALL_BANK);
        try {
            const rq = yield call(apiGetAllBanks);
            yield put({ type: GET_ALL_BANK_SUCCESS, payload: rq.data.data.banks })
        } catch (error) {
            yield put({ type: GET_ALL_BANK_ERROR, error })
        }
    }
}
