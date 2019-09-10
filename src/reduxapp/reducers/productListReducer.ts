import { ProductFetchActions } from '../actions/index';
import { Product } from '../../Product';

// define an interface that will record the current state of the Product Dispach action
// here the state will be init (or progress), success, error
export interface ProductsState {
    state: string,
    products: Array<Product>,
    errorMessage?:string
}

// function that will define the default state 
export function defaultProductState() {
    return {
        state: 'INIT',
        products:[]
    }
} 

// define the reducer here
export function productListReducer(state: ProductsState, action: ProductFetchActions): ProductsState {
    if(action.type === 'PRODUCT_FETCH') {
        return {
            ...state,
            state: 'LOADING',
            products:[]
        }
    }
    if(action.type === 'PRODUCT_FETCH_SUCCESS') {
        return {
            ...state,
            state: 'LOADED',
            products:action.products
        }
    }
    if(action.type === 'PRODUCT_FETCH_ERROR') {
        return {
            ...state,
            state: 'ERROR',
            products:[],
            errorMessage:action.errorMessage
        }
    }
    return state;
}
