import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from '../../components/Navbar/Navbar'
import Header from '../../components/Header/Header';
import Form from '../../components/Form/Form';
import Table from '../../components/Table/Table';
import RandomNumGen from '../../components/RandomNumGen/RandomNumGen';
import { useContext, useState } from 'react';
import ProductsContext from "../../context/ProductsContext";


function CreateProduct() {

  return (
    <>
      <Navbar />
      <Header />
      <RandomNumGen />
      <Form/>
      <Table />
      
    </>
      
  )

}

export default CreateProduct
