import { put, call } from 'redux-saga/effects';
import Router from 'next/router';
import { Actions } from '@jsonforms/core';
import axios from '../../axios-data';
import * as actions from '../actions/index';

export function* openItemInObjectManagerSaga(action) {
    yield console.log(action)
    yield call(Router.pushRoute, action.url)
};

export function* initJsonFormSaga(action) {
    yield console.log("initJsonFormSaga", action);

    yield put(Actions.init(
        action.data || {},
        action.schema,
        action.uischema
    ));

    yield call(action.callback);
};

export function* fetchObjectManagerItemSaga(action) {
    try {
        const result = yield axios.get(action.url)

        yield console.log("result", result)
        yield put(actions.setObjectManagerItem(action.objectManagerName, action.key, result.data));
    } catch (error) {
        yield console.log("saga fetch error")
    }
}