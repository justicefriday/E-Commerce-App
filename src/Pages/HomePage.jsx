import React from 'react'
import ProductsPage from './ProductsPage'

const HomePage = () => {
  return (
    <>
      <div className="p-4 text-center">
      <h1 className="text-3xl font-bold">Welcome to Our Shop</h1>
      <p className="mt-2">Browse our amazing products</p>
      </div>
      <ProductsPage isHome={ true} />
    </>

  )
}

export default HomePage