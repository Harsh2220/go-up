export default async function uploadImage(projectImage) {
  const formdata = new FormData();
  formdata.append("file", projectImage);
  formdata.append("upload_preset", process.env.NEXT_PUBLIC_PRESET_NAME);
  formdata.append("cloud_name", process.env.NEXT_PUBLIC_CLOUD_NAME);
  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload/`,
    {
      method: "post",
      body: formdata,
    }
  );
  const imageData = await res.json();
  return imageData;
}
