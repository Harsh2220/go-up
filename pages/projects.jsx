import { Box, Container, Flex } from '@chakra-ui/react'
import Project from '../components/Project'

export default function projects() {
  return (
    <Container maxW={'8xl'}>
      <Flex justifyContent='center' flexWrap='wrap' py={5}>
        <Project />
        <Project />
        <Project />
        <Project />
        <Project />
        <Project />
      </Flex>
    </Container>
  )
}
