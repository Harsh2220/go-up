import {
  Avatar,
  Button,
  Heading,
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
} from "@chakra-ui/react";
import { BiPlus } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { currentUser } from "../context/slices/userSlice";

const Links = [
  { icon: <FaGithub fontSize="24px" />, link: "https://github.com/harsh2220" },
  {
    icon: <FaLinkedin fontSize="24px" />,
    link: "https://www.linkedin.com/in/harsh2220/",
  },
  { icon: <FaTwitter fontSize="24px" />, link: "https://twitter.com/hrs_2220" },
];

export default function ProfileCard() {
  const addProject = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editProfile, setEditProfile] = useState(false);
  const user = useSelector((state) => state.userData);

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
    link: "",
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

  const handleSubmit = () => {
    if (editProfile) {
      if (user.currentUser !== null) {
        userData.user_id = user.currentUser.auth_id;
        fetch("/api/updateProfile", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        })
          .then((res) => res.json())
          .then((data) => {
            dispatch(currentUser(data.user));
          });
      }
    } else {
      if (user.currentUser !== null) {
        project.user_id = user.currentUser.auth_id;
        fetch("/api/addProject", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(project),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
          });
      }
    }
  };

  return (
    <Flex
      mt={10}
      p={["undefined", 5]}
      rounded={"md"}
      justifyContent="space-between"
      flexWrap="wrap"
    >
      <HStack alignItems="center" spacing={"2"}>
        <Avatar
          src={user.currentUser?.image}
          name={user.currentUser?.name}
          size="md"
          mr={[1, 2]}
        />
        <Flex flexDirection={["column", "row"]} alignItems="center">
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
          <Text fontSize="md" fontWeight="semibold">
            {user.currentUser?.description}
          </Text>
        </Flex>
      </HStack>
      <HStack spacing={"2"}>
        <IconButton
          colorScheme={"gray"}
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
          colorScheme={"gray"}
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
                    placeholder="Name"
                    name="name"
                    onChange={handleChange}
                  />
                  <Textarea
                    placeholder="Description"
                    name="description"
                    onChange={handleChange}
                  />
                  <Input
                    placeholder="Link"
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
