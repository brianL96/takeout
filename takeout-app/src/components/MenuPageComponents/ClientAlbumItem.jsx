import React, { useEffect } from 'react'
import { useState } from 'react';


const ClientAlbumItem = ({imageSRC, index, highlight, changeHighlight}) => {

  let [newItemImage, setNewItemImage] = useState('#');
  
  useEffect(()=> {
    setNewItemImage(imageSRC);
  }, []);

  
  return (
    <div id={`item-${index}`} value={`${index}`} onClick={(e) => changeHighlight(e)} className={`rounded flex flex-row justify-center items-center bg-gray-100 min-h-24 min-w-24 ml-1 ${highlight} overflow-y-hidden cursor-pointer`}>
        <div className='h-24 w-24'>
          <img className='h-24 w-24 object-contain' id="preview-new-album-image" src={newItemImage} alt="Selected Image"></img>
        </div>
    </div>
  )
}

export default ClientAlbumItem