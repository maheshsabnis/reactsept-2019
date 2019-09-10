import axios from 'axios';
import { ProductData } from '../models/productmodel';
 


// the class that will make Http Call to API
// each method of the class will return the Promise Object
// Ajax Call Objects of ES 6, 'fetach', 'XmlHttpRequest'
// External Package Objects e.g. axios, isomorphic-fetch
// request
export class HttpService {
    private url: string;

    constructor(){
        this.url = "https://apiapptrainingms.azurewebsites.net/api/Products";
    }

    getData(){
        let resp = axios.get(this.url);
        return resp;
    }
    postData(prd:ProductData){
        let resp = axios.post(this.url, prd,{
            headers:{
                'Content-Type':'application/json'
            }
        });
        return resp;
    }

    putData(id:number, prd:ProductData){
        let resp = axios.put(`${this.url}/${id}`, prd,{
            headers:{
                'Content-Type':'application/json'
            }
        });
        return resp;
    }

}