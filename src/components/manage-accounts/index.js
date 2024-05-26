"use client";

import { GlobalContext } from "@/context";
import { signOut, useSession } from "next-auth/react";
import { useContext, useEffect, useState } from "react";
import CircleLoader from "../circle-loader";
import AccountForm from "./account-form";
import { TrashIcon } from "@heroicons/react/24/outline";
import PinContainer from "./pin-container";
import { usePathname, useRouter } from "next/navigation";

const initialFormData = {
  name: "",
  pin: "",
};

export default function ManageAccounts() {
  const {
    accounts,
    setAccounts,
    pageLoader,
    setPageLoader,
    setLoggedInAccount,
  } = useContext(GlobalContext);
  const [showAccountForm, setShowAccountForm] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [showDeleteIcon, setShowDeleteIcon] = useState(false);
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState(false);
  const [showPinContainer, setShowPinContainer] = useState({
    show: false,
    account: null,
  });
  const { data: session } = useSession();
  const pathname = usePathname();
  const router = useRouter();

  // ===================================================
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
  // ====================================================
  useEffect(() => {
    getAllAccounts();
  }, []);

  // save add account form data --------------------------------
  async function handleSave() {
    const res = await fetch("/api/account/create-account", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
        uid: session?.user?.uid,
      }),
    });
    const data = await res.json();
    if (data.success) {
      getAllAccounts();
      setFormData(initialFormData);
      setShowAccountForm(false);
    } else {
      getAllAccounts();
    }
    console.log(data, "data");
  }

  // delete account =========================================================
  async function handleRemoveAccount(getItem) {
    const res = await fetch(`/api/account/remove-account?id=${getItem._id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (data.success) {
      getAllAccounts();
      setShowDeleteIcon(false);
    }
  }

  // handle pin submit ==================================================
  async function handlePinSubmit(value, index) {
    setPageLoader(true);
    const response = await fetch("/api/account/login-to-account", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uid: session?.user?.uid,
        accountId: showPinContainer.account._id,
        pin: value,
      }),
    });
    const data = await response.json();
    if (data.success) {
      setLoggedInAccount(showPinContainer.account);
      // store current user in session ------------------------------------
      sessionStorage.setItem(
        "loggedInAccount",
        JSON.stringify(showPinContainer.account)
      );
      if (pathname.includes("my-list"))
        router.push(
          `/my-list/${session?.user?.uid}/${showPinContainer.account?._id}`
        );
      else router.push(pathname);
      setPageLoader(false);
    } else {
      console.log("unsuccessful login");
      setPageLoader(false);
      setPinError(true);
      setPin("");
    }
  }

  // ==================================================
  if (pageLoader) return <CircleLoader />;

  // =============================================================
  return (
    <div className="min-h-screen flex justify-center flex-col items-center relative">
      <div>
        <button
          onClick={() => {
            setPageLoader(true);
            signOut();
            setLoggedInAccount(null);
            sessionStorage.removeItem("loggedInAccount");
          }}
          className="absolute top-3 right-3 bg-red-600 hover:bg-red-800 transition-all p-2 my-2"
        >
          Sign out
        </button>
      </div>
      <div className="flex justify-center flex-col items-center">
        <h1 className="text-white font-bold text-[35px] md:text-[54px] my-[36px]">
          Who's watching
        </h1>
        {/* show accounts ================================= */}
        <ul className="flex md:gap-8 p-0 my-[25px]">
          {accounts && accounts.length
            ? accounts.map((item) => (
                <li
                  key={item.id}
                  className="max-w-[200px] w-[100px] md:w-[155px] cursor-pointer flex flex-col items-center gap-1 md:gap-3 hover:scale-110 transition-all"
                  onClick={
                    showDeleteIcon
                      ? null
                      : () => setShowPinContainer({ show: true, account: item })
                  }
                >
                  <div className="relative">
                    <img
                      alt="Account"
                      src={
                        "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
                      }
                      className="max-w-[200px] rounded-2xl min-w-[84px] max-h-[200px] min-h-[84px] object-cover w-[60px] h-[60px] md:w-[155px] md:h-[155px]"
                    />
                    {/* delete icon ------------------------------- */}
                    {showDeleteIcon ? (
                      <div
                        onClick={() => handleRemoveAccount(item)}
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer bg-white p-2 rounded-full hover:bg-red-800 text-black hover:text-white"
                      >
                        <TrashIcon width={30} height={30} className="" />
                      </div>
                    ) : null}
                  </div>
                  <span className="mb-4">{item.name}</span>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="svg-icon svg-icon-profile-lock ltr-0 e1mhci4z1"
                    data-name="Lock"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M7 6C7 3.23858 9.23858 1 12 1C14.7614 1 17 3.23858 17 6V7H19C20.1046 7 21 7.89543 21 9V18.6529C21 19.6274 20.2885 20.4855 19.2814 20.6076C18.0287 20.7593 15.492 21 12 21C8.50801 21 5.97128 20.7593 4.71855 20.6076C3.71153 20.4855 3 19.6274 3 18.6529V9C3 7.89543 3.89543 7 5 7H7V6ZM15 6V7H9V6C9 4.34315 10.3431 3 12 3C13.6569 3 15 4.34315 15 6ZM5 9V18.627C6.19927 18.7708 8.63769 19 12 19C15.3623 19 17.8007 18.7708 19 18.627V9H5ZM11 12V16H13V12H11Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </li>
              ))
            : null}
          {/* create new account button ========================== */}
          {accounts && accounts.length < 4 ? (
            <li
              onClick={() => setShowAccountForm(!showAccountForm)}
              className="border text-white bg-[#e53509] font-bold text-xs md:text-lg border-black max-w-[200px] rounded-2xl min-w-[84px] max-h-[200px] min-h-[84px] w-[60px] h-[60px] md:w-[155px] md:h-[155px] cursor-pointer flex justify-center items-center hover:scale-110 transition-all"
            >
              Add Account
            </li>
          ) : null}
        </ul>
        {/* manage account button =========================== */}
        <div className="text-center">
          <span
            onClick={() => setShowDeleteIcon(!showDeleteIcon)}
            className="border border-gray-100 cursor-pointer tracking-wide inline-flex text-sm px-[1.5em] py-[0.5em] hover:bg-gray-100 hover:text-black transition-all"
          >
            Manage Profiles
          </span>
        </div>
      </div>
      {/* add account form ===================================  */}
      <PinContainer
        pin={pin}
        setPin={setPin}
        handlePinSubmit={handlePinSubmit}
        pinError={pinError}
        setPinError={setPinError}
        showPinContainer={showPinContainer.show}
        setShowPinContainer={setShowPinContainer}
      />
      <AccountForm
        formData={formData}
        setFormData={setFormData}
        showAccountForm={showAccountForm}
        setShowAccountForm={setShowAccountForm}
        handleSave={handleSave}
      />
    </div>
  );
}
