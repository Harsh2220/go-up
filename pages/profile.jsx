import { Container, Flex } from "@chakra-ui/react";
import ProjectCard from "../components/ProjectCard";
import ProfileCard from "../components/ProfileCard";
import { useSelector } from "react-redux";

export default function Profile() {
  const projects = useSelector((state) => state.projectsData);
  const user = useSelector((state) => state.userData);

  return (
    <Container maxW="8xl">
      <Flex
        direction={["column", "column", "row-reverse"]}
        justifyContent="space-between"
      >
        <ProfileCard />
        <Flex justifyContent={"center"} flexWrap="wrap" rounded={"md"}>
          {projects?.allProjects
            ?.slice(0)
            .reverse()
            .map((project) =>
              project.user_id === user.currentUser?.auth_id ? (
                <ProjectCard
                  key={project.id}
                  id={project.id}
                  name={project.name}
                  desc={project.description}
                  image={project.image}
                />
              ) : null
            )}
        </Flex>
      </Flex>
    </Container>
  );
}
