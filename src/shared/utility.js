/**
 * Updates an object immutablely, by combining two objects.
 * @param {*} oldObject original object being updated.
 * @param {*} updatedProperties new properties to overlay on top of the object.
 * @returns {*} A new immutable object where the updatedProperties is applied after the oldObject.
 */
export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    }
};

/**
 * Utility to strigify two objects passed and compare if they are the same. This implies a specific order of items in an array or object.
 * @param {*} obj1 
 * @param {*} obj2 
 * @returns boolean true if they are equal
 */
export const strigifyCompareObjects = (obj1, obj2) => {
    const string1 = JSON.stringify(obj1);
    const string2 = JSON.stringify(obj2);
    return string1 === string2
};
