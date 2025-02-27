import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  products: [],
  lastProduct: {},
  newOrder: {},
  totalAmount: 0
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProducts: (state, action) => {
      const { id, ...restPayload } = action.payload;

      if (id) {
        const existingProductIndex = state.products.findIndex(
          (product) => product.id == id
        );
        state.products[existingProductIndex] = {
          ...state.products[existingProductIndex],
          ...restPayload,
        };
      } else {
        const newProduct = {
          ...restPayload,
          id: uuidv4(),
        };
        state.products.push(newProduct);
      }
    },
    showLastProduct: (state, action) => {
        if (state.products.length > 0) {
            state.lastProduct = action.payload ? action.payload : state.products[state.products.length - 1]
        }
    },
    updateOrderData: (state, action) => {
      state.newOrder = action.payload
    },
    updateTotalAmount: (state, action) => {
      state.totalAmount = action.payload
    }
  },
});

export const { addProducts, showLastProduct, updateOrderData, updateTotalAmount } = productSlice.actions;

export default productSlice.reducer;
