// import state, defaultstate and reducer objects
import { ProductsState, defaultProductState, productListReducer } from './productListReducer';
import { Action } from 'redux';

// define an interface, this interface will define the application state object

export interface ApplicationState {
    productsListState: ProductsState
}

// set the default state for the ApplicationState

export function defaultAppState() {
    return {
        productsListState : defaultProductState()
    }
}

// define the main reducer, this reducer will manage the aplication state
export function mainApplicationReducer(state: ApplicationState = defaultAppState(), action: Action){
    return {
        productsListState: productListReducer(state.productsListState, action)
    }
}
