/* eslint-disable react/prop-types */
const UserFalseBook = ({
  search,
  data,
  onDeleteButton,
  onEditButton,
  editData,
  onSaveEdit,
  setEditData,
  onEditData,
}) => {
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
                  <button
                    className="mr-2 mt-2 rounded-full bg-third hover:bg-slate-100 dark:bg-dkThird dark:hover:bg-slate-600 hover:ring-black hover:ring-1 px-2 py-1"
                    onClick={() => onEditData(datas.id)}
                  >
                    Edit Data
                  </button>
                </div>
              );
            }
          }
        })}
        {editData && (
          <div className="container pt-6 flex justify-center m-auto relative">
            <form
              className="w-[500px] p-5 flex gap-5 flex-col"
              onSubmit={(e) => {
                e.preventDefault();
                onSaveEdit();
              }}
            >
              <h2 className="text-center text-xl font-semibold">Edit Data</h2>
              <label htmlFor="edit-name" className="flex flex-col gap-1">
                <span>Nama Buku: </span>
                <input
                  type="text"
                  id="edit-name"
                  className="h-8 p-2 rounded-md ring-1 ring-black shadow-lg"
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
                  className="h-8 p-2 rounded-md ring-1 ring-black shadow-lg"
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
                  className="h-8 p-2 rounded-md ring-1 ring-black shadow-lg"
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

export default UserFalseBook;