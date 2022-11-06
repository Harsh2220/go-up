import { Box, Center } from "@chakra-ui/react";
import Lottie from "react-lottie";
import animationData from "../animation.json";

export default function Loader() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <Center h={"100vh"} bg="white">
      <Box w={96}>
        <Lottie options={defaultOptions} />
      </Box>
    </Center>
  );
}
