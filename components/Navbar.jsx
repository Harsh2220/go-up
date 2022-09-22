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
} from '@chakra-ui/react';
import { useState } from 'react';
import { useSelector } from 'react-redux';

export default function Navbar() {

    const user = useSelector((state) => state.userData);

    return (
        <Box bg='gray.100' position={'sticky'} top={0} zIndex='1'>
            <Container maxW={'8xl'} px={4}>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <Box>Logo</Box>
                    <HStack
                        as={'nav'}
                        spacing={4}>
                        {user.authenticated ? (
                            <>
                                <Text fontSize='lg' fontWeight='medium'>{user.currentUser.given_name}</Text>
                                <Menu>
                                    <MenuButton
                                        as={Button}
                                        rounded={'full'}
                                        variant={'link'}
                                        cursor={'pointer'}
                                    >
                                        <Avatar
                                            size={'sm'}
                                            src={user.currentUser.picture}
                                        />
                                    </MenuButton>
                                    <MenuList>
                                        <chakra.a href='/profile'>
                                            <MenuItem>Profile</MenuItem>
                                        </chakra.a>
                                        <MenuDivider />
                                        <chakra.a href='/api/auth/logout'>
                                            <MenuItem>Signout</MenuItem>
                                        </chakra.a>
                                    </MenuList>
                                </Menu>
                            </>
                        ) : (
                            <chakra.a href='/api/auth/login'>
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
                                >
                                    Get Started
                                </Button>
                            </chakra.a>
                        )}
                    </HStack>
                </Flex>
            </Container>
        </Box>
    );
}