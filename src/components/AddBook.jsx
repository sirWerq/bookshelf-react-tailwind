/* eslint-disable react/prop-types */
import { useReducer } from "react";

const AddBook = ({ onData, setIsOpen, isOpen }) => {
  const formReducer = (state, action) => {
    switch (action.type) {
      case "inputField":
        return {
          ...state,
          [action.field]: action.value,
        };
      case "reset":
        return action.initialState;
      default:
        return state;
    }
  };

  const initialState = { name: "", release: "", author: "", checked: false };
  const [state, dispatch] = useReducer(formReducer, initialState);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    dispatch({
      type: "inputField",
      field: name,
      value: type === "checkbox" ? checked : value,
    });
  };

  const handleClick = (e) => {
    e.preventDefault();

    if (
      state.name.trim() === "" ||
      state.release.trim() === "" ||
      state.author.trim() === ""
    )
      return;

    const newData = {
      id: new Date(),
      name: state.name,
      release: state.release,
      author: state.author,
      checked: state.checked,
    };

    onData(newData);

    dispatch({
      type: "reset",
      initialState,
    });
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
          <label htmlFor="name" className="flex flex-col gap-1">
            <span>Nama Buku: </span>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="masukkan nama buku"
              className="h-8 p-2 rounded-md ring-1 ring-black shadow-lg"
              value={state.name}
              onChange={handleChange}
              autoComplete="off"
            />
          </label>
          <label htmlFor="release" className="flex flex-col gap-1">
            <span>Tahun Dirilis: </span>
            <input
              type="date"
              id="release"
              name="release"
              placeholder="masukkan rilis buku"
              className="h-8 p-2 rounded-md ring-1 ring-black shadow-lg dark:text-slate-500"
              value={state.release}
              onChange={handleChange}
              autoComplete="off"
            />
          </label>
          <label htmlFor="author" className="flex flex-col gap-1">
            <span>Author: </span>
            <input
              type="text"
              id="author"
              name="author"
              placeholder="masukkan author buku"
              className="h-8 p-2 rounded-md ring-1 ring-black shadow-lg"
              value={state.author}
              onChange={handleChange}
              autoComplete="off"
            />
          </label>
          <label htmlFor="checkbox" className="flex gap-2 w-32">
            <input
              type="checkbox"
              id="checkbox"
              name="checked"
              checked={state.checked}
              onChange={handleChange}
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
