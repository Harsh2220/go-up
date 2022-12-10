import { Box, Heading, Text, Button, Center } from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function NotFound() {
  const router = useRouter();

  return (
    <Center h={"calc(100vh - 64px)"}>
      <Box textAlign="center" py={10} px={6}>
        <Heading display="inline-block" as="h2" fontSize="9xl">
          404
        </Heading>
        <Text fontSize="2xl" mt={3} color={"gray.800"}>
          Page Not Found
        </Text>
        <Text color={"gray.600"} mb={6} fontSize={"lg"}>
          The page you are looking for does not seem to exist
        </Text>
        <Button
          colorScheme="white"
          w="fit-content"
          color={"black"}
          border="1px"
          boxShadow="4px 4px 0px black"
          _hover={{
            boxShadow: "none",
          }}
          _focus={{
            boxShadow: "none",
          }}
          onClick={() => router.replace("/")}
        >
          Go to home
        </Button>
      </Box>
    </Center>
  );
}
