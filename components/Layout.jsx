import Navbar from "./Navbar";
import { useUser } from "@auth0/nextjs-auth0";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { currentUser, allUsers } from "../context/slices/userSlice";
import { allProjects } from "../context/slices/projectSlice";

export default function Layout({ children }) {
  const { user, error, isLoading } = useUser();

  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      const user_id = user?.email;
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

  useEffect(() => {
    fetch("/api/getProjects", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch(allProjects(data.allProjects));
      });
    fetch("/api/getUsers", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch(allUsers(data.allUsers));
      });
  });

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
