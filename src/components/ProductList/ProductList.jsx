import './ProductList.css'
import Card from "../Card/Card";
import BarLoader from "react-spinners/BarLoader";

import { gql, useMutation, useQuery, useSubscription } from "@apollo/client"
import Input from '../../elements/Input/Input';
import { useState } from 'react';
import Button from '../../elements/Button/Button';

import { GetSearchProductList } from "../../helpers/gqlHasura"


const ProductList = () => {

    const [search, setSearch] = useState('')
    const [limit, setLimit] = useState(3)

    const { data, loading, error } = useQuery(GetSearchProductList, {
        variables: { name: `%${search}%`, limit: limit }
    })

    // if (loading) {
    //     return (
    //         <div className='mt-5 row justify-content-center'>
    //             <BarLoader color="#36d7b7" />
    //         </div>
    //     );
    // }
    if (error) {
        console.log(error)
        // return (
        //     <div className='mt-5 row justify-content-center'>
        //         <p>Terjadi kesalahan, mohon maaf.</p>
        //     </div>
        // );
    }

    const handleSearch = (e) => {
        setSearch(e.target.value)
    }

    const handleLoadMore = () => {
        setLimit(limit + 3) 
    }

    return (
        <>
            <section className="productlist mt-3 mb-5">
                <div>
                    <h3>Product List</h3>
                    <p>
                        Berisi list product yang telah di buat di halaman create product.
                    </p>
                    
                    <div className="mb-3 w-25">
                    <label className="form-label mt-5 ">Input Search : </label>
                        <Input 
                        type="text" 
                        className="form-control" 
                        value={search}
                        onChange={handleSearch}/>
                    </div>
                    <div className="container mx-auto">
                        <div className="mycard row w-100 justify-content-center">
                            {/* <div className="col-sm-4"> */}
                            {data?.Product.map((card) => (
                                <Card key={card.id} card={card} />
                            ))
                            }
                            {/* </div> */}
                        </div>
                    </div>
                    <Button
                    type="button" 
                    className="btn btn-primary" 
                    label="Load More"
                    onClick={handleLoadMore}/>
                </div>
            </section>
        </>
    );
}

export default ProductList