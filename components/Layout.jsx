import Navbar from "./Navbar";
import { useUser } from "@auth0/nextjs-auth0";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { currentUser } from "../context/slices/userSlice";

export default function Layout({ children }) {
  const { user, error, isLoading } = useUser();

  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      const user_id = user?.sid;
      const name = user?.name;
      const image = user?.picture;

      fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id, name, image }),
      })
        .then((res) => res.json())
        .then((data) => {
          dispatch(currentUser(data.user));
        });
    }
  }, [dispatch, user]);

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
