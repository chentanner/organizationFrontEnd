import { takeEvery } from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';

import {
    initJsonFormSaga,
    openItemInObjectManagerSaga,
    fetchObjectManagerItemSaga
} from './objectManagerSagas';

export function* watchObjectManager() {
    yield takeEvery(actionTypes.OPEN_ITEM_IN_OBJECT_MANAGER, openItemInObjectManagerSaga);
    yield takeEvery(actionTypes.INIT_JSON_FORM, initJsonFormSaga);
    yield takeEvery(actionTypes.FETCH_OBJECT_MANAGER_ITEM, fetchObjectManagerItemSaga);

};

export function* rootSagaWatcher() {
    console.log("RootSAGAWATCHER", arguments);
};