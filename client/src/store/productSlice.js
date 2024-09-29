import { createSlice } from '@reduxjs/toolkit'

const productInfo = {
    product: [],
    orderCode: '',
}

export const productSlice = createSlice({
    name: 'user',
    initialState: productInfo,
    reducers: {
        setProduct: (state, action) => {
            state.product = action.payload
        },
        setOrderCode: (state, action) => {
            state.orderCode = action.payload
        }
    }
})

export const productAction = productSlice.actions;

export default productSlice.reducer;