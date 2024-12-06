import React, { useEffect, useState } from 'react'

import EditorTitle from '../components/EditorComponents/CardComponents/EditorTitle';
import MenuEditorTitle from '../components/EditorComponents/MenuComponents/MenuEditorTitle';
import AlbumEditorTitle from '../components/EditorComponents/GalleryComponents/AlbumEditorTitle';
import ImageSelector from '../components/EditorComponents/ImageFinderComponents/ImageSelector';

const BusinessEditorPage = ({turnOffDeployment, turnOffMenuDeployment, getBlockCard, getBlockMenu, editBlockCard, editBlockMenu, getAlbumItems, editAlbum, turnOffAlbumDeployment, editMenuSections, getBlockMenuSections, blocksArray}) => {

  let [closeImageSelector, setCloseImageSelector] = useState('hidden');
  let [currentSelectedImageTitle, setCurrentSelectedImageTitle] = useState('...');

  let [defaultImageHighlight, setDefaultImageHighlight] = useState('');

  let [editSelectedImageTitle, setEditSelectedImageTitle] = useState({
    sectionName: '',
    itemName: '',
    imageName: '',
    completeEdit: false
  });

  function resetEditSelectedImageTitle(){

    let reset = {
      sectionName: '',
      itemName: '',
      imageName: '',
      completeEdit: false
    };

    setEditSelectedImageTitle(reset);
  }
  
  let openImageSelector = (e, title, opener) => {
    e.preventDefault();
    setCloseImageSelector('');
    let openerValue = {
      sectionName: opener.sectionName,
      itemName: opener.itemName,
      imageName: '',
      completeEdit: false
    };
    
    setEditSelectedImageTitle(openerValue);
    setDefaultImageHighlight(title);
  }

  let hideImageSelector = (e) => {
    e.preventDefault();  
    setCloseImageSelector('hidden');
  }

  return (
    <>
      <ImageSelector closeImageSelector={closeImageSelector} hideImageSelector={hideImageSelector} getAlbumItems={getAlbumItems} blocksArray={blocksArray} setCurrentSelectedImageTitle={setCurrentSelectedImageTitle} defaultImageHighlight={defaultImageHighlight} editSelectedImageTitle={editSelectedImageTitle} setEditSelectedImageTitle={setEditSelectedImageTitle}/>
      <EditorTitle turnOffDeployment={turnOffDeployment} getBlockCard={getBlockCard} editBlockCard={editBlockCard} />
      <MenuEditorTitle getBlockMenu={getBlockMenu} editBlockMenu={editBlockMenu} turnOffMenuDeployment={turnOffMenuDeployment} editMenuSections={editMenuSections} getBlockMenuSections={getBlockMenuSections} openImageSelector={openImageSelector} currentSelectedImageTitle={currentSelectedImageTitle} setCurrentSelectedImageTitle={setCurrentSelectedImageTitle} editSelectedImageTitle={editSelectedImageTitle} resetEditSelectedImageTitle={resetEditSelectedImageTitle}/>
      <AlbumEditorTitle getAlbumItems={getAlbumItems} editAlbum={editAlbum} turnOffAlbumDeployment={turnOffAlbumDeployment} />
    </>
  )
}

export default BusinessEditorPage;

/*
<div className={`fixed w-full top-auto h-96 flex flex-row justify-center ${closeImageSelector}`}>
<div className='fixed flex flex-col justify-start z-20 w-120 h-96 bg-gray-300 border border-gray-800 shadow-2xl'>
  
  <div className='flex flex-row justify-between w-full h-14 bg-gray-300'>
    <div className='flex flex-col justify-center ml-2'>
      <h1 className='text-lg'>Select Image From Your Album</h1>
    </div>
    <IoMdClose onClick={(e) => {hideImageSelector(e)}} className="text-2xl mt-3 mr-3 text-gray-700 cursor-pointer"/>
  </div>
  <div className='w-full h-68 bg-gray-100 border-x-8 border-gray-300 overflow-y-auto'>
    {insertAlbumItems()}
  </div>
  <div className='flex flex-row justify-center items-center w-full h-12 bg-gray-300'>
    <button type="button" className='h-10 w-20 bg-green-700 rounded-sm text-white'>Select</button>
  </div>
</div>
</div>
*/

/*
function insertAlbumItems(){
  let arr = [];
  let albumItems = getAlbumItems();
  if(albumItems === null || albumItems.deployed === false || albumItems.album.length === 0){
    arr.push(
      <div className='flex flex-row justify-center h-40 w-full mt-1'>
        <h1 className='text-lg text-red-500'>No Deployed Photos Found</h1> 
      </div>
    );
    return arr;
  }
  let albumArray = albumItems.album;
  let size = albumArray.length;
  let i = 0;
  let limit = 3;
  let inRow = 0;

  while(i < size){
    let arr2 = [];
    while(inRow < limit && i < size){
      arr2.push(
        <div className='flex flex-col justify-start ml-4 h-full w-32'>
          <div className='w-full h-28 cursor-pointer'>
            <img className='h-full w-full object-contain' src={albumArray[i].image} alt="Selected Image"></img>
          </div>
          <div className='w-full flex flex-row justify-center flex-wrap h-10 mt-1 text-sm'>{albumArray[i].title}</div>
        </div>
      );
      inRow++;
      i++;
    }
    if(inRow > 0){
      arr.push(
        <div className='flex flex-row justify-start mt-1 mb-1 w-full h-40'>
          {arr2}
        </div>
      );
    }

    inRow = 0;
    
  }
  return arr;
}
*/
