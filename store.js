import { configureStore} from "@reduxjs/toolkit";
import cartItemSlice from "./reducers/cartItems";
import likeItemSlice from "./reducers/likeItems";

const store =  configureStore({
    reducer: {
        cartItems: cartItemSlice,
        likeItems: likeItemSlice
    },
})

export default store;
