import { useContext } from "react";
import AuthContext from "../../../Context/AuthContext";

const Home = () => {
  const { logOut } = useContext(AuthContext);
  const handleLogout = () => {
    logOut();
  };
  return (
    <main className="min-h-screen bg-gradient-to-br from-teal-400 via-fuchsia-500 to-yellow-500 py-8 px-4">
      <div className="w-10/12 mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold mb-8 text-center text-white">
            Task Board
          </h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 cursor-pointer text-white px-4 py-2 rounded-md mb-4"
          >
            LogOut
          </button>
        </div>
      </div>
    </main>
  );
};

export default Home;
