import { setLoading } from "../context/slices/loadingSlice";
import { addNewProject } from "../context/slices/projectSlice";

export default async function AddProject(project, toast, dispatch) {
  const addProject = await fetch("/api/addProject", {
    method: "POST",
    headers: {
      "Content-type": "application/json ",
    },
    body: JSON.stringify(project),
  });
  const projectData = await addProject.json();
  if (addProject.ok) {
    dispatch(addNewProject(projectData));
    dispatch(setLoading(false));
    toast({
      title: "Project added succesfully.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  } else {
    dispatch(setLoading(false));
    toast({
      title: "Some errored occured !",
      status: "error",
      duration: 5000,
      isClosable: true,
    });
  }
}
