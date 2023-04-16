import { Link } from "react-router-dom";
import Button from "../../elements/Button/Button";
import { useContext, useState } from "react";
import ProductsContext from "../../context/ProductsContext";
import TableItem from "./TableItem";
import { useSelector } from "react-redux";
import {gql, useMutation, useQuery} from "@apollo/client"
import { useEffect } from "react";
import { GetProductList } from "../../helpers/gqlHasura";

const Table = () => {

    const {data, loading, error} = useQuery(GetProductList)


    // const { products, setProducts } = useContext(ProductsContext)
    // const products = useSelector((state) => state.products)
    // console.log(products)

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">List Product</h2>
            <table className="table table-striped w-75" id="data-table">
                <thead>
                    <tr>
                        <th scope="col">No</th>
                        <th scope="col">Product Name</th>
                        <th scope="col">Product Category</th>
                        <th scope="col">Product Image</th>
                        <th scope="col">Product Freshness</th>
                        <th scope="col">Product Price</th>
                        <th scope="col" colSpan={2}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.Product.map((table) => (
                        <TableItem key={table.productId} table={table} />
                    ))
                    }
                </tbody>
            </table>
        </div>
    );
}

export default Table;