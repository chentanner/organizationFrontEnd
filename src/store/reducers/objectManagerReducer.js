import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';
import { jsonformsReducer } from '@jsonforms/core';

export const objectManagerInitialState = {};

const someThing = (state, action) => {
    return updateObject(state, { something: "something", });
};

const initObjectManager = (state, action) => {
    const initState = { [action.objectManagerName]: {} }
    // Our initState shouldn't wipe out the current state if it's defined so passing it first
    return updateObject(initState, state);
}

const addObjectManagerItem = (state, action) => {
    const initState = updateObject(state[action.objectManagerName], { [action.key]: {} })
    // Our initState shouldn't wipe out the current state if it's defined so passing it first
    return updateObject({ [action.objectManagerName]: initState }, state)
}

const closeObjectManagerItem = (state, action) => {

    const updatedObjectManagerTypeState = { ...state[action.objectManagerName] }
    delete updatedObjectManagerTypeState[action.key]
    // const updatedObjectManagerState = {...state, updatedObjectManagerTypeState}

    // const initState = updateObject(state[action.objectManagerName],  {[action.key]:{}})
    // Our initState shouldn't wipe out the current state if it's defined so passing it first
    const updatedState = updateObject(state, { [action.objectManagerName]: updatedObjectManagerTypeState })
    return updatedState;
}


//  state: {
//      objectManager: {
//          organizations:{
//              "7":{
//                  id:7
//              }
//          }
//      } 
//  }
const setObjectManagerItemData = (state, action) => {
    //TODO set a clone object, to use as a reference when comparing

    const updatedCloneObject = { clone: { ...action.data } } // {clone:{...data}}
    const updatedDataObject = { data: { ...action.data } } // {data:{...data}}
    const updatedObjectManagerItem = { [action.key + ""]: { ...updatedCloneObject, ...updatedDataObject } }; // {"7: { clone:{...}, data:{...} }"}
    const updatedObjectManager = updateObject(state[action.objectManagerName], updatedObjectManagerItem)
    const updatedState = updateObject(state, { [action.objectManagerName]: updatedObjectManager })

    return updatedState;
}

const updateObjectManagerItemData = (state, action) => {
    //TODO set a clone object, to use as a reference when comparing

    // const updatedCloneObject = {clone:{...action.data}} // {clone:{...data}}
    const updatedDataObject = { data: { ...action.data } } // {data:{...data}}
    const updatedObjectManagerItem = { [action.key + ""]: { ...state[action.objectManagerName][action.key + ""].clone, ...updatedDataObject } }; // {"7: { clone:{...}, data:{...} }"}
    const updatedObjectManager = updateObject(state[action.objectManagerName], updatedObjectManagerItem)
    const updatedState = updateObject(state, { [action.objectManagerName]: updatedObjectManager })

    return updatedState;
}

const reducer = (state = objectManagerInitialState, action) => {
    switch (action.type) {
        case actionTypes.SOME_ACTION: return someThing(state, action);
        case actionTypes.INIT_OBJECT_MANAGER: return initObjectManager(state, action);
        case actionTypes.ADD_OBJECT_MANAGER_ITEM: return addObjectManagerItem(state, action);
        case actionTypes.CLOSE_OBJECT_MANAGER_ITEM: return closeObjectManagerItem(state, action);
        case actionTypes.SET_OBJECT_MANAGER_ITEM_DATA: return setObjectManagerItemData(state, action);
        case actionTypes.UPDATE_OBJECT_MANAGER_ITEM_DATA: return updateObjectManagerItemData(state, action);

        default: return state;
    }
}

export default reducer;