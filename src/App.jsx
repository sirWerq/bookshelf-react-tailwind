import React, { useState, useEffect } from "react";

const dummy = [
  {
    id: 1,
    name: "Saekano",
    release: "2018-07-22",
    author: "Jakarta",
    checked: true,
  },
  {
    id: 2,
    name: "Megumi Kato",
    release: "2018-07-22",
    author: "Bandung",
    checked: false,
  },
  {
    id: 3,
    name: "Soyo Nagasaki",
    release: "2018-07-22",
    author: "Jakarta",
    checked: true,
  },
];

function App() {
  const [isOpen, setIsOpen] = useState(true);
  const [search, setSearch] = useState("");

  const [data, setData] = useState(() => {
    const savedData = localStorage.getItem("data");
    return savedData ? JSON.parse(savedData) : dummy;
  });

  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode((prevDarkMode) => !prevDarkMode);
  };

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(data));
  }, [data]);

  const handleData = (newData) => {
    setData([...data, newData]);
  };

  const handleDeleteButton = (id) => {
    setData((data) => data.filter((data) => data.id !== id));
  };

  const handleEditButton = (id) => {
    setData((data) =>
      data.map((data) =>
        data.id == id ? { ...data, checked: !data.checked } : data
      )
    );
  };

  return (
    <div
      className={`${
        darkMode ? "dark" : ""
      } dark:bg-dkPrimary md:text-lg lg:text-xl text-base ${
        !isOpen &&
        data.filter((datas) => {
          return datas.name.toLowerCase().includes(search.toLowerCase());
        }).length <= 2
          ? "h-screen"
          : "h-fit"
      }`}
    >
      <Header toggleDarkMode={toggleDarkMode} />
      <Navigate />
      <Search search={search} onSearch={setSearch} />
      <Main>
        <Interface>
          <AddData onData={handleData} setIsOpen={setIsOpen} isOpen={isOpen} />
        </Interface>
        <Interface>
          <DataReady
            search={search}
            data={data}
            onDeleteButton={handleDeleteButton}
            onEditButton={handleEditButton}
          />
        </Interface>
        <Interface>
          <DataUnReady
            search={search}
            data={data}
            onDeleteButton={handleDeleteButton}
            onEditButton={handleEditButton}
          />
        </Interface>
      </Main>
      <Footer />
    </div>
  );
}

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

const Navigate = () => {
  return (
    <button className="fixed bottom-0 right-0 bg-black">
      <a href="#">🔝</a>
    </button>
  );
};

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

const Main = ({ children }) => {
  return (
    <main className="container flex justify-center flex-col gap-5 p-6 m-auto dark:text-white dark:">
      {children}
    </main>
  );
};

const Interface = ({ children }) => {
  return (
    <section className="p-6 bg-secondary dark:bg-dkSecondary rounded-lg">
      {children}
    </section>
  );
};

const AddData = ({ onData, setIsOpen, isOpen }) => {
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

const DataReady = ({ search, data, onDeleteButton, onEditButton }) => {
  return (
    <>
      <h2 className="text-lg xl:text-xl font-semibold text-center mb-3">
        Buku Yang Sudah Dibaca
      </h2>
      <div className="flex gap-4 flex-wrap">
        {data.map((datas) => {
          if (datas.name.toLowerCase().includes(search.toLowerCase())) {
            if (datas.checked) {
              return (
                <div
                  className="p-2 md:text-lg bg-white dark:bg-dkPrimary my-5 w-80 rounded-xl shadow-lg"
                  key={datas.id}
                >
                  <ul>
                    <li>Nama Buku: {datas.name}</li>
                    <li>Tahun Dirilis: {datas.release}</li>
                    <li>Author: {datas.author}</li>
                  </ul>
                  <button
                    className="mr-2 mt-2 rounded-full bg-third hover:bg-slate-100 hover:ring-black dark:bg-dkThird dark:hover:bg-slate-600 hover:ring-1 px-3 py-1"
                    onClick={() => onDeleteButton(datas.id)}
                  >
                    Hapus Data
                  </button>
                  <button
                    className="mr-2 mt-2 rounded-full bg-third hover:bg-slate-100 dark:bg-dkThird dark:hover:bg-slate-600 hover:ring-black hover:ring-1 px-2 py-1"
                    onClick={() => onEditButton(datas.id)}
                  >
                    Pindahkan Data
                  </button>
                </div>
              );
            }
          } else {
            return null;
          }
        })}
      </div>
    </>
  );
};

const DataUnReady = ({ search, data, onDeleteButton, onEditButton }) => {
  return (
    <>
      <h2 className="text-lg xl:text-xl font-semibold text-center mb-3">
        Buku Yang Belum Dibaca
      </h2>
      <div className="flex gap-4 flex-wrap">
        {data.map((datas) => {
          if (datas.name.toLowerCase().includes(search.toLowerCase())) {
            if (!datas.checked) {
              return (
                <div
                  className="p-2 md:text-lg dark:bg-dkPrimary bg-white my-5 w-80 rounded-xl shadow-lg"
                  key={datas.id}
                >
                  <ul>
                    <li>Nama Buku: {datas.name}</li>
                    <li>Tahun Dirilis: {datas.release}</li>
                    <li>Author: {datas.author}</li>
                  </ul>
                  <button
                    className="mr-2 mt-2 rounded-full bg-third hover:bg-slate-100 dark:bg-dkThird dark:hover:bg-slate-600 hover:ring-black hover:ring-1 px-3 py-1"
                    onClick={() => onDeleteButton(datas.id)}
                  >
                    Hapus Data
                  </button>
                  <button
                    className="mr-2 mt-2 rounded-full bg-third hover:bg-slate-100 dark:bg-dkThird dark:hover:bg-slate-600 hover:ring-black hover:ring-1 px-2 py-1"
                    onClick={() => onEditButton(datas.id)}
                  >
                    Pindahkan Data
                  </button>
                </div>
              );
            }
          }
        })}
      </div>
    </>
  );
};

const Footer = () => {
  return (
    <footer className="w-full h-20 flex justify-center items-center flex-col dark:text-white text-base">
      <span>follow for more</span>
      <span>github: sirWerq</span>
    </footer>
  );
};

export default App;
