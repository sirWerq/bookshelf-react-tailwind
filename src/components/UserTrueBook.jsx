/* eslint-disable react/prop-types */
import { useState } from "react";

const UserTrueBook = ({
  search,
  data,
  onDeleteButton,
  onEditButton,
  setData,
}) => {
  const [editData, setEditData] = useState(null);

  const handleSaveEdit = () => {
    setData((prevData) =>
      prevData.map((item) => (item.id === editData.id ? { ...editData } : item))
    );
    setEditData(null);
  };

  const handleEditData = (id) => {
    setEditData(data.find((data) => data.id === id));
  };

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
                  <button
                    className="mr-2 mt-2 rounded-full bg-third hover:bg-slate-100 dark:bg-dkThird dark:hover:bg-slate-600 hover:ring-black hover:ring-1 px-2 py-1"
                    onClick={() => handleEditData(datas.id)}
                  >
                    Edit Data
                  </button>
                </div>
              );
            }
          } else {
            return null;
          }
        })}
        {editData && (
          <div className="container pt-6 flex justify-center m-auto relative">
            <form
              className="w-[500px] p-5 flex gap-5 flex-col"
              onSubmit={(e) => {
                e.preventDefault();
                handleSaveEdit();
              }}
            >
              <h2 className="text-center text-xl font-semibold">Edit Data</h2>
              <label htmlFor="edit-name" className="flex flex-col gap-1">
                <span>Nama Buku: </span>
                <input
                  type="text"
                  id="edit-name"
                  className="h-8 p-2 rounded-md ring-1 ring-black shadow-lg text-black"
                  value={editData.name}
                  onChange={(e) =>
                    setEditData({ ...editData, name: e.target.value })
                  }
                  autoComplete="off"
                />
              </label>
              <label htmlFor="edit-release" className="flex flex-col gap-1">
                <span>Tahun release: </span>
                <input
                  type="date"
                  id="edit-release"
                  className="h-8 p-2 rounded-md ring-1 ring-black shadow-lg text-black"
                  value={editData.release}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      release: e.target.value,
                    })
                  }
                  autoComplete="off"
                />
              </label>
              <label htmlFor="edit-author" className="flex flex-col gap-1">
                <span>Nama Author: </span>
                <input
                  type="text"
                  id="edit-author"
                  className="h-8 p-2 rounded-md ring-1 ring-black shadow-lg text-black"
                  value={editData.author}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      author: e.target.value,
                    })
                  }
                  autoComplete="off"
                />
              </label>
              <button
                type="submit"
                className="rounded-xl py-2 bg-third hover:bg-slate-100 hover:ring-black dark:bg-dkPrimary dark:hover:bg-dkThird hover:ring-1 w-20 block m-auto"
              >
                Simpan
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default UserTrueBook;
