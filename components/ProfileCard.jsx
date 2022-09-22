import { Avatar, Button, Heading, HStack, Stack, Text, chakra, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, DrawerFooter, useDisclosure, Input, Textarea, Flex, Divider, IconButton } from '@chakra-ui/react';
import { BiPlus } from 'react-icons/bi';
import { FiEdit } from 'react-icons/fi';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'
import { useRef, useState } from 'react';

const Links = [{ icon: <FaGithub fontSize='24px' />, link: "https://github.com/harsh2220" }, { icon: <FaLinkedin fontSize='24px' />, link: "https://www.linkedin.com/in/harsh2220/" }, { icon: <FaTwitter fontSize='24px' />, link: "https://twitter.com/hrs_2220" }]


export default function ProfileCard() {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const addProject = useRef();
    const [editProfile, setEditProfile] = useState(false);

    return (
        <Flex mt={10} p={['undefined', 5]} rounded={'md'} justifyContent='space-between' flexWrap='wrap'>
            <HStack alignItems='center' spacing={'2'}>
                <Avatar src='https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2831&q=80' name='' size='md' mr={[1, 2]} />
                <Flex flexDirection={['column', 'row']} alignItems='center'>
                    <Heading fontSize='md'>
                        Harsh Sachaniya
                    </Heading>
                    <Divider orientation='vertical' borderColor={'gray.300'} h='28px' display={['none', 'block']} mx={2} />
                    <Text fontSize={'sm'}>
                        Web Developer
                    </Text>
                </Flex>
            </HStack>
            <HStack spacing={'2'}>
                <IconButton
                    colorScheme={'gray'}
                    variant='solid'
                    aria-label="Subscribe"
                    rounded={'full'}
                    icon={<FiEdit />}
                    ref={addProject}
                    onClick={() => { setEditProfile(true); onOpen(); }}
                />
                <IconButton
                    colorScheme={'gray'}
                    variant='solid'
                    aria-label="Subscribe"
                    rounded={'full'}
                    icon={<BiPlus />}
                    ref={addProject}
                    onClick={() => { setEditProfile(false); onOpen(); }}
                />
            </HStack>
            <Drawer
                isOpen={isOpen}
                placement='right'
                onClose={onClose}
                finalFocusRef={addProject}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>{editProfile ? 'Edit profile' : 'Add project'}</DrawerHeader>
                    <DrawerBody>
                        <Stack spacing={'2'}>
                            {editProfile ?
                                <>
                                    <Input placeholder='Name' />
                                    <Input placeholder='Description' />
                                </> :
                                <>
                                    <Input placeholder='Name' />
                                    <Textarea placeholder='Description' />
                                    <Input placeholder='Link' />
                                </>
                            }
                        </Stack>
                    </DrawerBody>

                    <DrawerFooter>
                        <Button variant='outline' mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button colorScheme='purple'>Save</Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </Flex>
    )
}

