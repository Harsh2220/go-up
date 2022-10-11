import { Container, Flex } from "@chakra-ui/react";
import ProjectCard from "../components/ProjectCard";
import ProfileCard from "../components/ProfileCard";
import { useSelector } from "react-redux";

export default function profile() {
  const projects = useSelector((state) => state.projectsData);
  const user = useSelector((state) => state.userData);

  return (
    <Container maxW="8xl">
      <Flex direction={["column", "column", "column"]} justifyContent="center">
        <ProfileCard />
        <Flex
          justifyContent="center"
          flexWrap="wrap"
          rounded={"md"}
          pb={10}
          mb={5}
        >
          {projects?.allProjects?.map((project) =>
            project.user_id === user.currentUser?.auth_id ? (
              <ProjectCard
                key={project.id}
                name={project.name}
                desc={project.description}
                image={project.link}
              />
            ) : null
          )}
        </Flex>
      </Flex>
    </Container>
  );
}
