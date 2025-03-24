import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove user from localStorage
    localStorage.removeItem("todoapp");
    
    // Show success message
    toast.success("Logged out successfully!");

    // Update authentication state
    setIsAuthenticated(false);

    // Navigate after a short delay
    setTimeout(() => {
      navigate("/login");
    }, 100);
  };

  return (
    <nav className="bg-gray-900 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/todo" className="text-xl font-bold">
          TodoApp
        </Link>
        <div className="space-x-4">
          {isAuthenticated ? (
            <>
              <button
                onClick={handleLogout}
                className="bg-red-500 px-3 py-1 rounded-lg ml-2"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-blue-400">Login</Link>
              <Link to="/register" className="hover:text-blue-400">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
