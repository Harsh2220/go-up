import Navbar from "./Navbar";
import { useUser } from "@auth0/nextjs-auth0";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { currentUser, allUsers } from "../context/slices/userSlice";
import { allProjects } from "../context/slices/projectSlice";
import { Box, useToast } from "@chakra-ui/react";
import { allComments } from "../context/slices/commentSlice";
import Loader from "./Loader";

export default function Layout({ children }) {
  const [Loading, setLoading] = useState(false);
  const { user, error, isLoading } = useUser();
  const dispatch = useDispatch();
  const toast = useToast();

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
    if (!fetchedUser.ok) {
      toast({
        title: "Please login to add projects !!",
        status: "info",
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
    if (user) {
      setUser();
    } else {
      getUsers();
      getProjects();
      getComments();
    }
    setTimeout(() => {
      setLoading(true);
    }, 8000);
  }, [user]);

  return (
    <>
      {!Loading ? (
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
