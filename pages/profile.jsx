import { Container, Flex } from '@chakra-ui/react'
import ProjectCard from '../components/ProjectCard';
import ProfileCard from '../components/ProfileCard';

export default function profile() {

  return (
    <Container maxW='8xl'>
      <Flex direction={['column', 'column', 'column']} justifyContent='center'>
        <ProfileCard />
        <Flex justifyContent='center' flexWrap='wrap' rounded={'md'} pb={10} mb={5}>
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
        </Flex>
      </Flex>
    </Container>
  )
}
