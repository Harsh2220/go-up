import {
  Avatar,
  Button,
  HStack,
  Stack,
  Text,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  useDisclosure,
  Input,
  Textarea,
  Flex,
  Divider,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import { BiPlus } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { currentUser } from "../context/slices/userSlice";
import { addNewProject, allProjects } from "../context/slices/projectSlice";

export default function ProfileCard() {
  const addProject = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editProfile, setEditProfile] = useState(false);
  const user = useSelector((state) => state.userData);
  const toast = useToast();
  const dispatch = useDispatch();

  const [userData, setuserData] = useState({
    user_id: "",
    name: "",
    description: "",
  });

  const [project, setproject] = useState({
    user_id: "",
    name: "",
    description: "",
    image: null,
    github: null,
    link: null,
  });

  const handleChange = (e) => {
    const key = e.target.name;
    const value = e.target.value;

    if (editProfile) {
      setuserData({ ...userData, [key]: value });
    } else {
      setproject({ ...project, [key]: value });
    }
  };

  const handleSubmit = async () => {
    if (editProfile) {
      if (user.currentUser !== null) {
        userData.user_id = user.currentUser.auth_id;
        const update = await fetch("/api/updateProfile", {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(userData),
        });
        const updatedData = await update.json();
        if (update.ok) {
          dispatch(currentUser(updatedData.user));
          toast({
            title: "Profile updated succesfully.",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        } else {
          toast({
            title: "Some errored occured !",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      }
    } else {
      if (user.currentUser !== null) {
        project.user_id = user.currentUser.auth_id;
        const addProject = await fetch("/api/addProject", {
          method: "POST",
          headers: {
            "Content-type": "application/json ",
          },
          body: JSON.stringify(project),
        });
        const projectData = await addProject.json();
        if (addProject.ok) {
          dispatch(addNewProject(projectData));
          toast({
            title: "Project added succesfully.",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        } else {
          toast({
            title: "Some errored occured !",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      }
    }
  };

  return (
    <Flex
      mt={10}
      p={5}
      rounded={"md"}
      justifyContent="space-between"
      flexWrap="wrap"
      bg="white"
      boxShadow={"md"}
    >
      <HStack alignItems="center" spacing={"2"}>
        <Avatar
          src={user.currentUser?.image}
          name={user.currentUser?.name}
          size="md"
          mr={[1, 2]}
        />
        <Flex
          flexDirection={["column", "row"]}
          alignItems={["start", "center"]}
        >
          <Text fontSize="md" fontWeight="semibold">
            {user.currentUser?.name}
          </Text>
          {user.currentUser?.description ? (
            <Divider
              orientation="vertical"
              borderColor={"gray.300"}
              h="28px"
              display={["none", "block"]}
              mx={2}
            />
          ) : null}
          <Text
            fontSize={["sm", "md"]}
            fontWeight="semibold"
            lineHeight={[1, "unset"]}
            color={["gray.500", "black"]}
          >
            {user.currentUser?.description}
          </Text>
        </Flex>
      </HStack>
      <HStack spacing={"2"}>
        <IconButton
          colorScheme={"purple"}
          variant="solid"
          aria-label="Subscribe"
          rounded={"full"}
          icon={<FiEdit />}
          ref={addProject}
          onClick={() => {
            setEditProfile(true);
            onOpen();
          }}
        />
        <IconButton
          colorScheme={"purple"}
          variant="solid"
          aria-label="Subscribe"
          rounded={"full"}
          icon={<BiPlus />}
          ref={addProject}
          onClick={() => {
            setEditProfile(false);
            onOpen();
          }}
        />
      </HStack>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={addProject}
        size={["full", "xs"]}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            {editProfile ? "Edit profile" : "Add project"}
          </DrawerHeader>
          <DrawerBody>
            <Stack spacing={"2"}>
              {editProfile ? (
                <>
                  <Input
                    placeholder="Name"
                    name="name"
                    onChange={handleChange}
                  />
                  <Input
                    placeholder="Description"
                    name="description"
                    onChange={handleChange}
                  />
                </>
              ) : (
                <>
                  <Input
                    placeholder="Enter project name"
                    name="name"
                    onChange={handleChange}
                  />
                  <Textarea
                    placeholder="Enter project description"
                    name="description"
                    onChange={handleChange}
                  />
                  <Input
                    placeholder="image"
                    name="image"
                    onChange={handleChange}
                  />
                  <Input
                    placeholder="Enter github link"
                    name="github"
                    onChange={handleChange}
                  />
                  <Input
                    placeholder="Enter deployed link"
                    name="link"
                    onChange={handleChange}
                  />
                </>
              )}
            </Stack>
          </DrawerBody>
          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="purple"
              onClick={() => {
                onClose();
                handleSubmit();
              }}
            >
              Save
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
}
