import db from '../../firebaseConfig';
import { STORE_CATEGORIES, STORE_NEW_CATEGORY } from './actionTypes';

export const addCategory = (name) => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            let categories = getState().products.categories;
            let lastKey = 0;
            let exists = false;
            if (categories) {
                categories.map(category => {
                    if (category === name) {
                        exists = true;
                        reject("exists");
                    }
                })
                lastKey = categories.length;
            }
            if (!exists) {
                db.ref('/categories/').update({
                    [lastKey]: name
                });
                dispatch(storeNewCategory(name));
                resolve("added");
            }
        })
    }
}

export const getCategories = () => {
    return dispatch => {
        db.ref('/categories/').once('value')
            .then((snap) => {
                var snapData = snap.val();
                console.log(snapData);
                dispatch(storeCategories(snapData));
            })
            .catch(err => {
                dispatch(storeCategories({ "0": "Error" }));
                console.log(err);
            });
    }
}

export const storeCategories = (categories) => {
    return {
        type: STORE_CATEGORIES,
        categories
    }
}

export const storeNewCategory = (name) => {
    return {
        type: STORE_NEW_CATEGORY,
        name
    }
}

export const addProduct = (name, category, price, description) => {
    return dispatch => {
        let key = db.ref('/products/' + category + '/').push().key;
        db.ref('/products/' + category + '/' + key).set({
            name,
            category,
            price,
            description
        })
    }
}