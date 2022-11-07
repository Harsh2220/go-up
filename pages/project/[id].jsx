import {
  Avatar,
  Box,
  Container,
  Divider,
  Flex,
  Heading,
  IconButton,
  Img,
  Stack,
  Text,
  chakra,
  Textarea,
  useToast,
  Button,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { FaGithub } from "react-icons/fa";
import { BsLink45Deg } from "react-icons/bs";
import { useState } from "react";
import { addNewComment } from "../../context/slices/commentSlice";

export default function Project() {
  const [comment, setComment] = useState(null);
  const toast = useToast();
  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = router.query;

  const projects = useSelector((state) => state.projectsData);
  const user = useSelector((state) => state.userData);
  const comments = useSelector((state) => state.commentsData);

  const currentProject = projects.allProjects?.find(
    (project) => project.id === id
  );

  let owner = null;

  if (currentProject) {
    owner = user.allUsers?.find(
      (user) => user.auth_id == currentProject.user_id
    );
  }

  const addComment = async () => {
    if (!user.authenticated) {
      toast({
        title: "Please login to add comment",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    const project_id = id;
    const user_id = user.currentUser?.id;
    const addedComment = await fetch("/api/addComment", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ user_id, comment, project_id }),
    });
    const commentData = await addedComment.json();
    if (addedComment.ok) {
      dispatch(addNewComment(commentData));
      toast({
        title: "Comment added succesfully.",
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
  };

  return (
    <Container maxW={"7xl"} minH={"100vh"} p={[0, 4]}>
      <Flex
        justifyContent={"space-between"}
        gap={5}
        my={[6, 12]}
        flexDirection={["column-reverse", "column-reverse", "row"]}
      >
        <Box w="full" rounded={"sm"} bg="white" border={"1px"}>
          <Img
            src={currentProject?.image ? currentProject?.image : "/logo.svg"}
            h="96"
            w="full"
            objectFit={"contain"}
            roundedTop={"sm"}
            borderBottom={"1px"}
          />
          <Box py={4} px={4}>
            <Heading>{currentProject?.name}</Heading>
            <Text mt={2} fontSize={"lg"}>
              {currentProject?.description}
            </Text>
            <Divider mt={4} />
          </Box>
          <Box py={4} px={4}>
            <Heading fontSize={"2xl"}>Comments</Heading>
            <Flex my={12} gap={4}>
              <Avatar
                size={"sm"}
                src={user.currentUser?.image}
                name={user.currentUser?.name}
              />
              <Textarea
                rows={2}
                onChange={(e) => setComment(e.target.value)}
                value={comment}
              />
              <Button
                bg="#4c4ed7"
                color="white"
                px={8}
                onClick={() => {
                  setComment("");
                  addComment();
                }}
              >
                Post
              </Button>
            </Flex>
            {comments?.allComments
              ?.slice(0)
              .reverse()
              .map((comment) =>
                comment.project_id === id
                  ? user?.allUsers?.map((el) =>
                      el.id === comment.user_id ? (
                        <Flex my={8} gap={4} key={comment?.id}>
                          <Avatar size={"sm"} src={el?.image} name={el?.name} />
                          <Box
                            p={4}
                            rounded="sm"
                            border={"1px"}
                            borderColor={"gray.200"}
                          >
                            <Heading fontSize={"md"}>{el?.name}</Heading>
                            <Text>{comment?.comment}</Text>
                          </Box>
                        </Flex>
                      ) : null
                    )
                  : null
              )}
          </Box>
        </Box>
        <Flex
          flexDirection={["column", "row", "column"]}
          gap={[0, 5, 0]}
          position={["unset", "unset", "sticky"]}
          top={["unset", "unset", 20]}
          height={"fit-content"}
        >
          <Flex
            w={["full", "1/2", "xs"]}
            p={3}
            rounded={"sm"}
            alignItems="center"
            border={"1px"}
            bg="white"
          >
            <Avatar src={owner?.image} name={owner?.name} size={"lg"} />
            <Box ml={2}>
              <Heading fontSize={"lg"} fontWeight={"semibold"}>
                {owner?.name}
              </Heading>
              <Text lineHeight={1} mt={1} fontSize={"sm"}>
                Posted on {owner?.created_at.split("T")[0]}
              </Text>
            </Box>
          </Flex>
          {currentProject?.github || currentProject?.link ? (
            <Stack
              w={["full", "1/2", "xs"]}
              p={3}
              rounded={"sm"}
              mt={[4, "unset", 4]}
              border={"1px"}
              bg="white"
            >
              <Heading fontSize={"xl"} fontWeight={"semibold"}>
                Links
              </Heading>
              <Divider />
              <Flex pt={2} gap={3}>
                {currentProject?.github ? (
                  <chakra.a href={currentProject?.github} target="_blank">
                    <IconButton
                      icon={<FaGithub fontSize={"20px"} />}
                      variant="secondary"
                      boxShadow="3px 3px 0 black"
                    />
                  </chakra.a>
                ) : null}
                {currentProject?.link ? (
                  <chakra.a href={currentProject?.link} target="_blank">
                    <IconButton
                      icon={<BsLink45Deg fontSize={"20px"} />}
                      variant="secondary"
                      boxShadow="3px 3px 0 black"
                    />
                  </chakra.a>
                ) : null}
              </Flex>
            </Stack>
          ) : null}
        </Flex>
      </Flex>
    </Container>
  );
}
