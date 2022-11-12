import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Img,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useRef } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import addComment from "../utils/addComment";

export default function Feedback({ currentProject }) {
  const comments = useSelector((state) => state.commentsData);
  const user = useSelector((state) => state.userData);
  const [comment, setComment] = useState("");
  const toast = useToast();
  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = router.query;
  const project_id = id;

  return (
    <Box w="full" rounded={"sm"} bg="white" border={"1px"}>
      <Img
        src={currentProject?.image ? currentProject?.image : "/logo.svg"}
        maxH={96}
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
        <Heading fontSize={"2xl"}>Feedbacks</Heading>
        <Flex my={12} gap={4}>
          <Avatar
            size={"sm"}
            src={user.currentUser?.image}
            name={user.currentUser?.name}
          />
          <Flex
            w="full"
            p={2}
            flexDir="column"
            border={"1px"}
            boxShadow="6px 6px 0 black"
          >
            <Textarea
              rows={2}
              onChange={(e) => setComment(e.target.value)}
              value={comment}
            />
            <Button
              variant={"primary"}
              color="white"
              size="sm"
              onClick={() => {
                setComment("");
                addComment({
                  toast,
                  dispatch,
                  user,
                  project_id,
                  comment,
                });
              }}
              alignSelf={"end"}
              mt={2}
              w={20}
            >
              Post
            </Button>
          </Flex>
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
  );
}
