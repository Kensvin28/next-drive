import { database } from "@/firebaseConfig"
import { doc, setDoc } from "firebase/firestore"; 
import { type NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const data: FormData = await req.formData()
  const file: File | null = data.get('file') as unknown as File
  const user = data.get('user') as unknown as string
  const parentId = data.get('parentId') as unknown as string

  if (!file) {
    return NextResponse.json({ success: false })
  }
  if (file.size > 1000000) {
    return NextResponse.json({ success: false })
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const base64 = buffer.toString("base64");

  const fileData = {
    name: file.name,
    type: file.type,
    size: file.size,
    content: base64,
    isFolder: false,
    parentId: parentId,
    user: user,
  };

  await setDoc(doc(database, "files", file.name), fileData);
  return NextResponse.json({ success: true })

  // const storageRef = ref(storage, `files/${file.name}`)
  // const uploadTask = uploadBytesResumable(storageRef, buffer);
  // uploadTask.on('state_changed',
  // (snapshot) => {
  //   // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
  //   const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //   console.log('Upload is ' + progress + '% done');
  //   switch (snapshot.state) {
  //     case 'paused':
  //       console.log('Upload is paused');
  //       break;
  //     case 'running':
  //       console.log('Upload is running');
  //       break;
  //   }
  // }, 
  // (error) => {
  //   // A full list of error codes is available at
  //   // https://firebase.google.com/docs/storage/web/handle-errors
  //   switch (error.code) {
  //     case 'storage/unauthorized':
  //       // User doesn't have permission to access the object
  //       console.error(error);
  //       break;
  //     case 'storage/canceled':
  //       // User canceled the upload
  //       console.error(error);
  //       break;

  //     // ...

  //     case 'storage/unknown':
  //       // Unknown error occurred, inspect error.serverResponse
  //       console.error(error);
  //       break;
  //   }
  // }, 
  // () => {
  //   // Upload completed successfully, now we can get the download URL
  //   void getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
  //     addFiles(downloadURL);
  //     console.log('File available at', downloadURL);
  //   }).catch((error) => {
  //     console.error(error);
  //   });
  // }
  // );
}