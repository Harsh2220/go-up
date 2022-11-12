import { addNewComment } from "../context/slices/commentSlice";

export default async function addComment({
  toast,
  dispatch,
  user,
  project_id,
  comment,
}) {
  if (!user.authenticated) {
    toast({
      title: "Please login to add comment",
      status: "error",
      duration: 5000,
      isClosable: true,
    });
    return;
  }
  const user_id = user.currentUser?.id;
  const addedComment = await fetch("/api/addComment", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ user_id, comment, project_id }),
  });
  const commentData = await addedComment.json();
  if (addedComment.ok) {
    dispatch(addNewComment(commentData));
    toast({
      title: "Feedback added succesfully.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  } else {
    toast({
      title: "Some errored occured !",
      status: "error",
      duration: 5000,
      isClosable: true,
    });
  }
}
