"use client";

import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

function UnauthBanner({ router }) {
  return (
    <div className="h-[100vh] bg-cover bg-no-repeat bg-[url('https://wpassets.brainstation.io/app/uploads/2017/04/13100509/Netflix-Background.jpg')]">
      <div
        className="bg-black bg-opacity-80 h-[100vh]
    "
      >
        {/* header ======================================== */}
        <div className="flex items-center justify-between">
          <img
            src="https://rb.gy/ulxxee"
            alt="netflix"
            width={120}
            height={120}
            className="w-28 sm:w-36 lg:w-52 ml-4 sm:ml-8 pt-4"
            onClick={() => router.push("/")}
          />
          <div className="flex mr-4 sm:mr-10">
            <button
              onClick={() => signIn("github")}
              className="h-8 px-1 sm:px-4 m-2 text-white hover:bg-opacity-80 bg-[#e50914] rounded-full"
            >
              Sign In
            </button>
          </div>
        </div>
        {/* middle section =============================== */}
        <div className="h-[80vh] w-[100%] md:w-[80%] flex max-md:flex-col items-center justify-center text-white text-center">
          {/* <div className="h-[80vh] w-[90%] md:w-[80%] mx-[5%] md:mx-[10%] flex flex-col items-center justify-center text-white text-center"> */}
          <div className="flex flex-col max-md:items-center">
            <h1 className="text-2xl sm:text-4xl lg:text-5xl xl:text-6xl sm:px-[15%] md:px-[15%] lg:mx-14 lg:px-[7%] xl:px-[15%] font-medium">
              Explore unlimited movies, TV shows, and more..
            </h1>
            <h2 className="text-lg sm:text-1xl lg:text-2xl font-medium m-2 sm:m-4">
              Watch anywhere. Cancel anytime.
            </h2>
          </div>
          <div className="flex justify-center">
            <button
              onClick={() => signIn("github")}
              className="bg-red-600 hover:bg-[#e50914] p-4 rounded-full w-[200px]"
            >
              Sign In to Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function UnauthPage() {
  const router = useRouter();
  // const [showCurrentAns, setShowCurrentAns] = useState(null);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <main>
        <div className="bg-[#000000]">
          <UnauthBanner router={router} />
        </div>
      </main>
    </motion.div>
  );
}
