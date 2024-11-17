import React, { useEffect } from 'react'
import { useState } from 'react';
import HorizontalAlbum from './HorizontalAlbum';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';

const EditorAlbum = ({getAlbumItems, editAlbum, turnOffAlbumDeployment, setDeployedStatusMessage, editedWarning, setEditedWarningMessage}) => { 

  let [newAlbumImage, setNewAlbumImage] = useState('#');
  let [pictureTitle, setPictureTitle] = useState('');
  let [pictureArray, setPictureArray] = useState([]);
  let [deployedStatus, setDeployedStatus] = useState(false);

  
  useEffect(() => {
    let albumItems = getAlbumItems();
    if(albumItems !== null){
      setPictureArray([...albumItems.album]);
      setDeployedStatus(albumItems.deployed);
      if(albumItems.deployed){
        setDeployedStatusMessage('true');
      }
      else{
        setDeployedStatusMessage('false');
      }
    }
    if(albumItems === null){
      setDeployedStatusMessage('null');
    }
    
  }, []);
  

  function getLocalAlbumItems(){
    return [...pictureArray];
  }

  let filePicked = (e) => {

    let file = e.target.files[0];
    if(file){
        let reader = new FileReader();
        reader.onload = (readerEvent) => {
            setNewAlbumImage(readerEvent.target.result);
        };
        reader.readAsDataURL(file);
    }

  }

  let addPicture = (e) => {
    e.preventDefault();
    let temp = newAlbumImage;
    let arr = pictureArray;
    setPictureArray([...arr, {title: pictureTitle, image: temp}]);
    setPictureTitle('');
    setNewAlbumImage('#');
    checkEditedWarning();

    let fileChooser = document.querySelector("#photo-dropzone");
    fileChooser.value = '';
  }


  function removeAlbumItem(deleteIndex){

    let oldList = [...pictureArray];
    let newList = null;
    let size = oldList.length;

    if(deleteIndex === 0){
      if(size > 1){
        newList = [...oldList.slice(1)];
      }
      else{
        newList = [];
      }
    }
    else{
      newList = [...oldList.slice(0, deleteIndex), ...oldList.slice(deleteIndex + 1)]
    }

    setPictureArray([...newList]);
    checkEditedWarning();

  }

  let deployAlbum = (e) => {
    e.preventDefault();
    let success = editAlbum(pictureArray);
    if(success){
      setDeployedStatus(true);
      setDeployedStatusMessage('true');
      if(editedWarning === ''){
        setEditedWarningMessage('hidden');
    }
    }
  }

  let rescind = (e) => {
    e.preventDefault();
    turnOffAlbumDeployment();
    setDeployedStatus(false);
    setDeployedStatusMessage('false');
}

  function getDeployedBar(){

    return (
        <div className='flex flex-row justify-start w-105 screen216:w-210 screen216:min-w-210 border-x border-t border-black'>
            <div className='flex flex-row justify-center items-center w-1/2'>
                <IoIosCheckmarkCircleOutline className='text-green-600' size='36'/>
                <h2 className='text-green-600 text-lg'> - Deployed</h2>
            </div>
            <div className='flex flex-row justify-around items-center w-1/2'>
                <button type="button" onClick={(e) => deployAlbum(e)} className="h-10 w-20 rounded-md text-white bg-slate-600">Update</button>
                <button type="button" onClick={(e) => rescind(e)} className="h-10 w-20 rounded-md text-white bg-slate-600">Rescind</button>
            </div>
        </div>
    );
  }

  function getUndeployedBar(){
    
    return (
        <div className='flex flex-row justify-center items-center w-105 screen216:w-210 screen216:min-w-210 border-x border-t border-black'>
            <button type="button" onClick={(e) => deployAlbum(e)} className="h-10 w-20 rounded-md text-white bg-slate-600">Deploy</button>
        </div>    
    );

  }

  function setCardEditorBase(){
    if(deployedStatus){
        return getDeployedBar();
    }
    return getUndeployedBar();
  }

  function checkEditedWarning(){
    if(editedWarning === 'hidden'){
        setEditedWarningMessage('');
    }
  }

  return (

    <div className='flex flex-col justify-start w-full h-176 mt-12 mb-48'>

      <form onSubmit={addPicture} className='flex flex-row justify-center w-full h-103'>
        <div className='flex flex-row justify-center items-center h-103 w-105 screen216:w-210 screen216:min-w-210'>
          <div className='flex flex-col justify-start items-center h-full w-105 border border-black'>
            <div className='flex flex-row justify-center items-center w-full h-7 bg-purple-400'>
              <h1>Add Photo To Gallery</h1>
            </div>
            <div className='bg-purple-200 w-full h-16'> 
              <input type="text" required value={pictureTitle} onChange={(e) => setPictureTitle(e.target.value)} id="pictureName" className="mt-2 mb-2 ml-2 h-12 w-2/3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Title" />
            </div>
            <div className='flex flex-col justify-center bg-purple-200 w-full h-14'>
              <input className='ml-2' id='photo-dropzone' type='file' onChange={(e) => filePicked(e)}/> 
            </div>
            <div className='bg-gray-200 w-full h-52'>
              <img className='h-full w-full object-contain' id="preview-new-album-image" src={newAlbumImage} alt="Selected Image"></img>
            </div>
            <div className='bg-purple-200 w-full h-14 flex flex-row justify-center items-center'>
              <button className="h-8 w-24 text-base rounded-md text-white bg-slate-600">Add Picture</button>
            </div>
          </div>
        </div>
      </form>

      <div className='flex flex-col justify-start w-full h-auto mt-9'>
        <div className='flex flex-row justify-center w-full h-12'>
          {setCardEditorBase()}
        </div>
        <div className='flex flex-row justify-center w-full h-64'>
          <div className='flex flex-row justify-center w-105 screen216:w-210 screen216:min-w-210 h-64'>
            <HorizontalAlbum getLocalAlbumItems={getLocalAlbumItems} removeAlbumItem={removeAlbumItem} />
          </div>
        </div>
      </div>

    </div>
  )
}

export default EditorAlbum
