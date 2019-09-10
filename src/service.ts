import axios from 'axios';
import { Product } from './Product';


export class HttpService {
    private url: string;

    constructor() {
        this.url = 'http://apiapptrainingms.azurewebsites.net/api/Products'
    }

    getData = () => {
        const resp = axios.get(this.url);
        return resp;
    }

    postData = (prd: Product) => {
        const resp = axios.post(this.url, JSON.stringify(prd), {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return resp;
    }

    putData = (id: number, prd: Product) => {
        const resp = axios.put(`${this.url}/${id}`, JSON.stringify(prd), {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return resp;
    }
    deleteData = (id: number) => {
        const resp = axios.put(`${this.url}/${id}`
        );
        return resp;
    }
}
