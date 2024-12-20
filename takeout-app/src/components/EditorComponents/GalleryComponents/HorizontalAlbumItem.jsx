import React, { useEffect } from 'react'
import { useState } from 'react';
import { FaDeleteLeft } from "react-icons/fa6";
import { TiDeleteOutline } from 'react-icons/ti';
import { TiDelete } from 'react-icons/ti';


const HorizontalAlbumItem = ({index, imageSRC, imageTitle, removeAlbumItem}) => {

  let [newItemImage, setNewItemImage] = useState('#');
  let [newItemTitle, setNewItemTitle] = useState('');

  useEffect(()=> {
    setNewItemImage(imageSRC);
    setNewItemTitle(imageTitle);
  }, [imageSRC, imageTitle]);

  let deleteAlbumItem = (e) => {
    e.preventDefault();
    let deleteIndex = parseInt(e.currentTarget.getAttribute('value'));
    removeAlbumItem(deleteIndex);
  }

  return ( 

    <div className='flex flex-col justify-center items-center h-64 w-64 mx-1'>

      <div className='rounded h-60 w-60 flex flex-col justify-start bg-gray-100 border border-purple-400'>

        <div className='flex flex-row justify-start h-12 w-full overflow-y-hidden border-b border-purple-400'>
          <div className='h-12 w-52 break-words text-wrap'>
            <h1 className='text-sm p-1'>{(newItemTitle.length > 28) ? newItemTitle.substring(0, 28) + '...' : newItemTitle}</h1>
          </div>
          <div className='flex flex-row justify-center h-12 w-8'>
            <TiDelete value={index} onClick={(e) => {deleteAlbumItem(e)}} className='mt-1 text-3xl text-red-700 cursor-pointer'/>
          </div>
        </div>

        <div className='flex flex-row justify-center h-48 w-60 overflow-y-hidden'>
          <div className='bg-gray-200 h-48 w-48'>
            <img className='h-full w-full object-contain' id="preview-new-album-image" src={newItemImage} alt="Selected Image"></img>
          </div>
        </div>

      </div>

    </div>
  )
}

export default HorizontalAlbumItem