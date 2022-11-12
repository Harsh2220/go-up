import { Container, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Links from "../../components/Links";
import Feedback from "../../components/Feedback";

export default function Project() {
  const router = useRouter();
  const { id } = router.query;

  const projects = useSelector((state) => state.projectsData);
  const user = useSelector((state) => state.userData);

  const currentProject = projects.allProjects?.find(
    (project) => project.id === id
  );

  let owner = null;

  if (currentProject) {
    owner = user.allUsers?.find(
      (user) => user.auth_id == currentProject.user_id
    );
  }

  return (
    <Container maxW={"7xl"} minH={"100vh"}>
      <Flex
        justifyContent={"space-between"}
        gap={5}
        my={[6, 12]}
        flexDirection={["column-reverse", "column-reverse", "row"]}
      >
        <Feedback currentProject={currentProject} />
        <Links owner={owner} currentProject={currentProject} />
      </Flex>
    </Container>
  );
}
