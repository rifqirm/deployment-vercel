import React from "react"

// set context
const ProductsContext = React.createContext({
    products: [], // initial state
    setProducts: () => {} // initial method setState
})

export default ProductsContext