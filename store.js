import { configureStore} from "@reduxjs/toolkit";
import cartItemSlice from "./reducers/cartItems";

const store =  configureStore({
    reducer: {
        cartItems: cartItemSlice,
    },
})

export default store;
