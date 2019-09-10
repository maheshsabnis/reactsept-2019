import { Product } from '../../Product';

import { Action, Dispatch } from 'redux';
import { HttpService } from '../../service';

// defining action constants
export const ACTION_PRODUCT_FETCH = 'PRODUCT_FETCH';
export const ACTION_PRODUCT_FETCH_SUCCESS = 'PRODUCT_FETCH_SUCCESS';
export const ACTION_PRODUCT_FETCH_ERROR = 'PRODUCT_FETCH_ERROR';

export const ACTION_PRODUCT_POST = 'PRODUCT_POST';
export const ACTION_PRODUCT_POST_SUCCESS = 'PRODUCT_POST_SUCCESS';
export const ACTION_PRODUCT_POST_ERROR = 'PRODUCT_POST_ERROR';

// defining action types that returns the action
export function isAction<A extends Action>(action: Action, type:string): action is A{
    return action.type === type;
} 

// defining action definitions, these will define action type with the payload 
export interface IActionProductFetch extends Action {
    type: 'PRODUCT_FETCH'
}

export interface IActionProductFetchSuccess extends Action {
    type: 'PRODUCT_FETCH_SUCCESS',
    products:Array<Product>
}
export interface IActionProductFetchError extends Action {
    type: 'PRODUCT_FETCH_ERROR',
    errorMessage: string
}

// export all actions at once
export type ProductFetchActions = IActionProductFetch | IActionProductFetchSuccess | IActionProductFetchError; 

// define action creators, these will return action type and payload

function dispatchProductFetchProgress(): IActionProductFetch {
    return {
        type: ACTION_PRODUCT_FETCH
    }
}

function dispatchProductFetchSuccess(products: Array<Product>): IActionProductFetchSuccess {
    return {
        type: ACTION_PRODUCT_FETCH_SUCCESS,
        products
    }
}

function dispatchProductFetchError(e: Error): IActionProductFetchError {
    return {
        type: ACTION_PRODUCT_FETCH_ERROR,
        errorMessage:e.message
    }
}

// here use these action creators to make an actual call to the HttpService
// to receive the data from it
export function actionFetchProducts() {
    const http: HttpService = new HttpService();
    console.log('in action to make call.....');
    return(dispatch: Dispatch) =>{
         dispatch(dispatchProductFetchProgress()); // initiate the call
         return http.getData()
         .then((products) => {
             return dispatch(dispatchProductFetchSuccess(products.data)) // if the call is successful
         })
         .catch((e: Error) => {
             return dispatch(dispatchProductFetchError(e)); // if the call fails
         })
    }
}