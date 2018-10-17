import db from '../../firebaseConfig';
import { STORE_CATEGORIES, STORE_NEW_CATEGORY, STORE_PRODUCTS, ADD_PRODUCT_IN_STORE } from './actionTypes';
import { productsStartLoading, productsStopLoading, uiStartLoading, uiStopLoading } from './index';

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
        dispatch(uiStartLoading());
        db.ref('/categories/').once('value')
            .then((snap) => {
                dispatch(uiStopLoading());
                var snapData = snap.val();
                console.log(snapData);
                dispatch(storeCategories(snapData));
            })
            .catch(err => {
                dispatch(uiStopLoading());
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

export const addProduct = (name, category, price, description, isImg) => {
    return dispatch => {
        return new Promise((resolve) => {
            dispatch(doesProductExists(name, category))
                .then(result => {
                    console.log(result);
                    if (result === "exists") {
                        resolve("Product exists!");
                    } else if (result === "notExists") {
                        let key = db.ref('/products/' + category + '/').push().key;
                        db.ref('/products/' + category + '/' + key).set({
                            name,
                            category,
                            price,
                            description,
                            isImg
                        })
                        dispatch(addProductInStore({name, category, price, description, isImg}, key));
                        resolve("Product added!");
                    } else {
                        resolve("Error occurred while adding product!")
                    }
                })
        })
    }
}

export const getProducts = () => {
    return dispatch => {
        dispatch(productsStartLoading());
        db.ref('/products/').once('value')
            .then((snap) => {
                var snapData = snap.val();
                console.log(snapData);
                dispatch(productsStopLoading());
                dispatch(storeProducts(snapData));
            })
            .catch(err => {
                dispatch(productsStopLoading())
                dispatch(storeProducts("error"));
                console.log(err);
            });
    }
}

export const storeProducts = (products) => {
    return {
        type: STORE_PRODUCTS,
        products
    }
}

export const doesProductExists = (name, category) => {
    return (dispatch, getState) => {
        return new Promise((resolve) => {
            let exists = false;
            let products = getState().products.products;
            if(!products)
                products = {};
            if (products[category]) {
                Object.keys(products[category]).map(key => {
                    // console.log(products[category][key])
                    if (products[category][key].name === name) {
                        exists = true;
                        resolve("exists");
                    }
                })
            }
            if (!exists)
                resolve("notExists")
        })
    }
}

export const addProductInStore = (productObj, key) => {
    return {
        type: ADD_PRODUCT_IN_STORE,
        productObj,
        key
    }
}