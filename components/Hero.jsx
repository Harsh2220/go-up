import {
  Box,
  Heading,
  Container,
  Text,
  Button,
  Center,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { BsArrowRight } from "react-icons/bs";

export default function Hero() {
  const router = useRouter();

  return (
    <Container maxW={"8xl"} h="80vh">
      <Center h="full">
        <Box px={["unset", 8]} py={24} mx="auto">
          <Box
            w={{
              base: "full",
              md: 11 / 12,
            }}
            mx="auto"
            textAlign={{
              base: "left",
              md: "center",
            }}
          >
            <Heading
              mb={6}
              fontSize={{
                base: "4xl",
                md: "8xl",
              }}
              fontWeight="bold"
              letterSpacing={{
                base: "normal",
                md: "tight",
              }}
              color="gray.900"
              _dark={{
                color: "gray.100",
              }}
            >
              All your project feedback in one single place.
            </Heading>
            <Text
              px={{
                base: 0,
                lg: 24,
              }}
              mb={6}
              fontSize={{
                base: "lg",
                md: "xl",
              }}
              color="white"
            >
              {/* GoUp is a feedback app where you can add you projects and give
            feedback to the other users projects. */}
            </Text>
            <Button
              // colorScheme="purple"
              display="inline-flex"
              alignItems="center"
              justifyContent="center"
              rightIcon={<BsArrowRight />}
              w={{
                base: "full",
                sm: "auto",
              }}
              mb={{
                base: 2,
                sm: 0,
              }}
              onClick={() => {
                router.push("/projects");
              }}
              size="lg"
              cursor="pointer"
            >
              Explore projects
            </Button>
          </Box>
          {/* <Box
          w={{
            base: "full",
            md: 10 / 12,
          }}
          mx="auto"
          mt={20}
          textAlign="center"
        >
          <Image
            w="full"
            rounded="lg"
            shadow="2xl"
            src="https://kutty.netlify.app/hero.jpg"
            alt="Hellonext feedback boards software screenshot"
          />
        </Box> */}
        </Box>
      </Center>
    </Container>
  );
}
