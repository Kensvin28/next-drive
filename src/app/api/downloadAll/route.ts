import { database } from "@/firebaseConfig";
import { collection, query, getDocs, where } from "firebase/firestore";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/server/auth";
import { NextResponse } from "next/server";

export const GET = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ success: false });
  }
  const q = query(collection(database, "files"), where("user", "==", session?.user.email ?? ""), where("parentId", "==", ""));

  const querySnapshot = await getDocs(q);
  const files = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    data: doc.data(),
  }));
  return NextResponse.json(files);
};
