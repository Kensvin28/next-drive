"use client";

import React, { type ChangeEvent, useState } from 'react'
import Button from './Button';
import { addFolder } from '@/app/api/firestore';
import { useRouter } from 'next/navigation';
import Image from "next/image";

const UploadFolder = ({parentId, user} : {parentId: string, user: string}) => {
    const router = useRouter();
    const [folderName, setFolderName] = useState("");
    const [isInputVisible, setIsInputVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const uploadFolder = () => {
        setLoading(true);
        console.log(folderName);
        const payload = {
            folderName: folderName,
            isFolder: true,
            fileList: [],
            parentId: parentId ?? "",
            user: user,
        }
        addFolder(payload).then(() => {
            setFolderName("");
            router.refresh();
        }).catch((err) => {
            console.log(err);
        }).finally(() => {
            setLoading(false);
        })
    }
    return (
      <div className="flex flex-row gap-4">
        <Button
          onClick={() => setIsInputVisible(!isInputVisible)}
          variant="btn-outline"
        >
          Add Folder
        </Button>
        {isInputVisible && (
          <>
            <input
              onChange={(e: ChangeEvent<HTMLInputElement>) => setFolderName(e.target.value)}
              type="text"
              placeholder="Folder Name"
              className={"max-w-x-xs input input-bordered input-accent w-full"}
            />
            <Button onClick={() => uploadFolder()} variant="btn-primary">
              {loading ? (
                <Image
                  src="/loading.svg"
                  alt="loading"
                  width={20}
                  height={20}
                />
              ) : (
                <>Create</>
              )}
            </Button>
          </>
        )}
      </div>
    );
}

export default UploadFolder