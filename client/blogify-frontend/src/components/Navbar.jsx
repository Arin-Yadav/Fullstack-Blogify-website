import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <div>
      <nav className="px-4 py-3 flex justify-between items-center shadow-md w-full h-16">
        <Link to="/" className="text-3xl text-blue-600 font-bold">
          Blogify
        </Link>
        <div className="space-x-4">
          <Link to="/">Home</Link>
          <Link to="/dashboard">Dashboard</Link>

          {token ? (
            <button
              onClick={handleLogout}
              className="text-red-500 hover:underline cursor-pointer">
              Logout
            </button>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
