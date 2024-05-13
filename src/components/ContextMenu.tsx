"use client";
import React from "react";
import { type Data } from "@/interfaces/Data";
import { useRouter } from "next/navigation";

const ContextMenu = ({ data }: { data: Data }) => {
    const router = useRouter();
  const handleDownload = (data: Data) => {
    const link = document.createElement("a");
    link.href = `data:${data.type};base64,${data.content}`;
    link.download = data.name;
    link.click();
  };
  const handleDelete = (data: Data) => {
    const name = data.name;
    fetch(`/api/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({name}),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => {
          router.refresh();
      })
  };
  return (
    <div className="menu absolute left-2 top-6 z-50 w-56 rounded-box bg-slate-300 p-2">
      <button
        className={"hover:bg-slate-200 p-2"}
        onClick={() => handleDownload(data)}
      >
        Download
      </button>
      <button
        className={"hover:bg-slate-200 p-2"}
        onClick={() => handleDelete(data)}
      >
        Delete
      </button>
    </div>
  );
};

export default ContextMenu;
