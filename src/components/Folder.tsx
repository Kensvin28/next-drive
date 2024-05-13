"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import ContextMenu from "./ContextMenu";

const Folder = ({ id }: { id: string }) => {
  const [showContextMenu, setShowContextMenu] = useState(false);
  useEffect(() => {
    const handleBodyClick = (e: MouseEvent) => {
      const isContextMenuClicked = !!(
        e.target instanceof Element &&
        e.target.closest(".menu")
      );
      if (!isContextMenuClicked) {
        setShowContextMenu(false);
      }
    };

    document.body.addEventListener("click", handleBodyClick);

    return () => {
      document.body.removeEventListener("click", handleBodyClick);
    };
  }, []);

  const router = useRouter();
  return (
    <div
      onClick={() => {
        router.push(`/folder/${id}`);
      }}
      className="card-body cursor-pointer items-center text-center"
    >
      <Image src={"/folder.svg"} alt={id} width={200} height={200} />
      <div className="flex w-[95%] flex-row items-center justify-between">
        <span className="w-full">
          <p className="card-title line-clamp-3 max-w-48 justify-center">
            {id}
          </p>
        </span>
        <div className="card-actions relative">
          <div
            onClick={(event: React.MouseEvent): void => {
              event.preventDefault();
              event.stopPropagation();
              setShowContextMenu(!showContextMenu);
            }}
          >
            <Image src="/options.svg" alt="options" width={20} height={20} />
          </div>
          {showContextMenu && <ContextMenu data={id} />}
        </div>
      </div>
    </div>
  );
};

export default Folder;
