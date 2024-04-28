/* eslint-disable react/prop-types */
const Search = ({ search, onSearch }) => {
  return (
    <div className="container pt-6 flex justify-center m-auto dark:text-white">
      <div className="w-[500px] p-5">
        <label htmlFor="search" className="flex flex-col gap-1">
          <span className="self-center">Ketik disini...</span>
          <input
            type="text"
            id="search"
            placeholder="cari buku anda"
            className="h-8 p-2 rounded-md ring-1 ring-black shadow-lg text-black"
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            autoComplete="off"
          />
        </label>
      </div>
    </div>
  );
};

export default Search;
