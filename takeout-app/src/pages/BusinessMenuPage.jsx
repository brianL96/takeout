import React, { useEffect, useState } from 'react';

import {useParams} from 'react-router-dom';
import ClientNavbar from '../components/MenuPageComponents/ClientNavbar';
import ClientMenuContainer from '../components/MenuPageComponents/ClientMenuContainer';
import ClientHorizontalAlbum from '../components/MenuPageComponents/ClientHorizontalAlbum';


const BusinessMenuPage = ({getMenuFromID, addItemToClientCart, getAlbumItemsWithID, currentFilterList, loginUsername}) => {



  let {id} = useParams();
  let menuFromID = getMenuFromID(id);
  let menuArray = menuFromID.menu;

  let businessName = (menuFromID.businessName === null) ? "Not Availiable" : menuFromID.businessName;

  let [albumArray, setAlbumArray] = useState([]);
  let [foundSections, setFoundSections] = useState([]);
  let [notFoundFilterList, setNotFoundFilterList] = useState([]);
  let [menuHighlightList, setMenuHighlightList] = useState([]);

  let [compressedMargin, setCompressedMargin] = useState('mt-40');

  console.log("Before useEffect inside BusinessMenuPage");

  useEffect(() => {

    console.log("Inside useEffect inside BusinessMenuPage");

    let album = getAlbumItemsWithID(id);
    setAlbumArray([...album]);

    let highlightList = [];
    let foundFilters = [];
    let sectionFoundValues = [];
    
    let outerIndex = 0;
    let outerSize = ((menuArray === null) ? 0 : menuArray.length);
    while(outerIndex < outerSize){
        sectionFoundValues.push(false);
        menuArray[outerIndex].items.map((x) => {
            highlightList.push(false);
        });
        outerIndex++;
    }
    
    currentFilterList.map((x) => {

        let details = checkFilterItem(x);
        if(details.found){
            foundFilters.push(true);
            details.foundIndexes.map((x2) => {
                highlightList[x2] = true;
            });
            details.foundSections.map((sectionFound, sectionIndex) => {
                sectionFoundValues[sectionIndex] = sectionFound;
            });
        }
        else{
            foundFilters.push(false);
        }
    });

    setNotFoundFilterList([...foundFilters]);
    setMenuHighlightList([...highlightList]);
    setFoundSections([...sectionFoundValues]);

    if(loginUsername !== undefined && loginUsername !== null & loginUsername.length > 0){
      setCompressedMargin('mt-56');
    }
    else{
      setCompressedMargin('mt-40');
    }
    
  }, [loginUsername]);

  function removePunctuationCheck(filterWord, word){

    let size = word.length;

    if(size > 1){
      if(filterWord === word.slice(0, size - 1)){
        return true;
      }
    }

    if(size > 2){
      if('(' === word.charAt(0) && ')' === word.charAt(size - 1) && filterWord === word.slice(1, size - 1)){
        return true;
      }
    }

    return false;

}

function checkFilterMatch(filterItem, itemName, itemDescription){

    let filterSentence = filterItem.toLowerCase().split(" ");
    let nameSentence = itemName.toLowerCase().split(" ");
    
    let nameLength = nameSentence.length;
    let nameIndex = 0;

    if(nameLength > 0 && nameSentence[0] !== ""){

      while(nameIndex < nameLength){

        if(nameSentence[nameIndex] === filterSentence[0] || removePunctuationCheck(filterSentence[0], nameSentence[nameIndex])){

          let filterLength = filterSentence.length;
          let filterIndex = 1;
          let copyNameIndex = nameIndex + 1;
          let nameMatch = true;
          while((filterIndex < filterLength) && (copyNameIndex < nameLength)){
            if(nameSentence[copyNameIndex] !== filterSentence[filterIndex]){
              if(removePunctuationCheck(filterSentence[filterIndex], nameSentence[copyNameIndex]) === false){
                nameMatch = false;
                break;
              }
            }
            filterIndex++;
            copyNameIndex++;
          }

          if(nameMatch){
            return true;
          }

        }
        nameIndex++;
     }

    }

    let descriptionSentence = itemDescription.toLowerCase().split(" ");
    let descriptionLength = descriptionSentence.length;
    let descriptionIndex = 0;

    if(descriptionLength > 0 && descriptionSentence[0] !== ""){

      while(descriptionIndex < descriptionLength){

        if(descriptionSentence[descriptionIndex] === filterSentence[0] || removePunctuationCheck(filterSentence[0], descriptionSentence[descriptionIndex])){

          let filterLength = filterSentence.length;
          let filterIndex = 1;
          let copyDescriptionIndex = descriptionIndex + 1;
          let descriptionMatch = true;
          while((filterIndex < filterLength) && (copyDescriptionIndex < descriptionLength)){
            if(descriptionSentence[copyDescriptionIndex] !== filterSentence[filterIndex]){
              if(removePunctuationCheck(filterSentence[filterIndex], descriptionSentence[copyDescriptionIndex]) === false){
                descriptionMatch = false;
                break;
              }
            }
            filterIndex++;
            copyDescriptionIndex++;
          }

          if(descriptionMatch){
            return true;
          }

        }
        descriptionIndex++;
     }
     
    }
    
}


function checkFilterItem(filterItem){

    let returnValue = {
        found: false,
        foundIndexes: [],
        foundSections: []
    };

    if(menuArray === undefined || menuArray === null){
        return returnValue;
    }

    let i = 0;

    menuArray.map((section, sectionIndex) => {

        returnValue.foundSections.push(false);

        section.items.map((menuItem) => {
            //if(menuItem.itemName.toLowerCase().includes(filterItem.toLowerCase())){
            if(checkFilterMatch(filterItem, menuItem.itemName, menuItem.itemDescription)){
                returnValue.found = true;
                returnValue.foundIndexes.push(i);
                returnValue.foundSections[sectionIndex] = true;
            }
            i++;
        });
    });

    return returnValue;

}


  return (
    <div className='mb-40'>
      <ClientNavbar menuArray={menuArray} businessName={businessName} foundSections={foundSections} loginUsername={loginUsername}/>
      <div className={`w-full screen180:mt-40 ${compressedMargin}`}></div>
        <ClientHorizontalAlbum albumArray={albumArray}/>
        <ClientMenuContainer menuArray={menuArray} addItemToClientCart={addItemToClientCart} businessName={businessName} currentFilterList={currentFilterList} albumArray={albumArray} notFoundFilterList={notFoundFilterList} menuHighlightList={menuHighlightList}/>
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