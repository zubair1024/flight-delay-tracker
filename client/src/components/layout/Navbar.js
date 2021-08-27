// import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="Navbar bg-gray-900 text-white flex flex-wrap flex-row justify-between items-center px-10 shadow-2xl">
      <div className="logo flex flex-row justify-center items-center py-2">
        <img src="/gb.png" className="h-10" alt="Grizzlybit" />
        <span className="font-bold ml-2">Flight Delay Predictor</span>
      </div>
      {/* <nav className="nav-links font-extrabold uppercase">
        <ul>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </nav> */}
    </div>
  );
};

export default Navbar;
