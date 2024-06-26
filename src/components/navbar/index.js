"use client";

import { signOut, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import Search from "./search";
import { AiOutlineSearch } from "react-icons/ai";
import { GlobalContext } from "@/context";
import AccountPopup from "./account-popup";
import CircleLoader from "../circle-loader";
import DetailsPopup from "../details-popup";

// ===================================================

export default function Navbar() {
  const { data: session } = useSession();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAccountPopup, setShowAccountPopup] = useState(false);
  const router = useRouter();
  const pathName = usePathname();

  const {
    setPageLoader,
    loggedInAccount,
    setAccounts,
    accounts,
    setLoggedInAccount,
    pageLoader,
    showDetailsPopup,
    setShowDetailsPopup,
  } = useContext(GlobalContext);

  const menuItems = [
    {
      id: "home",
      title: "Home",
      path: "/browse",
    },
    {
      id: "tv",
      title: "TV",
      path: "/tv",
    },
    {
      id: "movies",
      title: "Movies",
      path: "/movies",
    },
    {
      id: "my-list",
      title: "My List",
      path: `/my-list/${session?.user?.uid}/${loggedInAccount?._id}`,
    },
  ];

  // make navbar bg dark after scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  async function getAllAccounts() {
    const res = await fetch(
      `/api/account/get-all-accounts?id=${session?.user?.uid}`,
      {
        method: "GET",
      }
    );
    const data = await res.json();
    // console.log(data);
    if (data && data.data && data.data.length) {
      setAccounts(data.data);
      setPageLoader(false);
    } else {
      setPageLoader(false);
    }
  }

  useEffect(() => {
    getAllAccounts();
  }, []);

  if (pageLoader) return <CircleLoader />;
  // ===========================================================
  return (
    <div className="relative">
      <header
        className={`fixed top-0 z-50 flex w-full md:items-center justify-between px-4 h-[68px] transition-all lg:px-14 max-md:bg-[#141414]  text-white max-md:h-[110px] ${
          isScrolled && "bg-[#141414]"
        } hover:bg-[#141414] transition-all`}
      >
        {/* <header
        className={`header ${
          isScrolled && "bg-[#141414]"
        } hover:bg-[#141414] transition-all`}
      > */}
        <div className="flex md:items-center space-x-2 md:space-x-10">
          <img
            src="https://rb.gy/ulxxee"
            width={120}
            height={120}
            alt="netflix"
            className="cursor-pointer object-contain max-md:h-fit max-md:pt-5"
            onClick={() => router.push("/browse")}
          />
          {/* menu items =============================== */}
          <ul className="hidden md:space-x-4 md:flex cursor-pointer">
            {menuItems.map((item) => (
              <li
                onClick={() => {
                  setPageLoader(true);
                  router.push(item.path);
                  setSearchQuery("");
                  setShowSearchBar(false);
                }}
                key={item.id}
                className="cursor-pointer text-[16px] font-light text-[#e5e5e5] transition duration-[.4s] hover:text-[#b3b3b3]"
              >
                {item.title}
              </li>
            ))}
          </ul>
        </div>
        {/* search bar ====================================== */}
        <div className="font-light flex max-md:pt-5 md:items-center space-x-4 text-sm">
          {showSearchBar ? (
            <Search
              pathName={pathName}
              router={router}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              setPageLoader={setPageLoader}
              setShowSearchBar={setShowSearchBar}
            />
          ) : (
            <AiOutlineSearch
              onClick={() => setShowSearchBar(true)}
              className="inline w-6 h-6 cursor-pointer"
            />
          )}
          {/* account =============================== */}
          <div
            onClick={() => setShowAccountPopup(!showAccountPopup)}
            className="flex gap-2 md:items-center cursor-pointer"
          >
            <img
              src="https://occ-0-2611-3663.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABfNXUMVXGhnCZwPI1SghnGpmUgqS_J-owMff-jig42xPF7vozQS1ge5xTgPTzH7ttfNYQXnsYs4vrMBaadh4E6RTJMVepojWqOXx.png?r=1d4"
              alt="Current Profile"
              className="max-w-[30px] rounded min-w-[20px] max-h-[30px] min-h-[20px] object-cover w-[30px] h-[30px]"
            />
            <p>{loggedInAccount && loggedInAccount.name}</p>
          </div>
        </div>
        {/* menu for small screen ============== */}
        <ul
          className={`absolute w-full flex items-center bottom-4 right-0 justify-center space-x-6 md:space-x-4 md:hidden cursor-pointer`}
        >
          {menuItems.map((item) => (
            <li
              onClick={() => {
                setPageLoader(true);
                router.push(item.path);
                setSearchQuery("");
                setShowSearchBar(false);
              }}
              key={item.id}
              className="cursor-pointer text-[16px] font-light text-[#e5e5e5] transition duration-[.4s] hover:text-[#b3b3b3]"
            >
              {item.title}
            </li>
          ))}
        </ul>
      </header>
      <DetailsPopup show={showDetailsPopup} setShow={setShowDetailsPopup} />
      {/* account popup */}
      {showAccountPopup && (
        <AccountPopup
          accounts={accounts}
          setPageLoader={setPageLoader}
          signOut={signOut}
          loggedInAccount={loggedInAccount}
          setLoggedInAccount={setLoggedInAccount}
        />
      )}
    </div>
  );
}
