import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-blue-600">
          MyShop
        </Link>

        {/* Navigation Links */}
        <nav className="space-x-6">
          <Link to="/" className="text-gray-700 hover:text-blue-600 transition">Home</Link>
          <Link to="/cart" className="text-gray-700 hover:text-blue-600 transition">Cart</Link>
          <Link to="/buy" className="text-gray-700 hover:text-blue-600 transition">Products</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
