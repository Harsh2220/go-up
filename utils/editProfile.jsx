import { setLoading } from "../context/slices/loadingSlice";
import { currentUser } from "../context/slices/userSlice";

export default async function EditProfile(userData, toast, dispatch) {
  const update = await fetch("/api/updateProfile", {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  const updatedData = await update.json();
  if (update.ok) {
    dispatch(currentUser(updatedData.user));
    dispatch(setLoading(false));
    toast({
      title: "Profile updated succesfully.",
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
