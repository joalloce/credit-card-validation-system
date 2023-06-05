import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="pt-3">
      <h1 className="text-2xl font-bold m-3 ">Credit Card Validaton System</h1>
      <nav className="flex items-center gap-3 m-2 ml-4">
        <Link className="text-xl" to="/">
          Home
        </Link>
        <Link className="text-xl" to="/about">
          About
        </Link>
        <Link
          className="text-xl"
          to="https://github.com/joalloce/credit-card-validation-system"
          target="_blank"
        >
          Source
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;
