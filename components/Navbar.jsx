import {
  Box,
  Flex,
  Avatar,
  HStack,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Container,
  Text,
  Img,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

export default function Navbar() {
  const user = useSelector((state) => state.userData);
  const router = useRouter();

  return (
    <Box position={"sticky"} top={0} zIndex="1" bg="white">
      <Container maxW={"8xl"} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Img
            src="/logo.svg"
            boxSize={"20"}
            onClick={() => {
              router.push("/");
            }}
            cursor="pointer"
          />
          <HStack as={"nav"} spacing={4}>
            {user.authenticated ? (
              <Flex alignItems={"center"}>
                <Text
                  fontSize="md"
                  fontWeight="semibold"
                  mr="3"
                  display={["none", "block"]}
                >
                  {user.currentUser?.name}
                </Text>
                <Menu>
                  <MenuButton
                    as={Button}
                    rounded={"full"}
                    variant={"link"}
                    cursor={"pointer"}
                  >
                    <Avatar
                      size={"sm"}
                      src={user.currentUser?.image}
                      name={user.currentUser?.name}
                    />
                  </MenuButton>
                  <MenuList p={0}>
                    <MenuItem
                      py={3}
                      onClick={() => {
                        router.push("/profile");
                      }}
                      _hover={{
                        backgroundColor: "#4c4ed7",
                        color: "white",
                      }}
                      roundedTop={"md"}
                    >
                      Profile
                    </MenuItem>
                    <MenuDivider m={0} />
                    <MenuItem
                      py={3}
                      onClick={() => {
                        router.push("/api/auth/logout");
                      }}
                      _hover={{
                        backgroundColor: "#4c4ed7",
                        color: "white",
                      }}
                      roundedBottom={"md"}
                    >
                      Signout
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Flex>
            ) : (
              <Button
                colorScheme="purple"
                rounded={"md"}
                cursor="pointer"
                onClick={() => {
                  router.push("/api/auth/login");
                }}
              >
                Get Started
              </Button>
            )}
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
}
