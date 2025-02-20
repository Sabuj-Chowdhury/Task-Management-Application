import { useContext } from "react";
import { useNavigate } from "react-router";
import AuthContext from "../../../Context/AuthContext";

const Home = () => {
  const { logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const onLogout = async () => {
    await logOut();
    navigate("/");
  };
  return (
    <div>
      <p>HomePage</p>
      <div>
        <button
          onClick={() => {
            onLogout();
          }}
          className="block w-full  px-4 py-2 hover:bg-teal-100"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Home;
