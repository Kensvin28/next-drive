import { headers } from "next/headers";
import { Suspense } from "react";
import Folder from "./Folder";
import File from "./File";
import { type File as FileType } from "@/interfaces/File";

export default async function DirectoryList({url}: {url: string}) {
  const response = await fetch(url, {
    method: "GET",
    headers: headers(),
  });
  const files = await response.json() as FileType[];
  if (!files || files.length === 0 || !files[0]?.data) {
    return <div>No files found</div>;
  }
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {files?.map(({ id, data }: FileType) => (
        <div key={id} className="card bg-slate-400 shadow-xl w-64">
          {data.isFolder ? <Folder id={id} /> : <File data={data} />}
        </div>
      ))}
    </Suspense>
  );
}
