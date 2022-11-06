import Navbar from "./Navbar";
import { useUser } from "@auth0/nextjs-auth0";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { currentUser, allUsers } from "../context/slices/userSlice";
import { allProjects } from "../context/slices/projectSlice";
import { Box } from "@chakra-ui/react";
import { allComments } from "../context/slices/commentSlice";
import { supabase } from "../lib/supabase";
import Loader from "./Loader";
import { setLoading } from "../context/slices/loadingSlice";

export default function Layout({ children }) {
  const Loading = useSelector((state) => state.loadingState.isLoading);
  const { user, error, isLoading } = useUser();
  const dispatch = useDispatch();

  const setUser = async () => {
    const user_id = user?.email;
    const name = user?.name;
    const image = user?.picture;

    const fetchedUser = await fetch("/api/setuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id, name, image }),
    });
    const UserData = await fetchedUser.json();
    if (fetchedUser.ok) {
      dispatch(currentUser(UserData.user));
      dispatch(setLoading(false));
    }
  };

  const getProjects = async () => {
    const projects = await fetch("/api/getProjects", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const projectsData = await projects.json();
    if (projects.ok) {
      dispatch(allProjects(projectsData.allProjects));
    }
  };

  const getUsers = async () => {
    const users = await fetch("/api/getUsers", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const usersData = await users.json();
    if (users.ok) {
      dispatch(allUsers(usersData.allUsers));
    }
  };

  const getComments = async () => {
    const getComment = await fetch("/api/getComments", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const comments = await getComment.json();
    if (getComment.ok) {
      dispatch(allComments(comments));
    }
  };

  useEffect(() => {
    const subscritpion = supabase
      .channel("*")
      .on("postgres_changes", { event: "*", schema: "*" }, (payload) => {
        if (payload.table === "comments") {
          getComments();
        } else if (payload.table === "profile") {
          getUsers();
        } else if (payload.table === "project") {
          getProjects();
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(subscritpion);
    };
  }, []);

  useEffect(() => {
    if (user) {
      setUser();
    } else {
      getUsers();
      getProjects();
      getComments();
    }
  }, [user]);

  return (
    <>
      {Loading ? (
        <Loader />
      ) : (
        <Box
          bgImage={"/bg.webp"}
          bgRepeat={"no-repeat"}
          bgSize={"cover"}
          bgPos={"center"}
          bgAttachment={"fixed"}
          minH={"100vh"}
        >
          <Navbar />
          {children}
        </Box>
      )}
    </>
  );
}
