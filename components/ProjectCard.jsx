import { Box, Heading, Text, Img, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { BsArrowUpRight } from "react-icons/bs";

export default function ProjectCard({ id, name, desc, image }) {
  const router = useRouter();

  return (
    <Box
      w={["full", "xs"]}
      rounded={"sm"}
      my={5}
      mx={[0, 5]}
      overflow={"hidden"}
      bg="white"
      border={"1px"}
    >
      <Box h={"200px"} borderBottom={"1px"}>
        <Img
          src={image ? image : "logo.svg"}
          roundedTop={"sm"}
          objectFit="contain"
          h="full"
          w="full"
          alt={name}
        />
      </Box>
      <Box>
        <Box p={4}>
          <Heading fontSize={"2xl"} noOfLines={1}>
            {name}
          </Heading>
          <Text color={"gray.500"} noOfLines={1}>
            {desc}
          </Text>
        </Box>
        <Flex
          bg="#4c4ed7"
          p={4}
          alignItems="center"
          justifyContent={"space-between"}
          roundedBottom={"sm"}
          cursor={"pointer"}
          color="white"
          onClick={() => {
            router.push(`/project/${id}`);
          }}
        >
          <Text fontSize={"md"} fontWeight={"medium"}>
            View more
          </Text>
          <BsArrowUpRight />
        </Flex>
      </Box>
    </Box>
  );
}
