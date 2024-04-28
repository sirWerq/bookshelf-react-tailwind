/* eslint-disable react/prop-types */
const Header = ({ toggleDarkMode }) => {
  return (
    <header className="pt-6 px-4 flex justify-center dark:text-white">
      <div className="container">
        <h1 className="text-xl font-semibold">List Buku</h1>
      </div>
      <div>
        <input type="checkbox" id="toggle" hidden />
        <label htmlFor="toggle">
          <div
            className="w-9 h-4 bg-slate-400 rounded-full cursor-pointer"
            onClick={toggleDarkMode}
          >
            <div className="w-4 h-4 rounded-full bg-slate-100 toggle"></div>
          </div>
        </label>
      </div>
    </header>
  );
};

export default Header;
