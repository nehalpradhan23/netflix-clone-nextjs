"use client";

import ManageAccounts from "@/components/manage-accounts";
import UnauthPage from "@/components/unauth-page";
import { GlobalContext } from "@/context";
import { useSession } from "next-auth/react";
import { useContext } from "react";

export default function Browse() {
  const { loggedInAccount } = useContext(GlobalContext);
  const { data: session } = useSession();
  // console.log(session, "session");

  // first login/github auth check
  if (session === null) return <UnauthPage />;
  // check for logged in account, (different from github auth)
  if (loggedInAccount === null) return <ManageAccounts />;
  // ====================================================================
  return <div>Browse</div>;
}
