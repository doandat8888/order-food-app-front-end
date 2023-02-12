import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const items = []

const initialState = {
    value: items
}


const likeItemSlice = createSlice({
    name: 'likeItems',
    initialState,
    reducers: {
        addLikeItems: (state, action) => {
            const productDuplicate = findItem(state.value, action.payload);
            if(productDuplicate.length > 0) {
                state.value = delItem(state.value, action.payload);
                state.value = [
                    ...state.value,
                    {
                        ...action.payload,
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
        removeLikeItem: (state, action) => {
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

const {actions, reducer} = likeItemSlice;
export const {addLikeItems, removeLikeItem} = actions;
export default reducer