import * as actionTypes from './actionTypes';

export const openItemInObjectManager = (key, url) => {
    return {
        type: actionTypes.OPEN_ITEM_IN_OBJECT_MANAGER,
        key: key,
        url: url
    };
};

export const initJsonForm = (data, schema, uischema, callback) => {
    return {
        type: actionTypes.INIT_JSON_FORM,
        data: data,
        schema: schema,
        uischema: uischema,
        callback: callback
    };
};

export const initObjectManager = (objectManagerName) => {
    return {
        type: actionTypes.INIT_OBJECT_MANAGER,
        objectManagerName: objectManagerName
    }
}

export const fetchObjectManagerItem = (objectManagerName, key, url) => {
    return {
        type: actionTypes.FETCH_OBJECT_MANAGER_ITEM,
        objectManagerName: objectManagerName,
        key: key,
        url: url
    }
}

export const addObjectManagerItem = (objectManagerName, key) => {
    return {
        type: actionTypes.ADD_OBJECT_MANAGER_ITEM,
        objectManagerName: objectManagerName,
        key: key
    }
}

export const setObjectManagerItem = (objectManagerName, key, data) => {
    return {
        type: actionTypes.SET_OBJECT_MANAGER_ITEM_DATA,
        objectManagerName: objectManagerName,
        key: key,
        data: data
    }
}

export const updateObjectManagerItem = (objectManagerName, key, data) => {
    return {
        type: actionTypes.UPDATE_OBJECT_MANAGER_ITEM_DATA,
        objectManagerName: objectManagerName,
        key: key,
        data: data
    }
}


export const closeObjectManagerItem = (objectManagerName, key) => {
    return {
        type: actionTypes.CLOSE_OBJECT_MANAGER_ITEM,
        objectManagerName: objectManagerName,
        key: key
    }
}