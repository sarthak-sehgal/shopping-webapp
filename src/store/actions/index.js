export {
    authStartLoading,
    authStopLoading,
    userStartLoading,
    userStopLoading,
    uiStartLoading,
    uiStopLoading,
    productsStartLoading,
    productsStopLoading,
    cartStartLoading,
    cartStopLoading
} from './ui';

export {
    signIn,
    getUsers,
    setNewUser,
    setUser,
    getUser,
    signOut
} from './auth';

export {
    addCategory,
    getCategories,
    addProduct,
    getProducts
} from './products';

export {
    getCart,
    addToCart,
    doesExistInCart,
    removeItemFromCart,
    setProductQty,
    storeCart
} from './cart';

export {
    getAddresses,
    addAddress,
    deleteAddress
} from './addresses';

export {
    getOrders,
    placeOrder
} from './orders';