import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <section className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center p-4">
      <img
        src="https://img.freepik.com/free-vector/error-404-concept-illustration_114360-1811.jpg?t=st=1739980652~exp=1739984252~hmac=c10ae4c217ca27a1d86fc5371c6c77e93e610fe2faf75e2bffcdbac57ea0a931&w=1800"
        alt="Error"
        className="mb-6 w-1/2 md:w-1/3 lg:w-1/4"
      />
      <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
      <h2 className="text-3xl font-semibold mb-2">Oops! Page Not Found</h2>
      <p className="text-lg mb-4">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        to="/"
        className="bg-teal-700 text-white px-4 py-2 rounded hover:bg-teal-600 transition"
      >
        Go Back to Home
      </Link>
    </section>
  );
};

export default ErrorPage;
