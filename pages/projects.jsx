import { Container, Flex } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import Project from "../components/Project";

export default function projects() {
  const projects = useSelector((state) => state.projectsData);
  const user = useSelector((state) => state.userData);

  return (
    <Container maxW={"8xl"}>
      <Flex justifyContent="center" flexWrap="wrap" py={5}>
        {projects?.allProjects?.map((project) =>
          user?.allUsers?.map((user) =>
            project.user_id === user?.auth_id ? (
              <Project
                key={project.id}
                name={project.name}
                desc={project.description}
                image={project.link}
                date={project.created_at}
                user={user.name}
                user_image={user.image}
              />
            ) : null
          )
        )}
      </Flex>
    </Container>
  );
}
