import {useQuery,useMutation,useQueryClient} from "react-query"
import { getProducts,deleteProduct,updateProduct } from "../api/productsAPI";

interface Product{
    id:number;
    name:string;
    description:string;
    price:number;
    inStock:boolean;
}

function Products(){

    const queryClient = useQueryClient();
    const { isLoading, data: products,isError,error} = useQuery({
        //Get data:
        queryKey: ['products'],
        //Througth  this function
        queryFn: getProducts,
        //And then order them by
        select: (products) => products.sort((varA:Product,varb:Product) => varb.id - varA.id)
    });

    const deleteProductMutation = useMutation({
        mutationFn: deleteProduct,
        onSuccess: () => {
            queryClient.invalidateQueries('products');
        }
    });

    const updateProductMutation = useMutation({
        mutationFn: updateProduct,
        onSuccess: () =>{
            queryClient.invalidateQueries('products');
        }
    })

    if(isLoading) return <div>Loading...</div>
    else if(isError){
        return(
            <div>
                {`Error: ${error}`}
            </div>
        )
    };

    return products.map((product:Product) => (
        <div key={product.id}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>{product.price}</p>
            <button onClick={() => {
                deleteProductMutation.mutate(product.id);
            }}>Delete</button>
            <input type="checkbox"
            id={`${product.id}`}
            checked={product.inStock} 
            onChange={e => updateProductMutation.mutate({...product,inStock:e.target.checked})} />
            <label htmlFor={`${product.id}`}>In Stock</label>
        </div>
    ))
}

export default Products;