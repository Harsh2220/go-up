import {
  Box,
  Heading,
  Text,
  Stack,
  Avatar,
  Img,
  HStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

export default function Project({ name, desc, image, date }) {
  // const [like, setLike] = useState(false);

  console.log(date);

  return (
    <Box
      maxW={"sm"}
      bg="white"
      boxShadow={"2xl"}
      rounded={"lg"}
      p={6}
      my={5}
      mx={[0, 5]}
      overflow={"hidden"}
    >
      <Box h={"200px"} bg={"gray.100"} mt={-6} mx={-6} mb={6}>
        <Img src={image} objectFit="cover" h="full" w="full" />
      </Box>
      <Stack>
        <Heading fontSize={"2xl"} fontFamily={"body"}>
          {name}
        </Heading>
        <Text color={"gray.500"} noOfLines="5">
          {desc}
        </Text>
      </Stack>
      <HStack mt={6} justifyContent="space-between">
        <Stack direction={"row"} spacing={4} align={"center"}>
          <Avatar
            src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2831&q=80"
            name="John Doe"
          />
          <Stack direction={"column"} spacing={0} fontSize={"sm"}>
            <Text fontWeight={600}>John Doe</Text>
            <Text color={"gray.500"}>{date}</Text>
          </Stack>
        </Stack>
        {/* <Stack alignItems="center" justifyContent="center">
          {like ? (
            <AiFillHeart
              fontSize={"28px"}
              onClick={() => setLike(false)}
              fill="red"
              cursor="pointer"
            />
          ) : (
            <AiOutlineHeart
              fontSize={"28px"}
              onClick={() => setLike(true)}
              cursor="pointer"
            />
          )}
        </Stack> */}
      </HStack>
    </Box>
  );
}
