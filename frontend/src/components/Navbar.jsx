import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="fixed max-w-2xl px-[3vw] py-[3vh]">
      <h1 className="text-3xl">Credit Card Validaton System</h1>
      <nav className="flex items-center gap-3 mt-4">
        <Link className="" to="/">
          <h1>Home</h1>
        </Link>
        <Link to="/about">
          <h1>About</h1>
        </Link>
        <Link
          to="https://github.com/joalloce/credit-card-validation-system"
          target="_blank"
        >
          <h1>Source</h1>
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;
