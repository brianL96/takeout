import React, { useEffect, useState } from 'react'
import ClientAlbumItem from './ClientAlbumItem';

import {FaArrowCircleLeft} from "react-icons/fa";
import { FaArrowCircleRight} from 'react-icons/fa';


const ClientHorizontalAlbum = ({albumArray}) => {

let [highlightArray, setHighlightArray] = useState([]);
let [selectedImage, setSelectedImage] = useState('');
let [selectedImageTitle, setSelectedImageTitle] = useState('');
let [selectedImageIndex, setSelectedImageIndex] = useState(-1);

useEffect(() => {

  if(albumArray === undefined || albumArray === null){
    return;
  }

  let highlights = albumArray.map(() => 'border border-purple-400');

  if(albumArray.length > 0){
    setSelectedImage(albumArray[0].image);
    setSelectedImageTitle(albumArray[0].title);
    setSelectedImageIndex(0);
    highlights[0] = 'border-2 border-purple-500';
  }

  setHighlightArray([...highlights]);

}, [albumArray]);

function getRatio(){

  if(albumArray === undefined || albumArray === undefined || albumArray.length === 0 || selectedImageIndex === -1){
    return '';
  }

  let length = albumArray.length;
  let num = selectedImageIndex + 1;
  return `${num}/${length}`;

}


let changeHighlight = (e) => {

  e.preventDefault();

  let newIndex = parseInt(e.currentTarget.getAttribute('value'));
  if(newIndex === selectedImageIndex){
    return;
  }

  let arr = highlightArray.map((x, index) => index === newIndex ? 'border-2 border-purple-500' : 'border border-purple-400');
  setSelectedImageIndex(newIndex);
  setSelectedImage(albumArray[newIndex].image);
  setSelectedImageTitle(albumArray[newIndex].title);
  setHighlightArray([...arr]);
}

function scrollToPicture(index){
  let selectedElement = document.querySelector(`#item-${index}`);
  if(selectedElement !== undefined && selectedElement !== null){
    selectedElement.scrollIntoView({
      behavior: "smooth",
      inline: 'center',
      block: 'nearest'
    });
  }
}

let shiftLeft = (e) => {
  e.preventDefault();

  let newIndex = selectedImageIndex;

  if(newIndex === -1 || newIndex === 0){
    return;
  }

  newIndex = newIndex - 1;
  scrollToPicture(newIndex);

  let arr = highlightArray.map((x, index) => index === newIndex ? 'border-2 border-purple-500' : 'border border-purple-400');
  setSelectedImageIndex(newIndex);
  setSelectedImage(albumArray[newIndex].image);
  setSelectedImageTitle(albumArray[newIndex].title);
  setHighlightArray([...arr]);
}

let shiftRight = (e) => {

  e.preventDefault();

  let newIndex = selectedImageIndex;

  if(newIndex === -1 || newIndex >= (albumArray.length - 1)){
    return;
  }

  newIndex = newIndex + 1;
  scrollToPicture(newIndex);
  let arr = highlightArray.map((x, index) => index === newIndex ? 'border-2 border-purple-500' : 'border border-purple-400');
  setSelectedImageIndex(newIndex);
  setSelectedImage(albumArray[newIndex].image);
  setSelectedImageTitle(albumArray[newIndex].title);
  setHighlightArray([...arr]);
}

function getAmountOfSlots(){
  
  let length = albumArray.length;
  
  if(length === 0){
    return [];
  }

  let arr = [];
  let index = 0;
  let borderHighlight = 'border border-purple-400';
  let checkHighlight = false;
  if(highlightArray.length === albumArray.length){
    checkHighlight = true;
  }
    while(index < length){
      if(checkHighlight){
        borderHighlight = highlightArray[index];
      }
      arr.push(<ClientAlbumItem imageSRC={albumArray[index].image} index={index} highlight={borderHighlight} changeHighlight={changeHighlight} />);
      index++;
    }
    
    return [
      <div className='flex flex-col justify-center h-auto w-full mt-8 mb-10'>

        <div className='flex flex-row justify-center w-full h-12'>
          <div className='flex flex-row justify-center screen216:justify-start h-full w-100 screen216:w-216'>
            <div className='flex flex-col justify-center h-full w-auto border-b-2 border-black'>
              <h1 className='text-2xl px-2'>Gallery</h1>
            </div>
          </div>
        </div>

        <div className='flex flex-col justify-start items-center h-100 w-full mt-10'>

          <div className='bg-gray-200 flex flex-row justify-center w-100 screen160:w-160 h-10 border-x border-t border-black'>
            <div className='flex flex-row justify-center items-center w-full h-full'>
              <h1 className='text-lg'>{(selectedImageTitle.length > 36) ? selectedImageTitle.substring(0, 36) + '...' : selectedImageTitle}</h1>
            </div>
          </div>

          <div className='bg-gray-100 flex flex-row justify-start w-100 screen160:w-160 h-90 border border-black'>
            <div className='flex flex-row justify-center items-center w-16 h-80 absolute z-10'>
              <FaArrowCircleLeft onClick={(e) => {shiftLeft(e)}} className='text-2xl cursor-pointer'/>
            </div>
            <div className='flex flex-row justify-center items-center ml-84 screen160:ml-144 w-16 h-80 absolute z-10'>
              <FaArrowCircleRight onClick={(e) => {shiftRight(e)}} className='text-2xl cursor-pointer'/>
            </div>

            <div className='flex flex-row justify-center items-center ml-68 screen160:ml-128 w-32 mt-80 h-8 absolute z-10 bg-purple-600'>
              <h1 className='text-white text-lg'>{getRatio()}</h1>
            </div>

            <div className='w-full h-full'>
              <img className='h-full w-full object-contain' id="preview-new-album-image" src={selectedImage} alt="Selected Image"></img>
            </div>
          </div>

        </div>

        <div className='flex flex-row justify-center h-auto w-full mt-1 mb-10'>
          <div className='flex flex-row justify-start bg-gray-100 h-28 w-100 screen160:w-160 overflow-x-auto'>
            {[...arr]}
          </div>
        </div>

      </div>
    ];
  }

  return (
    <>
      {getAmountOfSlots()}
    </>
  )
}

export default ClientHorizontalAlbum
