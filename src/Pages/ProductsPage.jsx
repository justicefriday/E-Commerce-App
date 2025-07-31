import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Search from "../components/Search";
import { useMemo } from "react";
import { useDebounce } from "react-use";
const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('')
  const[debounceTerm,setDebounceTerm]=useState('')
  const location = useLocation();
  const isHome = location.pathname === "/";

   // Debounce searchTerm// to delay seacher  to avoid uncessary search on the api
  useDebounce(() => {
    setDebounceTerm(searchTerm);
  }, 500, [searchTerm]);

  useEffect(() => {
    const api = isHome
      ? "https://fakestoreapi.com/products?limit=6"
      : "https://fakestoreapi.com/products";

    const fetchProducts = async () => {
      try {
        const res = await fetch(api);
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [isHome]);

  // filtered products
  const filterProducts = useMemo(() => {
    return products.filter(product =>
      product.title.toLowerCase().includes(debounceTerm.toLowerCase())
    );
  }, [products, debounceTerm]);

  if (loading) {
    return (
      <div className="p-6 text-center text-xl font-semibold text-blue-600">
        Loading products...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-600 font-semibold">
        {error}
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        {isHome ? "Featured Products" : "All Products"}
      </h1>
      {isHome ? '': <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/> }
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {filterProducts.map((product) => (
          <div
            key={product.id}
            className="flex flex-col bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-48 object-contain mb-4"
            />
            <h2 className="text-lg font-semibold text-gray-800 line-clamp-2">
              {product.title}
            </h2>
            <p className="text-blue-600 font-bold text-lg mt-1">${product.price}</p>

            <div className="mt-auto">
              <Link
                to={`/products/${product.id}`}
                className="block mt-4 w-full text-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
