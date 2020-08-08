export const state = () => ({
    cart: [],
    cartLength: 0,
    shippingPrice: 0,
    shippingEstimatedDelivery: ''
})

export const actions = {
    addProductToCart({state, commit}, product) {
        const cartProduct = state.cart.find(prod => prod._id === product._id);

        if(!cartProduct) {
            commit("pushProductToCart", product);
        }else {
            commit("incrementProductQty", cartProduct);
        }

        commit("incrementCartLenght");
    }
}

export const mutations = {
    pushProductToCart(state, product) {
        product.quantity = 1;
        state.cart.push(product);
    },

    incrementProductQty(state, product) {
        product.quantity ++;
        let indexOfProduct = state.cart.indexOf(product);
        state.cart.splice(indexOfProduct, 1, product);
    },

    incrementCartLenght(state) {
        state.cartLength = 0;
        if(state.cart.length > 0) {
            state.cart.map(product => {
                state.cartLength += product.quantity;
            });
        }
    },
    
    changeQty(state, {product, qty}) {
        let cartProduct = state.cart.find(prod => prod._id === product._id);
        cartProduct.quantity = qty;

        state.cartLength = 0;
        if(state.cart.length > 0) {
            state.cart.map(prod => {
                state.cartLength += prod.quantity;
            });
        }

        let indexOfProduct = state.cart.indexOf(cartProduct);
        state.cart.splice(indexOfProduct, 1, cartProduct);
    },
    removeProduct(state, product) {
        state.cartLength -= product.quantity;

        let cartProduct = state.cart.find(prod => prod._id === product._id);

        let indexOfProduct = state.cart.indexOf(cartProduct);

        state.cart.splice(indexOfProduct, 1);
    },
    setShipping(state, {price, estimatedDelivery}) {
        state.shippingPrice = price;
        state.shippingEstimatedDelivery = estimatedDelivery;
    },
    clearCart(state) {
        state.cart = [];
        state.cartLength = 0;
        state.shippingPrice = 0;
        state.shippingEstimatedDelivery = '';
    }
}

export const getters = {
    isAuthenticated(state) {
        return state.auth.loggedIn
    },
    loggedInUser(state) {
        return state.auth.user
    },
    getCartLength(state) {
        return state.cartLength;
    },
    getCart(state) {
        return state.cart;
    },
    getCartTotalPrice(state) {
        let total = 0;
        state.cart.map(product => {
            total += product.price * product.quantity 
        });

        return total;
    },
    getCartTotalPriceWithShipping(state) {
        let total = 0;
        state.cart.map(product => {
            total += product.price * product.quantity 
        });

        return total + state.shippingPrice;
    },
    getEstimatedDelivery(state) {
        return state.shippingEstimatedDelivery;
    }
}