import { database } from "@/firebaseConfig";
import { collection, query, getDocs, where } from "firebase/firestore";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/server/auth";
import { type NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ success: false });
    }
    const id = req.nextUrl.searchParams.get("id");
    const q = query(collection(database, "files"), where("user", "==", session?.user.email ?? ""), where("parentId", "==", id ?? ""));

    const querySnapshot = await getDocs(q);
    console.log(querySnapshot)
    const files = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
    }));
    return NextResponse.json(files);
};