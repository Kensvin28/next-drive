"use client"
import React from 'react'
import UploadFile from './UploadFile';
import UploadFolder from './UploadFolder';
import { type Session } from 'next-auth';
import { useParams } from 'next/navigation';

const UploadWrapper = ({session}: {session: Session | null}) => {
    const params = useParams();
    const {id} = params as {id: string};
    if (!session) return null;
    const user = session?.user?.email ?? "";
    return (
        <div className="flex gap-4">
            <UploadFile parentId={id ?? ""} user={user} />
            <UploadFolder parentId={id ?? ""} user={user}/>
        </div>
    )
}

export default UploadWrapper
