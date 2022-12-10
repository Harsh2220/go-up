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
  Heading,
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
          <HStack
            onClick={() => {
              router.push("/");
            }}
            cursor="pointer"
          >
            <Img src="/logo.svg" boxSize={[8, 12]} />
              <Heading fontSize={"2xl"} display={["none", "block"]}>
                DevSpace
              </Heading>
            <Flex justifyContent={"end"}>
              <Text
                fontWeight={"semibold"}
                px={2}
                w="fit-content"
                bg={"gray.200"}
              >
                Beta
              </Text>
            </Flex>
          </HStack>
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
                  <MenuList p={0} rounded="sm" border={"1px"}>
                    <MenuItem
                      py={3}
                      onClick={() => {
                        router.push("/profile");
                      }}
                      _hover={{
                        backgroundColor: "primary",
                        color: "white",
                      }}
                      roundedTop={"sm"}
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
                        backgroundColor: "primary",
                        color: "white",
                      }}
                      roundedBottom={"sm"}
                    >
                      Signout
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Flex>
            ) : (
              <Button
                variant={"primary"}
                boxShadow={"4px 4px 0 #ff90e8"}
                _hover={{
                  boxShadow: "none",
                }}
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
