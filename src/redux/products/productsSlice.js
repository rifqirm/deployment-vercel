import { createSlice } from "@reduxjs/toolkit";

export const productsSlice = createSlice({
    name: 'products',
    initialState: {
        listProduct: [
    ]},
    reducers: {
        addProduct: (state, actions) => {
            return {
                ...state,
                listProduct: [...state.listProduct, actions.payload],
            };
        },
        deleteProduct: (state, actions) => {
            state.listProduct = state.listProduct.filter(product => product.productId != actions.payload)
        },
        editProduct: (state, actions) => {
            state.listProduct = state.listProduct.map(product => product.productId === actions.payload.productId ? actions.payload : product)
        }
    }
}) 

//export action
export const { addProduct, deleteProduct, editProduct } = productsSlice.actions

//export reducer
export default productsSlice.reducer