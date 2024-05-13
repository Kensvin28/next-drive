import { database } from "@/firebaseConfig"
import { doc, deleteDoc } from "firebase/firestore"; 
import { type NextRequest, NextResponse } from "next/server";

export const DELETE = async (req: NextRequest) => {
  const body = await req.json() as { name: string };
  const name = body.name;
  await deleteDoc(doc(database, "files", name));
  return NextResponse.json({ success: true })
}