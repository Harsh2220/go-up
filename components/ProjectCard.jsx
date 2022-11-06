import { Box, Heading, Text, Img, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { BsArrowUpRight } from "react-icons/bs";

export default function ProjectCard({ id, name, desc, image }) {
  const router = useRouter();

  return (
    <Box
      w={["full", "xs"]}
      // boxShadow={"lg"}
      rounded={"lg"}
      my={5}
      mx={[0, 5]}
      overflow={"hidden"}
      bg="white"
      border={"1px"}
    >
      <Box h={"200px"} borderBottom={"1px"}>
        <Img
          src={image ? image : "logo.svg"}
          roundedTop={"lg"}
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
          bg="purple.200"
          p={4}
          alignItems="center"
          justifyContent={"space-between"}
          roundedBottom={"lg"}
          cursor={"pointer"}
          onClick={() => {
            router.push(`/project/${id}`);
          }}
        >
          <Text fontSize={"lg"} fontWeight={"semibold"}>
            View more
          </Text>
          <BsArrowUpRight />
        </Flex>
        {/* <Button
          bg='purple.200'
          p={4}
          justifyContent={"space-between"}
          roundedBottom={"lg"}
          w="full"
          rightIcon={<BsArrowUpRight />}
          onClick={() => {
            router.push(`/project/${id}`);
          }}
        >
          View More
        </Button> */}
      </Box>
    </Box>
  );
}
