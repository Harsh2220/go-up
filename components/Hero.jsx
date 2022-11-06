import {
  Button,
  Container,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { BsArrowRight } from "react-icons/bs";

export default function Hero() {
  const router = useRouter();

  return (
    <Container maxW={"8xl"}>
      <Stack direction={{ base: "column", md: "row" }} h={"calc(100vh - 64px)"}>
        <Flex flex={1} align={"center"} justify={"center"}>
          <Stack spacing={6} w={"full"} maxW={"lg"}>
            <Heading fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}>
              <Text>All your project</Text>
              <Text color={"#4c4ed7"} as={"span"}>
                feedback in one single place.
              </Text>
            </Heading>
            <Text fontSize={{ base: "md", lg: "lg" }} color={"gray.500"}>
              GoUp is a feedback app where you can add you projects and give
              feedback to the other users projects.
            </Text>
            <Button
              colorScheme="purple"
              w="fit-content"
              rightIcon={<BsArrowRight />}
              onClick={() => {
                router.push("/projects");
              }}
              cursor="pointer"
            >
              Explore projects
            </Button>
          </Stack>
        </Flex>
        <Flex flex={1} justifyContent="center">
          <Image alt={"Login Image"} objectFit={"contain"} src={"/home.png"} />
        </Flex>
      </Stack>
    </Container>
  );
}
