import { Container, Flex } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import ProjectCard from "../components/ProjectCard";

export default function Projects() {
  const projects = useSelector((state) => state.projectsData);

  return (
    <Container maxW={"8xl"}>
      <Flex justifyContent="center" flexWrap="wrap" py={5}>
        {projects?.allProjects
          ?.slice(0)
          .reverse()
          .map((project) => (
            <ProjectCard
              key={project.id}
              id={project.id}
              name={project.name}
              desc={project.description}
              image={project.image}
            />
          ))}
      </Flex>
    </Container>
  );
}
