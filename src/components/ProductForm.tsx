import {useMutation,useQueryClient} from 'react-query';
import { createProduct } from '../api/productsAPI';

interface Product{
    id:number;
    name:string;
    description:string;
    price:number;
    inStock:boolean;
}

function ProductForm(){
    
    const queryClient = useQueryClient();

    const addProductMutation = useMutation({
        mutationFn:createProduct,
        onSuccess: () => {
            console.log('Product Added!')
            queryClient.invalidateQueries('products')
        }
    })

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        const productObject = Object.fromEntries(formData);

        const productMerged = {
            ...productObject,
            inStock: true,
            id: Math.random(),
        };
        addProductMutation.mutate({
            ...productMerged
        } as Product)
        
    }
    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" />
            
            <label htmlFor="description">Description</label>
            <input type="text" name="description" id="description" />

            <label htmlFor="price">Price</label>
            <input type="number" id="price" name="price" />

            <button type='submit'>
                Add Product
            </button>
        </form>
    )
}

export default ProductForm;