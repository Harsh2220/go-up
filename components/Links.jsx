import {
  Avatar,
  Box,
  Divider,
  Flex,
  Heading,
  IconButton,
  Stack,
  Text,
  chakra,
} from "@chakra-ui/react";
import { BsLink45Deg } from "react-icons/bs";
import { FaGithub } from "react-icons/fa";

export default function Links({ owner, currentProject }) {
  return (
    <Flex
      flexDirection={["column", "row", "column"]}
      gap={[0, 5, 0]}
      position={["unset", "unset", "sticky"]}
      top={["unset", "unset", 20]}
      height={"fit-content"}
    >
      <Flex
        w={["full", "1/2", "xs"]}
        p={3}
        rounded={"sm"}
        alignItems="center"
        border={"1px"}
        bg="white"
      >
        <Avatar src={owner?.image} name={owner?.name} size={"lg"} />
        <Box ml={2}>
          <Heading fontSize={"lg"} fontWeight={"semibold"}>
            {owner?.name}
          </Heading>
          <Text lineHeight={1} mt={1} fontSize={"sm"}>
            Posted on {owner?.created_at.split("T")[0]}
          </Text>
        </Box>
      </Flex>
      {currentProject?.github || currentProject?.link ? (
        <Stack
          w={["full", "1/2", "xs"]}
          p={3}
          rounded={"sm"}
          mt={[4, "unset", 4]}
          border={"1px"}
          bg="white"
        >
          <Heading fontSize={"xl"} fontWeight={"semibold"}>
            Links
          </Heading>
          <Divider />
          <Flex pt={2} gap={3}>
            {currentProject?.github ? (
              <chakra.a href={currentProject?.github} target="_blank">
                <IconButton
                  icon={<FaGithub fontSize={"20px"} />}
                  variant="secondary"
                  boxShadow="3px 3px 0 black"
                />
              </chakra.a>
            ) : null}
            {currentProject?.link ? (
              <chakra.a href={currentProject?.link} target="_blank">
                <IconButton
                  icon={<BsLink45Deg fontSize={"20px"} />}
                  variant="secondary"
                  boxShadow="3px 3px 0 black"
                />
              </chakra.a>
            ) : null}
          </Flex>
        </Stack>
      ) : null}
    </Flex>
  );
}
