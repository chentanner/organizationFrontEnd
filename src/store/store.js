import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import objectManagerReducer, { objectManagerInitialState } from './reducers/objectManagerReducer';
import { rootSagaWatcher, watchObjectManager } from './sagas/index';

import { Actions } from '@jsonforms/core';
import { materialRenderers, materialCells } from '@jsonforms/material-renderers'
import { jsonformsReducer } from '@jsonforms/core';

const rootReducer = combineReducers({
  objectManager: objectManagerReducer,
  jsonforms: jsonformsReducer()
});

const bindMiddleware = middleware => {
  if (process.env.NODE_ENV !== 'production') {
    console.log("Store built with dev tools")
    const { composeWithDevTools } = require('redux-devtools-extension');
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware)
}

const initState = {
  objectManager: { ...objectManagerInitialState },
  jsonforms: {}
}

export function configureStore(iState = initState) {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    rootReducer,
    iState,
    bindMiddleware([sagaMiddleware])
  );

  sagaMiddleware.run(watchObjectManager);

  return store;
};

let reduxStore = null

function initStore(initialState = initState) {
  // Make sure to create a new store for every server-side request so that data
  // isn't shared between connections (which would be bad)
  const isServer = typeof window === 'undefined'
  if (isServer) {
    return configureStore(initialState)
  }

  if (!reduxStore) {
    reduxStore = configureStore(initialState)

    dispatchClientOnlyDataForJsonForm()
  }
  return reduxStore
}

function dispatchClientOnlyDataForJsonForm() {
  // *** Work around to get JsonForms to work with Next.JS***
  // *** This is due to the fact that functions can't be serialized when
  // *** Next.JS  sends serialized redux state to the client
  // *** instead we need to insert the functions on the client side.

  //add JsonForm renderers
  for (const renderer of materialRenderers) {
    reduxStore.dispatch(Actions.registerRenderer(renderer.tester, renderer.renderer))
  }
  //add JsonForm cells
  for (const cell of materialCells) {
    reduxStore.dispatch(Actions.registerCell(cell.tester, cell.cell))
  }
}

export default initStore;