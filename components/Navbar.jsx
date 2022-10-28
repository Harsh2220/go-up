import {
  Box,
  Flex,
  Avatar,
  HStack,
  chakra,
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
    <Box bg="gray.100" position={"sticky"} top={0} zIndex="1">
      <Container maxW={"8xl"} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Box
            onClick={() => {
              router.push("/");
            }}
            cursor="pointer"
          >
            <Img src="/logo.svg" boxSize={"20"} />
          </Box>
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
                  <MenuList>
                    <MenuItem
                      onClick={() => {
                        router.push("/profile");
                      }}
                    >
                      Profile
                    </MenuItem>
                    <MenuDivider />
                    <MenuItem
                      onClick={() => {
                        router.push("/api/auth/logout");
                      }}
                    >
                      Signout
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Flex>
            ) : (
              <Button
                colorScheme="green"
                display="inline-flex"
                alignItems="center"
                justifyContent="center"
                w={{
                  base: "full",
                  sm: "auto",
                }}
                size="md"
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
