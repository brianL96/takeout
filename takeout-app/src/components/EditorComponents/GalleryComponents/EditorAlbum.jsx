import React, { useEffect } from 'react'
import { useState } from 'react';
import HorizontalAlbum from './HorizontalAlbum';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';

const EditorAlbum = ({getAlbumItems, editAlbum, turnOffAlbumDeployment, setDeployedStatusMessage, editedWarning, setEditedWarningMessage}) => { 

  let [newAlbumImage, setNewAlbumImage] = useState('#');
  let [pictureTitle, setPictureTitle] = useState('');
  let [pictureArray, setPictureArray] = useState([]);
  let [deployedStatus, setDeployedStatus] = useState(false);

  let [pictureTitleError, setPictureTitleError] = useState('');
  let [pictureTitleBorder, setPictureTitleBorder] = useState('border-gray-500');
  let [fileError, setFileError] = useState('');

  
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
  

  function removePictureTitleError(){
    if(pictureTitleError.length > 0){
      setPictureTitleError('');
      setPictureTitleBorder('border-gray-500');
    }
  }

  function addPictureTitleError(error){
    setPictureTitleError(error);
    setPictureTitleBorder('border-red-500');
  }

  function removeFileError(){
    if(fileError.length > 0){
      setFileError('');
    }
  }

  function addFileError(error){
    setFileError(error);
  }

  function getLocalAlbumItems(){
    return [...pictureArray];
  }

  function calculateAdjustment(startWidth, startHeight){

    let maxHeight = 480;
    let maxWidth = 480;
    let adjustment = 1;

    if(startWidth > startHeight){
      if(startWidth > maxWidth){
        adjustment = parseFloat((maxWidth/startWidth).toFixed(2));
      }
    }
    else if(startHeight > maxHeight){
      adjustment = parseFloat((maxHeight/startHeight).toFixed(2));
    }

    return adjustment;

  }

  let filePicked = (e) => {

    let file = e.target.files[0];

    if(file === undefined || file === null){
      return;
    }

    let fileType = file.type;
    console.log(fileType);
    if(fileType.length < 6 || fileType.substring(0, 6) !== 'image/'){
      //console.log("Bad image type");
      addFileError('Image file type only');
      let fileChooser = document.querySelector("#photo-dropzone");
      fileChooser.value = '';
      return;
    }
    else{
      removeFileError();
    }

  
    
    if(file){
        let reader = new FileReader();
        reader.onload = (readerEvent) => {
            //setNewAlbumImage(readerEvent.target.result);
            console.log(readerEvent.target.result.length);
            compressImage(readerEvent.target.result);

        };
        reader.readAsDataURL(file);
    }

  }

  function compressImage(fileData){

    let image = new Image();
    image.src = fileData;
      
    image.onload = () => {

      let adjustment = calculateAdjustment(image.width, image.height);
      let canvas = document.createElement('canvas');
      let canvasContext = canvas.getContext('2d');

      let adjustWidth = Math.round(image.width * adjustment);
      let adjustHeight = Math.round(image.height * adjustment);

      canvas.width = adjustWidth;
      canvas.height = adjustHeight;
      canvasContext.drawImage(image, 0, 0, adjustWidth, adjustHeight);
        
      console.log("Dimensions (Width then Height):");
      console.log(image.width);
      console.log(image.height);


      canvas.toBlob((blob) => {

        let reader = new FileReader();

        reader.onload = (readerEvent) => {
          console.log(readerEvent.target.result.length);
          printImageDimensions(readerEvent.target.result);
          setNewAlbumImage(readerEvent.target.result);
        };

        reader.readAsDataURL(blob);

      }, "image/jpeg");
    };
   
  }

  function printImageDimensions(imageURL){

    let img = new Image();
    img.src = imageURL;

    img.onload = () => {
      console.log("Dimensions (Width then Height):");
      console.log(img.width);
      console.log(img.height);
    };

  }

  let addPicture = (e) => {
    
    e.preventDefault();

    if(pictureTitle.length === 0){
      addPictureTitleError("Required");
      return;
    }
    else{
      removePictureTitleError();
    }

    if(newAlbumImage === '' || newAlbumImage === '#'){
      addFileError('No image selected');
      return;
    }
    else{
      removeFileError();
    }

    let temp = newAlbumImage;
    let arr = pictureArray;

    let copy = false;
    arr.map((picture) => {
      if(picture.title === pictureTitle){
        copy = true;
      }
    });

    if(copy){
      console.log("Picture name must be unique");
      addPictureTitleError("Picture name must be unique");
      return;
    }

    setPictureArray([...arr, {title: pictureTitle, image: temp}]);
    setPictureTitle('');
    removePictureTitleError();
    removeFileError();
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
        <div className='flex flex-row justify-start min-w-108 screen216:w-210 screen216:min-w-210 border-x border-t border-black'>
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

    <div className='flex flex-col justify-start w-full min-w-108 h-176 mt-12 mb-48'>

      <form onSubmit={addPicture} className='flex flex-row justify-center w-full h-auto min-h-105'>

        <div className='flex flex-row justify-center items-center h-auto min-h-105 w-105 screen216:w-210 screen216:min-w-210'>

          <div className='flex flex-col justify-start items-center h-full w-105 border border-black'>
            <div className='flex flex-row justify-center items-center w-full h-7 bg-purple-400'>
              <h1>Add Photo To Gallery</h1>
            </div>
            <div className='flex flex-row items-center bg-purple-200 w-full h-16'> 
              <input type="text" value={pictureTitle} onChange={(e) => setPictureTitle(e.target.value)} id="pictureName" className={`ml-2 border ${pictureTitleBorder} bg-gray-100 text-gray-900 placeholder:text-gray-500 text-sm rounded-lg w-72 p-2.5`} placeholder="Enter Title"/>
            </div>
            <div className='flex flex-row justify-start items-center w-full h-auto max-h-8 bg-purple-200'>
                <h3 className='pl-3 text-red-600'>{pictureTitleError}</h3>
            </div>
            <div className='flex flex-col justify-center bg-purple-200 w-full h-14'>
              <input className='ml-2 cursor-pointer' id='photo-dropzone' type='file' onChange={(e) => filePicked(e)}/> 
            </div>
            <div className='flex flex-row justify-start w-full h-auto max-h-8 bg-purple-200'>
                <h3 className='pl-3 text-red-600'>{fileError}</h3>
            </div>
            <div className='bg-gray-200 w-full h-52'>
              <img className='h-full w-full object-contain' id="preview-new-album-image" src={newAlbumImage} alt="Selected Image"></img>
            </div>
            <div className='bg-purple-200 w-full h-16 flex flex-row justify-center items-center'>
              <button className="h-8 w-24 text-base rounded-md text-white bg-slate-600">Add Picture</button>
            </div>
          </div>

        </div>

      </form>

      <div className='flex flex-col justify-start w-full min-w-108 h-auto mt-9'>
        <div className='flex flex-row justify-center w-full h-12'>
          {setCardEditorBase()}
        </div>
        <div className='flex flex-row justify-center w-full h-64'>
          <div className='flex flex-row justify-center min-w-105 screen216:w-210 screen216:min-w-210 h-64'>
            <HorizontalAlbum getLocalAlbumItems={getLocalAlbumItems} removeAlbumItem={removeAlbumItem} />
          </div>
        </div>
      </div>

    </div>
  )
}

export default EditorAlbum
