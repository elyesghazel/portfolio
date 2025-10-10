import "./navbar.scss";

export default function Navbar() {
  return (
    <nav className="navbar flex flex-row justify-between w-full items-center p-4">
      <h2 className="text-2xl font-medium">elyesghazel.ch</h2>

      <ul className="nav-items flex flex-row gap-[50px]">
        <li className="nav-item active">
          <a href="#">Home</a>
        </li>
        <li className="nav-item">
          <a href="#" className="">
            Services
          </a>
        </li>
        <li className="nav-item">
          <a href="#">Projects</a>
        </li>
        <li className="nav-item">
          <a href="#">Contact Me</a>
        </li>
      </ul>

      <button className="cta px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-800 transition">
        <a href="#">Get in Touch</a>
      </button>
    </nav>
  );
}
