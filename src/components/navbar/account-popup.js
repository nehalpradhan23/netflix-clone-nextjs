"use client";

export default function AccountPopup({
  accounts,
  setLoggedInAccount,
  signOut,
  loggedInAccount,
  setPageLoader,
}) {
  return (
    <div className="fixed top-[50px] p-2 flex flex-col  right-[45px] bg-black opacity-[.85] z-[999] items-center justify-center">
      <div className="flex flex-col px-4 items-center justify-center">
        {/* filter current user and show others */}
        {accounts && accounts.length
          ? accounts
              .filter((item) => item._id !== loggedInAccount?._id)
              .map((account) => (
                <div
                  onClick={() => {
                    setLoggedInAccount(null);
                    sessionStorage.removeItem("loggedInAccount");
                  }}
                  className="cursor-pointer px-4 py-4 flex gap-5 justify-center items-center hover:scale-110 transition-all"
                  key={account._id}
                >
                  <img
                    src="https://occ-0-2611-3663.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABfNXUMVXGhnCZwPI1SghnGpmUgqS_J-owMff-jig42xPF7vozQS1ge5xTgPTzH7ttfNYQXnsYs4vrMBaadh4E6RTJMVepojWqOXx.png?r=1d4"
                    alt="Current Profile"
                    className="max-w-[30px] rounded min-w-[20px] max-h-[30px] min-h-[20px] object-cover w-[30px] h-[30px]"
                  />
                  <p className="">{account.name}</p>
                </div>
              ))
          : null}
      </div>
      <div>
        <button
          onClick={() => {
            setPageLoader(true);
            signOut();
            setLoggedInAccount(null);
            sessionStorage.removeItem("loggedInAccount");
          }}
          className="hover:bg-red-600 transition-all p-2 my-2"
        >
          Sign out of Netflix
        </button>
      </div>
    </div>
  );
}
