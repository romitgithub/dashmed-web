import Link from "next/link";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-3">
      <div className="flex flex-col items-center w-full small:w-4/5 sm:w-3/5 md:w-2/4 lg:w-2/5 xl:w-2/5 p-1 mt-10">
        <span className="text-teal-500 text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold">What is ABHA App?</span>
        <span className="mt-5 flex text-sm sm:text-md md:text-lg lg:text-lg xl:text-xl text-center font-medium">It is a citizen facing application, that will enable you to view, manage and do consent-based sharing of health records</span>
      </div>
      <div className="mt-5 flex flex-col items-center w-full small:w-4/5 sm:w-3/5 md:w-2/4 lg:w-2/5 xl:w-2/5 p-1">
        <Link href={"/login"} className="w-full cursor-pointer">
          <button
            type="submit"
            className="p-2 w-full bg-#296999 text-white rounded-md hover:bg-#1b5887 transition duration-300"
          >
            LOGIN
          </button>
        </Link>
      </div>
      <div className="flex flex-col align-middle justify-center items-center mt-10">
        <span className="text-center text-sm sm:text-sm md:text-md lg:text-lg xl:text-lg">Dont have an ABHA Address?</span>
        <Link href={'/register'} className="cursor-pointer"> <span className="text-teal-700 font-semibold">Register</span></Link>
      </div>
      <ToastContainer />
    </main>
  );
};
