/* eslint-disable react/prop-types */
import { useState } from "react";
const AddBook = ({ onData, setIsOpen, isOpen }) => {
  const [name, setName] = useState("");
  const [release, setRelease] = useState("");
  const [author, setAuthor] = useState("");
  const [checked, setChecked] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();

    if (name.trim() == "" || release.trim() == "" || author.trim() == "")
      return;

    const newData = {
      id: new Date(),
      name,
      release,
      author,
      checked,
    };

    onData(newData);

    setName("");
    setRelease("");
    setAuthor("");
    setChecked(false);
  };

  return (
    <div className="container pt-6 flex justify-center m-auto relative">
      <button
        className="px-2 py-1 absolute top-0 right-0 dark:bg-dkPrimary bg-third text-xl rounded-full"
        onClick={() => setIsOpen((open) => !open)}
      >
        {isOpen ? "-" : "+"}
      </button>
      {isOpen && (
        <form
          className="w-[500px] p-5 flex gap-5 flex-col"
          onSubmit={handleClick}
        >
          <h2 className="text-center text-xl font-semibold">Tambah Data</h2>
          <label htmlFor="search" className="flex flex-col gap-1">
            <span>Nama Buku: </span>
            <input
              type="text"
              id="search"
              placeholder="masukkan nama buku"
              className="h-8 p-2 rounded-md ring-1 ring-black shadow-lg"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="off"
            />
          </label>
          <label htmlFor="search" className="flex flex-col gap-1">
            <span>Tahun Dirilis: </span>
            <input
              type="date"
              id="search"
              placeholder="masukkan rilis buku"
              className="h-8 p-2 rounded-md ring-1 ring-black shadow-lg dark:text-slate-500"
              value={release}
              onChange={(e) => setRelease(e.target.value)}
              autoComplete="off"
            />
          </label>
          <label htmlFor="search" className="flex flex-col gap-1">
            <span>Author: </span>
            <input
              type="text"
              id="search"
              placeholder="masukkan author buku"
              className="h-8 p-2 rounded-md ring-1 ring-black shadow-lg"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              autoComplete="off"
            />
          </label>
          <label htmlFor="checkbox" className="flex gap-2 w-32">
            <input
              type="checkbox"
              id="checkbox"
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
            />
            <span>Sudah baca?</span>
          </label>
          <button
            type="submit"
            className="rounded-xl py-2 bg-third hover:bg-slate-100 hover:ring-black dark:bg-dkPrimary dark:hover:bg-dkThird hover:ring-1 w-20 block m-auto"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default AddBook;
