import { useContext, useState } from "react";
import Button from "../../elements/Button/Button";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Input from "../../elements/Input/Input";
import uuid from 'react-uuid';
import ProductsContext from "../../context/ProductsContext";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../redux/products/productsSlice";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../config/firebaseConfig";

import { gql, useQuery, useMutation } from "@apollo/client";
import { InsertProduct, GetProductList } from "../../helpers/gqlHasura";

const Form = ({product}) => {

    const dispatch = useDispatch()

    // const { dataSQL, loading, errorSQL } = useQuery(GetProductList);
    const [insertProduct] = useMutation(InsertProduct, {
        refetchQueries: [{ query: GetProductList}],
    });


    const [percent, setPercent] = useState(0)

    const formData = {
        productId: uuid(),
        productName: "",
        productCathegory: "",
        productImage: "",
        productFreshness: "",
        productDesc: "",
        productPrice: ""
    }

    const formErrors = {
        productName: "",
        productCathegory: "",
        productImage: "",
        productFreshness: "",
        productDesc: "",
        productPrice: ""
    }

    const [data, setData] = useState(formData)
    const [errors, setErrors] = useState(formErrors)
    // const [errorMessage, setErrorMessage] = useState('');
    const error = {};

    const handleInput = e => {
        const name = e.target.name;
        const value = e.target.value;

        if(name === "productImage") {
            setData((prev) => ({
                ...prev,
                [name]: e.target.files[0]
            }))
        }
        
        else {
            setData((prev) => ({
                ...prev,
                [name]: value
            }))
        }

        

        if (name === "productName") {
            if (value.length > 10) {
                error.productName = "Please input a valid product name";
            }
            else {
                error.productName = ""
            }
            setErrors(error);
        }
    }

    const handleSubmit = e => {
        e.preventDefault();

        if (!data.productName) {
            error.productName = "Name is required";
        }
        if (!data.productCathegory) {
            error.productCathegory= "Category is required";
        }
        if (!data.productImage) {
            error.productImage= "Image is required";
        }
        if (!data.productDesc) {
            error.productDesc= "Desc is required";
        }
        if (!data.productPrice) {
            error.productPrice = "Price is required";
        }

        setErrors(error);

        if (Object.keys(error).length === 0) {
            console.log(data)
            // setTable((prev) => ([...prev, data]))
            // setData(prev => ({...prev, productId: uuid()}))

            handleUploadFile()

        }
    }

    const handleUploadFile = () => {
        // handle file ref 
        const storageRef = ref(storage, `/files/${data.productImage.name}`)

        // handle file upload progess
        const uploadTask = uploadBytesResumable(storageRef, data.productImage)

        // handle file upload
        uploadTask.on(
            "state_changed",
            
            // callback ketika upload progress
            (snapshot) => {
                const percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                )

                //update progress
                setPercent(percent)
                console.log(`Progress >>> ${percent}%`)
            },

            // callback ketika upload gagal
            (err) => {
                console.log('error upload file', err)
            },

            //callback ketika selesai upload
            () => {
                // download url
                getDownloadURL(uploadTask.snapshot.ref)
                .then(url => {

                    setData(prev => ({ ...prev, productId: uuid(), productImage: url }));
                    const newValues = { ...data, productId: uuid(), productImage: url };
                    dispatch(addProduct(newValues))

                    console.log('url download file', url)
                    insertProduct({
                        variables: {
                          object: {
                            id: uuid(),
                            name: data.productName,
                            price: data.productPrice,
                            description: data.productDesc,
                            freshness: data.productFreshness,
                            category: data.productCathegory,
                            image: url
                          },
                        },
                      });
                })
            }
        )
    }
    

    return (
        <form onSubmit={handleSubmit} className="container mt-5 w-50" id="productForm">
            <h2>Detail Product</h2>
            <div className="mb-4 mt-4 w-50">
                <label className="form-label has-success" htmlFor="productName">
                    Product Name
                </label>
                <Input
                    type="text"
                    name="productName"
                    // className={`form-control ${validClass}`}
                    // className="form-control"
                    className={`form-control ${errors.productName ? "is-invalid" : ""}`}
                    value={data.productName}
                    onChange={handleInput}
                />
                <small id="nameError" className="text-danger">
                    {errors.productName}
                </small>
            </div>
            <div className="mb-4 w-50">
                <label className="form-label" htmlFor="productCathegory">
                    Product Cathegory
                </label>
                <select
                    name="productCathegory"
                    value={data.productCathegory}
                    className={`form-select ${errors.productCathegory ? "is-invalid" : ""}`}
                    aria-label="Default select example"
                    onChange={handleInput}
                >
                    <option disable="" value="" hidden="">
                        Chose...
                    </option>
                    <option name="category" value="Electronic">
                        Electronic
                    </option>
                    <option name="category" value="Furniture">
                        Furniture
                    </option>
                    <option name="category" value="Tools">
                        Tools
                    </option>
                </select>
                <small id="cathegoryError" className="text-danger">
                    {errors.productCathegory}
                </small>
            </div>
            <div className="mb-4 w-50">
                <label className="form-label" htmlFor="productImage">
                    Image of Product
                </label>
                <input 
                className={`form-control ${errors.productCathegory ? "is-invalid" : ""}`} 
                name="productImage" 
                // value={data.productImage} 
                type="file" 
                onChange={handleInput} 
                accept="image/*"
                />
                <small id="imageError" className="text-danger">
                    {errors.productImage}
                </small>
                <p>{percent}%</p>
            </div>
            <div className="mb-4">
                <label className="form-label" htmlFor="productFreshness">
                    Product Freshness
                </label>
                <div className="form-check">
                    <input
                        id="new"
                        name="productFreshness"
                        className="form-check-input"
                        type="radio"
                        defaultValue="Brand New"
                        onChange={handleInput}
                    />
                    <label className="form-check-label" htmlFor="new">Brand New</label>
                </div>
                <div className="form-check">
                    <input
                        id="second"
                        name="productFreshness"
                        className="form-check-input"
                        type="radio"
                        defaultValue="Second Hand"
                        onChange={handleInput}
                    />
                    <label className="form-check-label" htmlFor="second">Second Hand</label>
                </div>
                <div className="form-check">
                    <input
                        id="refurbished"
                        name="productFreshness"
                        className="form-check-input"
                        type="radio"
                        defaultValue="Refurbished"
                        onChange={handleInput}
                    />
                    <label className="form-check-label" htmlFor="refurbished">Refurbished</label>
                </div>
            </div>
            <div className="mb-4">
                <label className="form-label" htmlFor="productDesc">
                    Additional Description
                </label>
                <textarea
                    rows={5}
                    className={`form-control ${errors.productDesc ? "is-invalid" : ""}`}
                    name="productDesc"
                    value={data.productDesc}
                    onChange={handleInput}
                />
                <small id="descError" className="text-danger">
                    {errors.productDesc}
                </small>
            </div>
            <div className="mb-4 w-50">
                <label className="form-label" htmlFor="productPrice">
                    Product Price
                </label>
                <input 
                type="number" 
                className={`form-control ${errors.productPrice ? "is-invalid" : ""}`} 
                name="productPrice" 
                value={data.productPrice} 
                onChange={handleInput} 
                />
                <small id="priceError" className="text-danger" >
                    {errors.productPrice}
                </small>
            </div>
            <Button
                type="submit"
                className="btn btn-primary w-100 mt-5"
                label="Submit"
            />
        </form>
    );
}

export default Form;