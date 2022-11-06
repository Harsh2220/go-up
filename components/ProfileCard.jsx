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
  IconButton,
  useToast,
  Center,
  AvatarBadge,
  Img,
  Box,
  Heading,
} from "@chakra-ui/react";
import { BiPlus } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SmallCloseIcon } from "@chakra-ui/icons";
import UploadImage from "../utils/uploadImage";
import AddProject from "../utils/addProject";
import EditProfile from "../utils/editProfile";
import { setLoading } from "../context/slices/loadingSlice";

export default function ProfileCard() {
  const addProject = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editProfile, setEditProfile] = useState(false);
  const [projectImage, setProjectImage] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [avatarImage, setAvatarImage] = useState(null);
  const user = useSelector((state) => state.userData);
  const toast = useToast();
  const dispatch = useDispatch();

  const [userData, setuserData] = useState({
    user_id: "",
    name: "",
    description: "",
    image: avatar,
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
    dispatch(setLoading(true));
    if (editProfile) {
      if (avatarImage) {
        const imageData = await UploadImage(avatarImage);
        userData.image = imageData.url;
      }
      userData.user_id = user.currentUser?.auth_id;
      EditProfile(userData, toast, dispatch);
    } else {
      if (projectImage) {
        const imageData = await UploadImage(projectImage);
        project.image = imageData.url;
      }
      project.user_id = user.currentUser.auth_id;
      AddProject(project, toast, dispatch);
    }
  };

  return (
    <Flex
      m={["unset", "unset", 5]}
      position={["unset", "unset", "sticky"]}
      top={["unset", "unset", "20"]}
      p={5}
      direction={["column", "row", "column"]}
      rounded={"md"}
      bg="white"
      border={"1px"}
      minW={"xs"}
      w={["full", "full", "xs"]}
      h={"fit-content"}
    >
      <HStack alignItems="center">
        <Avatar
          src={user.currentUser?.image}
          name={user.currentUser?.name}
          size="lg"
        />
        <Box>
          <Heading fontSize="lg" fontWeight="semibold">
            {user.currentUser?.name}
          </Heading>
          <Text
            fontSize={"md"}
            fontWeight="medium"
            lineHeight={1}
            color={"gray.500"}
          >
            {user.currentUser?.description}
          </Text>
        </Box>
      </HStack>
      <Stack spacing={4} mt={5}>
        <Button
          colorScheme="white"
          rightIcon={<FiEdit />}
          color={"black"}
          border="1px"
          boxShadow="6px 6px 0px black"
          size="md"
          ref={addProject}
          onClick={() => {
            setEditProfile(true);
            setAvatar(user.currentUser?.image);
            onOpen();
          }}
        >
          Edit profile
        </Button>
        <Button
          colorScheme="white"
          rightIcon={<BiPlus />}
          color={"black"}
          border="1px"
          boxShadow="6px 6px 0px black"
          size="md"
          ref={addProject}
          onClick={() => {
            setEditProfile(false);
            onOpen();
          }}
        >
          Add project
        </Button>
      </Stack>
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
                  <Stack direction={["column", "row"]} spacing={6}>
                    <Center>
                      <Avatar
                        size="xl"
                        src={avatar}
                        name={user.currentUser?.name}
                      >
                        <AvatarBadge
                          as={IconButton}
                          size="sm"
                          rounded="full"
                          top="-10px"
                          colorScheme="red"
                          aria-label="remove Image"
                          icon={<SmallCloseIcon />}
                          display={avatar ? "block" : "none"}
                          onClick={() => {
                            setAvatar(null);
                          }}
                        />
                      </Avatar>
                    </Center>
                    <Center w="full">
                      <label
                        htmlFor="avatar-image"
                        style={{
                          backgroundColor: "#805AD5",
                          textAlign: "center",
                          padding: "10px",
                          fontWeight: "500",
                          borderRadius: "4px",
                          color: "white",
                          cursor: "pointer",
                          width: "100%",
                        }}
                      >
                        Change profile
                      </label>
                      <input
                        type="file"
                        id="avatar-image"
                        style={{ display: "none" }}
                        onChange={(e) => {
                          setAvatarImage(e.target.files[0]);
                          setAvatar(URL.createObjectURL(e.target.files[0]));
                        }}
                      />
                    </Center>
                  </Stack>
                  <Stack spacing={5} py={5}>
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
                  </Stack>
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
                    placeholder="Enter github link"
                    name="github"
                    onChange={handleChange}
                  />
                  <Input
                    placeholder="Enter deployed link"
                    name="link"
                    onChange={handleChange}
                  />
                  <label
                    htmlFor="project-image"
                    style={{
                      backgroundColor: "#805AD5",
                      textAlign: "center",
                      padding: "10px",
                      fontWeight: "500",
                      borderRadius: "4px",
                      marginTop: "24px",
                      color: "white",
                      cursor: "pointer",
                    }}
                  >
                    Upload an image
                  </label>
                  <input
                    type="file"
                    id="project-image"
                    style={{ display: "none" }}
                    onChange={(e) => {
                      setProjectImage(e.target.files[0]);
                      setPreviewURL(URL.createObjectURL(e.target.files[0]));
                    }}
                  />
                  {previewURL ? (
                    <Img src={previewURL} w="full" h={64} objectFit="contain" />
                  ) : null}
                </>
              )}
            </Stack>
          </DrawerBody>
          <DrawerFooter>
            <Button
              colorScheme="purple"
              onClick={() => {
                onClose();
                handleSubmit();
              }}
            >
              Save
            </Button>
            <Button variant="outline" ml={3} onClick={onClose}>
              Cancel
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
}
