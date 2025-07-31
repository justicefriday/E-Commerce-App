import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCart } from "../Context/CartContext";
const ProductDetailsPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { addToCart } = useCart();


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!res.ok) throw new Error("Failed to fetch product");
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p className="p-6">Loading...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="grid md:grid-cols-2 gap-6 items-start">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-80 object-contain bg-white p-4 rounded"
        />
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-xl font-semibold mb-4">${product.price}</p>
          <p className="text-sm text-gray-500 mb-4">Category: {product.category}</p>
          <button
      className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
       onClick={() => addToCart(product)}
      >
     Add to Cart
    </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
