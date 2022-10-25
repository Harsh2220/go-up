import Navbar from "./Navbar";
import { useUser } from "@auth0/nextjs-auth0";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { currentUser, allUsers } from "../context/slices/userSlice";
import { allProjects } from "../context/slices/projectSlice";
import { useToast } from "@chakra-ui/react";

export default function Layout({ children }) {
  const { user, error, isLoading } = useUser();
  const dispatch = useDispatch();
  const toast = useToast();

  const setUser = async () => {
    const user_id = user?.email;
    const name = user?.name;
    const image = user?.picture;

    const setUser = await fetch("/api/setuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id, name, image }),
    });
    const UserData = await setUser.json();
    if (!setUser.ok) {
      toast({
        title: "Something went wrong!!",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } else {
      dispatch(currentUser(UserData.user));
      toast({
        title: "Logged in succesfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    if (!isLoading) {
      setUser();
    }
  }, [isLoading]);

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
