import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from "axios"
import './Products.css'

const Products = () => {
    const [products, setProducts] = useState([])
    useEffect (() => {
        const fetchAllProducts = async () => {
            try {
                const res = await axios.get("http://localhost:8800/products")
                setProducts(res.data)
            } catch(err) {
                console.log(err)
            }
        }
        fetchAllProducts()
    }, [])

    return (
        <div>
            <h1 className = "title">Products</h1>
            <div className="products">
                <table>
                <thead>
                    <tr>
                    <th>Product ID</th>
                    <th>Product Name</th>
                    <th>Product Description</th>
                    <th>Category</th>
                    <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(prod => (
                    <tr key={prod.Product_ID} className="prod">
                        <td>{prod.Product_ID}</td>
                        <td>{prod.Product_Name}</td>
                        <td>{prod.Product_Description}</td>
                        <td>{prod.Category}</td>
                        <td>{prod.Price}</td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
        </div>
    )
}

export default Products