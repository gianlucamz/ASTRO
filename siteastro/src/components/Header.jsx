import logo from "../img/logo_no_subtitle.png";

function Header() {
  return (
    <header className="w-full border-b border-purple-500">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <img src={logo} className="" />
        </div>
      </div>
    </header>
  );
}

export default Header;
