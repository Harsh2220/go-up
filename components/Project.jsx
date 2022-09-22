import {
    Box,
    Heading,
    Text,
    Stack,
    Avatar,
    useColorModeValue,
    Img,
    HStack
} from '@chakra-ui/react';
import { useState } from 'react';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';

export default function blogPostWithImage() {

    const [like, setLike] = useState(false);

    return (
        <Box
            maxW={'sm'}
            bg={useColorModeValue('white', 'gray.900')}
            boxShadow={'2xl'}
            rounded={'md'}
            p={6}
            my={5}
            mx={[0, 5]}
            overflow={'hidden'}>
            <Box
                h={'200px'}
                bg={'gray.100'}
                mt={-6}
                mx={-6}
                mb={6}>
                <Img
                    src={
                        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=320&q=80'
                    }
                    objectFit='cover'
                    h='full'
                    w='full'
                />
            </Box>
            <Stack>
                <Heading
                    color={useColorModeValue('gray.700', 'white')}
                    fontSize={'2xl'}
                    fontFamily={'body'}>
                    Nike Clone
                </Heading>
                <Text color={'gray.500'} noOfLines='5'>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
                    nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
                    erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
                    et ea rebum.
                </Text>
            </Stack>
            <HStack mt={6} justifyContent='space-between'>
                <Stack direction={'row'} spacing={4} align={'center'}>
                    <Avatar
                        src='https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2831&q=80'
                        name='John Doe'
                    />
                    <Stack direction={'column'} spacing={0} fontSize={'sm'}>
                        <Text fontWeight={600}>John Doe</Text>
                        <Text color={'gray.500'}>June 23, 2022</Text>
                    </Stack>
                </Stack>
                <Stack alignItems='center' justifyContent='center'>
                    {like ?
                        <AiFillHeart fontSize={'28px'} onClick={() => setLike(false)} fill='red' cursor='pointer'/>
                        :
                        <AiOutlineHeart fontSize={'28px'} onClick={() => setLike(true)} cursor='pointer'/>
                    }
                </Stack>
            </HStack>
        </Box>
    );
}