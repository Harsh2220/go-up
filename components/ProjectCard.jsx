import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react";

export default function ProjectCard({ name, desc, image }) {
  return (
    <Flex mt={10} mx={["unset", 4]} alignItems="center" justifyContent="center">
      <Box maxW="xs" mx="auto" bg="white" boxShadow="lg" rounded="lg">
        <Image
          h={48}
          w="full"
          fit="cover"
          mb={2}
          roundedTop="lg"
          src={image}
          alt={name}
        />
        <Box p={3}>
          <Heading color="gray.800" fontWeight="bold" fontSize="2xl">
            {name}
          </Heading>
          <Text mt={2} fontSize="sm" color="gray.600" noOfLines={3}>
            {desc}
          </Text>
        </Box>
      </Box>
    </Flex>
  );
}
