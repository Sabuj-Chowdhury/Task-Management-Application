import SocialLogin from "./GoogleLogin/SocialLogin";

const Login = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 p-6">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-96 text-center flex flex-col items-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Welcome to Task Manager
        </h1>
        <p className="text-gray-600 mb-6">
          Manage your tasks effortlessly with drag & drop functionality.
        </p>
        <SocialLogin />
        <p className="text-gray-500 text-sm mt-4">
          Start organizing your tasks efficiently today!
        </p>
      </div>
    </div>
  );
};

export default Login;
