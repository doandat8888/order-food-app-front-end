import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const items = []

const initialState = {
    value: items
}

const findIndex = (carts, id) => {
    var result = -1;
    carts.forEach((cart, index) => {
        if(cart.id === id) {
            result = index;
        }
    });
    return result;
};



const cartItemSlice = createSlice({
    name: 'cartItems',
    initialState,
    reducers: {
        addItems: (state, action) => {
            const productDuplicate = findItem(state.value, action.payload);
            if(productDuplicate.length > 0) {
                state.value = delItem(state.value, action.payload);
                state.value = [
                    ...state.value,
                    {
                        ...action.payload,
                        quantity: productDuplicate[0].quantity + action.payload.quantity,
                        id: productDuplicate[0].id,
                    }
                    
                ]
            }else {
                state.value = [
                    ...state.value,
                    {
                        ...action.payload,
                        id: state.value.length > 0 ? state.value[state.value.length - 1].id + 1 : 1
                    }
                ]
            }

            state.value = state.value.sort((a, b) => a.id > b.id ? 1 : (a.id < b.id) ? -1 : 0 )
            
        },
        updateItems: (state, action) => {
            const productToUpdate = findItem(state.value, action.payload); 
            if(productToUpdate.length > 0) {
                const index = findIndex(state.value, productToUpdate[0].id);
                if(index >= 0) {
                    state.value[index].quantity = action.payload.quantity;
                }

                state.value = [
                    ...state.value,
                ]

            }
            state.value = state.value.sort((a, b) => a.id > b.id ? 1 : (a.id < b.id) ? -1 : 0 )
        },
        removeItem: (state, action) => {
            const productToDelete = findItem(state.value, action.payload); 
            if(productToDelete.length > 0) {
                state.value = delItem(state.value, action.payload);
            }
            state.value = state.value.sort((a, b) => a.id > b.id ? 1 : (a.id < b.id) ? -1 : 0 )
        }
    }
})

const findItem = (carts, item) => carts.filter(cart => cart.foodInfo.name === item.foodInfo.name)
const delItem = (arr, item) => arr.filter((e) => e.foodInfo.name !== item.foodInfo.name)

const {actions, reducer} = cartItemSlice;
export const {addItems, updateItems, removeItem} = actions;
export default reducer