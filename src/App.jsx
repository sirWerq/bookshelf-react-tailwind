/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

import Header from "./components/Header";
import Navigate from "./components/Navigate";
import Search from "./components/Search";
import Main from "./components/MainContainer";
import Interface from "./components/InterfaceContainer";
import AddBook from "./components/AddBook";
import UserTrueBook from "./components/UserTrueBook";
import UserFalseBook from "./components/UserFalseBook";
import Footer from "./components/Footer";

const dummy = [
  {
    id: 1,
    name: "Cinta terlarang Kenny dan Hendri",
    release: "2021-07-22",
    author: "Opung Bene",
    checked: true,
  },
  {
    id: 2,
    name: "Pertikaian Kelamin Kenny dan Hendri",
    release: "2022-04-02",
    author: "Opung Bene",
    checked: false,
  },
  {
    id: 3,
    name: "Cinta Segitiga Kenny",
    release: "2023-11-19",
    author: "Opung Bene",
    checked: true,
  },
];

function App() {
  const [isOpen, setIsOpen] = useState(true);
  const [search, setSearch] = useState("");
  const [editData, setEditData] = useState(null);

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

  const handleEditData = (id) => {
    const bookToEdit = data.find((item) => item.id === id);
    setEditData(bookToEdit);
  };

  const handleSaveEdit = () => {
    setData((prevData) =>
      prevData.map((item) => (item.id === editData.id ? { ...editData } : item))
    );
    setEditData(null);
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
          <AddBook onData={handleData} setIsOpen={setIsOpen} isOpen={isOpen} />
        </Interface>
        <Interface>
          <UserTrueBook
            search={search}
            data={data}
            onDeleteButton={handleDeleteButton}
            onEditButton={handleEditButton}
            editData={editData}
            onSaveEdit={handleSaveEdit}
            setEditData={setEditData}
            onEditData={handleEditData}
          />
        </Interface>
        <Interface>
          <UserFalseBook
            search={search}
            data={data}
            onDeleteButton={handleDeleteButton}
            onEditButton={handleEditButton}
            editData={editData}
            onSaveEdit={handleSaveEdit}
            setEditData={setEditData}
            onEditData={handleEditData}
          />
        </Interface>
      </Main>
      <Footer />
    </div>
  );
}

export default App;
