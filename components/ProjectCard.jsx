import { Box, Flex, Heading, Image, Text } from '@chakra-ui/react'

export default function ProjectCard() {
    return (
        <Flex
            mt={10}
            mx={['unset', 4]}
            alignItems="center"
            justifyContent="center"
        >
            <Box
                maxW="xs"
                mx="auto"
                bg="white"
                shadow="lg"
                rounded="lg"
            >
                <Image
                    h={48}
                    w="full"
                    fit="cover"
                    mb={2}
                    roundedTop='lg'
                    src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=320&q=80"
                    alt="Nike Clone"
                />
                <Box p={3}>
                    <Heading
                        color="gray.800"
                        fontWeight="bold"
                        fontSize="2xl"
                    >
                        Nike Clone
                    </Heading>
                    <Text
                        mt={2}
                        fontSize="sm"
                        color="gray.600"
                        noOfLines={2}
                    >
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi quos
                        quidem sequi illum facere recusandae voluptatibuslksmflk jnaskjna aksnfak aksnfkaj aksjnka ajksnak sakjsfn a sfakjsnfa sfakjsnfak sfasnfa asnfa ajks fa fkjlnf nafbm, siunoajso
                    </Text>
                </Box>
            </Box>
        </Flex>
    )
}
