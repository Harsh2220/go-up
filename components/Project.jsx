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

export default function Project({ name, desc, image, date, user, user_image }) {
  // const [like, setLike] = useState(false);

  return (
    <Box
      maxW={"sm"}
      bg="white"
      boxShadow={"lg"}
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
        <Stack direction={"row"} spacing={3} alignItems="center">
          <Avatar src={user_image} name={user} size={"md"} />
          <Stack direction={"column"} spacing={0} fontSize={"sm"}>
            <Text fontSize={"md"} fontWeight={"semibold"} lineHeight={"1"}>
              {user}
            </Text>
            <Text color={"gray.500"} fontSize={"xs"} fontWeight={"medium"}>
              {date.split("T")[0]}
            </Text>
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
