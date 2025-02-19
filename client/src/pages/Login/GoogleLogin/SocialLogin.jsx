import { useContext, useState } from "react";
import { FaGoogle } from "react-icons/fa";

import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { TbFidgetSpinner } from "react-icons/tb";
import AuthContext from "../../../Context/AuthContext";

const SocialLogin = () => {
  const { signInWithGoogle } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  let location = useLocation();

  let from = location.state?.from?.pathname || "/home";

  // handle google sign in
  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
      navigate(from, { replace: true });
      toast.success("Login Successful!");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <button
        onClick={handleGoogleSignIn}
        disabled={loading}
        className="flex items-center justify-center gap-3 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition"
      >
        {loading ? (
          <>
            <TbFidgetSpinner className="animate-spin"></TbFidgetSpinner> logging
            in ..
          </>
        ) : (
          <>
            <FaGoogle size={20} /> Continue with Google
          </>
        )}
      </button>
    </div>
  );
};

export default SocialLogin;
