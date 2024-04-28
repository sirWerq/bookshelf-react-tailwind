/* eslint-disable react/prop-types */
const Main = ({ children }) => {
  return (
    <main className="container flex justify-center flex-col gap-5 p-6 m-auto dark:text-white dark:">
      {children}
    </main>
  );
};

export default Main;
