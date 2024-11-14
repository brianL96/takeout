import React, { useEffect, useState } from 'react';

import {useParams} from 'react-router-dom';
import ClientNavbar from '../components/MenuPageComponents/ClientNavbar';
import ClientMenuContainer from '../components/MenuPageComponents/ClientMenuContainer';
import ClientHorizontalAlbum from '../components/MenuPageComponents/ClientHorizontalAlbum';


const BusinessMenuPage = ({getMenuFromID, addItemToClientCart, getAlbumItemsWithID, currentFilterList}) => {


  let [albumArray, setAlbumArray] = useState([]);
  let {id} = useParams();
  let menuFromID = getMenuFromID(id);
  let menuArray = menuFromID.menu;

  let businessName = (menuFromID.businessName === null) ? "Not Availiable" : menuFromID.businessName;

  useEffect(() => {

    let album = getAlbumItemsWithID(id);
    //setAlbumLength(album.length);
    setAlbumArray([...album]);
    
  }, [])



  return (
    <div className='mb-40'>
      <ClientNavbar menuArray={menuArray} currentFilterList={currentFilterList} businessName={businessName}/>
      <div className="w-full mt-40"></div>
      <ClientHorizontalAlbum albumArray={albumArray}/>
      <ClientMenuContainer menuArray={menuArray} addItemToClientCart={addItemToClientCart} businessName={businessName} currentFilterList={currentFilterList} albumArray={albumArray}/>
    </div>
  )
}

export default BusinessMenuPage

/*
<div className="flex flex-row justify-center items-center w-full mt-36 h-24  mb-20">
<h1 className='text-4xl font-medium'>{businessName}</h1>
</div>
*/

/*
import { MdCancel } from "react-icons/md";
import { FaArrowAltCircleRight } from 'react-icons/fa';
import { FaArrowAltCircleLeft } from 'react-icons/fa';
*/

/*
let [hiddenPlayer, setHiddenPlayer] = useState('hidden');
let [playerTitle, setPlayerTitle] = useState('');
let [playerImage, setPlayerImage] = useState('#');
let [playerIndex, setPlayerIndex] = useState(-1);
let [albumLength, setAlbumLength] = useState(-1);
*/

/*
<div className={`flex flex-col fixed h-full w-full bg-black mt-0 opacity-95 z-20 ${hiddenPlayer}`}>
<div className='flex flex-row justify-start items-center h-11 w-full mt-0 mb-0'>
  <MdCancel onClick={(e) => {turnOffPlayer(e)}} className='ml-5 text-white text-2xl cursor-pointer'/>
</div>

<div className='flex flex-row justify-center w-full h-14'>
  <div className='flex flex-row justify-center items-center w-96 h-full text-white text-2xl'>
    {playerTitle}
  </div>
</div>

<div className='flex flex-row justify-center items-center w-full h-108'>
  <div className='w-96 h-96 bg-white'>
    <img className='h-full w-full object-contain' src={playerImage} alt="Selected Image"></img>
  </div>
</div>

<div className='flex flex-row justify-center items-center w-full h-12 mt-0 mb-0'>
  <div className='flex flex-row justify-start w-144 h-full'>
    <div className='flex flex-row justify-center items-center w-24 h-full text-4xl text-white'>
      <FaArrowAltCircleLeft onClick={(e) => {backPlayerIndex(e)}} className='cursor-pointer'/>
    </div>
    <div className='flex flex-row justify-center items-center text-white w-96 h-full text-xl'>
      {`${playerIndex + 1}/${albumLength}`}
    </div>
    <div className='flex flex-row justify-center items-center w-24 h-full text-4xl text-white'>
      <FaArrowAltCircleRight onClick={(e) => {forwardPlayerIndex(e)}} className='cursor-pointer'/>
    </div>
  </div>
</div>

</div>

*/

/*

let turnOnPlayer = (e) => {
  e.preventDefault();
  setHiddenPlayer('');
  let pictureIndex = parseInt(e.currentTarget.getAttribute('value'));
  setPlayerIndex(pictureIndex);
  let album = getAlbumItemsWithID(id);
  setPlayerTitle(album[pictureIndex].title);
  setPlayerImage(album[pictureIndex].image);
}

let forwardPlayerIndex = (e) => {
  e.preventDefault();
  let album = getAlbumItemsWithID(id);
  let newIndex = -1;
  if(playerIndex !== -1 && (playerIndex + 1) < album.length){
    newIndex = playerIndex + 1;
    setPlayerIndex(newIndex);
    setPlayerTitle(album[newIndex].title);
    setPlayerImage(album[newIndex].image);
  }
}

let backPlayerIndex = (e) => {
  e.preventDefault();
  let album = getAlbumItemsWithID(id);
  let newIndex = -1;
  if(playerIndex !== -1 && (playerIndex - 1) >= 0){
    newIndex = playerIndex - 1;
    setPlayerIndex(newIndex);
    setPlayerTitle(album[newIndex].title);
    setPlayerImage(album[newIndex].image);
  }
}

let turnOffPlayer = (e) => {
  e.preventDefault();
  setHiddenPlayer('hidden');
}

*/