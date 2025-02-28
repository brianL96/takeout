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

