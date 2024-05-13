"use client";

import { type ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "./Button";
import Image from "next/image";

export default function UploadFile({
  parentId,
  user,
}: {
  parentId: string;
  user: string;
}) {
  const [file, setFile] = useState<string | File>("");
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setFile(file);
  };

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("parentId", parentId);
    formData.append("user", user);

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    console.log(response);
    if (!response.ok) {
      setLoading(false);
      throw new Error(response.statusText);
    }
    const data = await response.text();
    console.log(data);
    setFile("");
    setLoading(false);
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className={"flex gap-4"}>
      <Button
        onClick={() => setIsInputVisible(!isInputVisible)}
        variant="btn-primary"
      >
        Add File
      </Button>
      {isInputVisible && (
        <>
          <input
            onChange={handleFileChange}
            type="file"
            className="file-input w-full max-w-xs"
            accept="image/*"
          />
          <Button type="submit" variant="btn-primary">
            {loading ? (
              <Image src="/loading.svg" alt="loading" width={20} height={20} />
            ) : (
              <>Upload</>
            )}
          </Button>
        </>
      )}
    </form>
  );
}
