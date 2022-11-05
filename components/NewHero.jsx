import {
  Button,
  Container,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { BsArrowRight } from "react-icons/bs";

export default function NewHero() {
  return (
    <Container maxW={"8xl"}>
      <Stack
        minH={"100vh"}
        direction={{ base: "column", md: "row" }}
        mt={["unset", "unset", -16]}
      >
        <Flex p={8} flex={1} align={"center"} justify={"center"}>
          <Stack spacing={6} w={"full"} maxW={"lg"}>
            <Heading fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}>
              <Text>All your project</Text>
              <Text color={"purple.500"} as={"span"}>
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
              size="lg"
              cursor="pointer"
            >
              Explore projects
            </Button>
          </Stack>
        </Flex>
        <Flex flex={1} justifyContent="center">
          <Image
            alt={"Login Image"}
            objectFit={["cover", "contain", "contain"]}
            maxH={"100vh"}
            src={"bg.png"}
          />
        </Flex>
      </Stack>
    </Container>
  );
}
