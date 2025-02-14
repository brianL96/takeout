import React from 'react'
import HorizontalAlbumItem from './HorizontalAlbumItem';

const HorizontalAlbum = ({getLocalAlbumItems, removeAlbumItem}) => {

  function getAmountOfSlots(){
  
    let pictures = getLocalAlbumItems();
    let length = pictures.length;
    let arr = [];
    let i = 0;
    
    while(i < length){
      arr.push(<HorizontalAlbumItem key={`key-HorizontalAlbumItem-${pictures[i].title}`} index={i} imageSRC={pictures[i].image} imageTitle={pictures[i].title} removeAlbumItem={removeAlbumItem} />);
      i++;
    }
    return arr;
  }

  return (
    <div className='flex flex-row justify-start bg-gray-100 h-68 w-full overflow-x-auto overflow-y-hidden border border-black'>
      {getAmountOfSlots()}
    </div>
  )
}

export default HorizontalAlbum