import { combineReducers, createStore, applyMiddleware } from "redux";
import createSagaMiddleware from 'redux-saga';
import { fork } from 'redux-saga/effects'

import * as authentication from './authentication';
import * as users from './user';
import * as getCities from './getCities';
import * as banks from './banks';

const reducers = combineReducers({
    authentication: authentication.authenticationReducer,
    users: users.userReducer,
    getAllCities: getCities.getAllCitiesReducer,
    banksReducer: banks.banksReducer

})

const sagas = function* () {
    yield [
        fork(authentication.initFlow),
        fork(authentication.loginFlow),

        fork(getCities.getAllCitiesFlow),

        fork(users.searchUse),
        fork(users.updateStatusFlow),

        fork(banks.getAllBanksFlow),
        fork(banks.createABankAccountFlow),
        fork(banks.updateABankAccountFlow),
        fork(banks.deleteABankAccountFlow),
    ]
}


const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    reducers,
    applyMiddleware(sagaMiddleware)
);
sagaMiddleware.run(sagas);

export default store;