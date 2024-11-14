import React, { useEffect } from 'react'
import { useState } from 'react';


const ClientAlbumItem = ({imageSRC, index, highlight, changeHighlight}) => {

  let [newItemImage, setNewItemImage] = useState('#');
  
  useEffect(()=> {
    setNewItemImage(imageSRC);
  }, []);

  
  return (
    <div value={`${index}`} onClick={(e) => changeHighlight(e)} className={`rounded flex flex-row justify-center items-center bg-gray-100 min-h-32 min-w-32 ml-1 ${highlight} overflow-y-hidden cursor-pointer`}>
        <div className='h-32 w-32'>
          <img className='h-32 w-32 object-contain' id="preview-new-album-image" src={newItemImage} alt="Selected Image"></img>
        </div>
    </div>
  )
}

export default ClientAlbumItem