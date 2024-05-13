"use client";
import Image from 'next/image';
import React, { useState, useEffect } from 'react'
import ContextMenu from './ContextMenu';
import { type Data } from '@/interfaces/Data';

const File = ({data}: {data: Data}) => {
    const [showContextMenu, setShowContextMenu] = useState(false);
    const handleOpen = (data: Data) => {
      
      const newTab = window.open();
      newTab?.document.write(`<!DOCTYPE html><body>
          <img src="data:${data.type};base64,${data.content}"></img>
        </body>`);
      newTab?.document.close();
    };
    // hide context menu when clicking outside
    useEffect(() => {
        const handleBodyClick = (e: MouseEvent) => {
            const isContextMenuClicked = !!(
              e.target instanceof Element && e.target.closest(".menu")
            );
            if (!isContextMenuClicked) {
                setShowContextMenu(false);
            }
        };

        document.body.addEventListener('click', handleBodyClick);

        return () => {
            document.body.removeEventListener('click', handleBodyClick);
        };
    }, []);

    return (
      <div
        className="card-body cursor-pointer items-center p-4 text-center"
        onClick={() => handleOpen(data)}
      >
        <div className="flex min-h-52 min-w-52 items-center justify-center">
          <Image
            src={`data:${data.type};base64,${data.content}`}
            alt={data.name}
            width={200}
            height={200}
          />
        </div>
        <div className="flex w-[95%] flex-row items-center justify-between">
          <span className="w-full">
            <p className="card-title line-clamp-3 max-w-48 justify-center">
              {data.name}
            </p>
          </span>
          <div className="card-actions relative">
            <div
              onClick={(event: React.MouseEvent): void => {
                event.stopPropagation();
                event.preventDefault();
                setShowContextMenu(!showContextMenu);
              }}
            >
              <Image src="/options.svg" alt="options" width={20} height={20} />
            </div>
            {showContextMenu && <ContextMenu data={data} />}
          </div>
        </div>
      </div>
    );
}

export default File;