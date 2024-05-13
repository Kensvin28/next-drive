import { database } from "@/firebaseConfig";
import { addDoc, collection, setDoc, doc } from "firebase/firestore";

const files = collection(database, "files");

export const addFiles = async (imageLink: string) => {
    try {
        await addDoc(files, {
            imageLink,
            isFolder: false,
        }).then(() => {
            console.log("Document successfully written!");
        }).catch((error) => {
            console.error("Error writing document: ", error);
        });
    } catch (err) {
        console.log(err);
    }
}

export const addFolder = async (payload: {
    folderName: string;
    isFolder: boolean;
    fileList: object;
}) => {
    try {
        await setDoc(doc(database, "files", payload.folderName), payload).then(() => {
            console.log("Document successfully written!");
        }).catch((error) => {
            console.error("Error writing document: ", error);
        });
    } catch (err) {
        console.log(err);
    }
}