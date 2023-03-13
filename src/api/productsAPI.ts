import axios from "axios";

interface Product{
    id:number;
    name:string;
    description:string;
    price:number;
    inStock:boolean;
}

const prouductAPI = axios.create({
    baseURL: 'http://localhost:3000'
});

export const getProducts = async () => {
    const res = await prouductAPI.get('/products');
    return res.data;
}

export const createProduct = (product:Product) => prouductAPI.post('/products',product);

export const deleteProduct = (id:number) => prouductAPI.delete(`/products/${id}`);

export const updateProduct = (product: Product) => prouductAPI.put(`/products/${product.id}`,product);