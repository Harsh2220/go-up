import {
  Box,
  Heading,
  Text,
  Img,
  HStack,
  Button,
  Flex,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import {
  AiOutlineHeart,
  AiFillHeart,
  AiOutlineArrowRight,
} from "react-icons/ai";
import { BsArrowRight } from "react-icons/bs";

export default function ProjectCard({ id, name, desc, image }) {
  // const [like, setLike] = useState(false);
  const router = useRouter();

  return (
    <Box
      w={["full", "xs"]}
      boxShadow={"lg"}
      rounded={"lg"}
      my={5}
      mx={[0, 5]}
      overflow={"hidden"}
      bg="white"
    >
      <Box h={"200px"}>
        <Img
          src={image ? image : "logo.svg"}
          objectFit="cover"
          h="full"
          w="full"
          alt={name}
        />
      </Box>
      <Box p={4}>
        <Box>
          <Heading fontSize={"2xl"} noOfLines={1}>
            {name}
          </Heading>
          <Text color={"gray.500"} noOfLines={1}>
            {desc}
          </Text>
        </Box>
        <HStack mt={4} justifyContent="space-between">
          <Button
            colorScheme="purple"
            rightIcon={<BsArrowRight />}
            onClick={() => {
              router.push(`/project/${id}`);
            }}
          >
            View More
          </Button>
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
    </Box>
  );
}
