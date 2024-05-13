"use client";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react'

const Folder = ({id}: {id: string}) => {
    const router = useRouter();
    return (
      <div
        onClick={() => {
          router.push(`/folder/${id}`);
        }}
        className="card-body cursor-pointer items-center text-center"
      >
        <Image src={"/folder.svg"} alt={id} width={200} height={200} />
        <p className="card-title text-center">{id}</p>
      </div>
    );
}

export default Folder