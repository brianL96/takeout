import React, { useState, useEffect } from 'react'
import MenuContainer from './MenuContainer';
import {FaDollarSign} from 'react-icons/fa6';
import { CiSaveDown1 } from 'react-icons/ci';
import {TiDelete} from "react-icons/ti";
import { MdAddCircle } from 'react-icons/md';


const EditorMenu = ({bigClientArray, addMenuItem, currentSectionTitle, openImageSelector, currentSelectedImageTitle, setCurrentSelectedImageTitle, checkPriceFormat}) => {

  let [itemName, setItemName] = useState('');
  let [itemPrice, setItemPrice] = useState('');
  let [itemDescription, setItemDescription] = useState('');
  let [sectionTitle, setSectionTitle] = useState(currentSectionTitle);
  let [showImageTitleDelete, setShowImageTitleDelete] = useState('hidden');

  //let [currentSectionItems, setCurrentSectionItems] = useState([]);

  let [itemNameError, setItemNameError] = useState(''); 
  let [itemNameBorder, setItemNameBorder] = useState('border-gray-500');
  let [itemPriceError, setItemPriceError] = useState(''); 
  let [itemPriceBorder, setItemPriceBorder] = useState('border-gray-500');
  let [errorContainerSize, setErrorContainerSize] = useState('');


  function removeItemNameError(){
      if(itemNameError.length > 0){
        setItemNameError('');
        setItemNameBorder('border-gray-500');
        setErrorContainerSize('');
      }
    }
  
  function addItemNameError(error){
      setItemNameError(error);
      setItemNameBorder('border-red-500');
      setErrorContainerSize('min-h-8');
  }

  function removeItemPriceError(){
    if(itemPriceError.length > 0){
      setItemPriceError('');
      setItemPriceBorder('border-gray-500');
      setErrorContainerSize('');
    }
  }

  function addItemPriceError(error){
    if(error === ""){
      return;
    }
    setItemPriceError(error);
    setItemPriceBorder('border-red-500');
    setErrorContainerSize('min-h-8');
  }

  useEffect(() => {

    setSectionTitle(currentSectionTitle);

    if(bigClientArray === undefined || bigClientArray === null || currentSectionTitle === undefined || currentSectionTitle === null){
      return;
    }

    let i = 0;
    let size = bigClientArray.length;
    let found = false;

    while(i < size){
      if(currentSectionTitle === bigClientArray[i].name){
        found = true;
        break;
      }
      i++;
    }

    if(currentSelectedImageTitle === '...'){
      setShowImageTitleDelete('hidden');
    }
    else{
      setShowImageTitleDelete('');
    }

    /*
    if(found === false){
      setCurrentSectionItems([]);
      return;
    }

    setCurrentSectionItems([...bigClientArray[i].items]);
    */


  }, [bigClientArray, currentSectionTitle, currentSelectedImageTitle]);


let addItem = (e) => {

    e.preventDefault();

    let requirementError = false;

    if(itemName.length === 0){
      addItemNameError('Required');
      requirementError = true;
    }
    else{
      removeItemNameError();
    }

    if(itemPrice.length === 0){
      addItemPriceError('Required');
      requirementError = true;
    }
    else{
      removeItemPriceError();
    }

    if(requirementError){
      return;
    }

    if(getSectionTitle() === 'No Section Selected: Cannot Add Items'){
      //console.log("Cannot add item without first selecting a section");
      addItemNameError('No Section Selected: Cannot Add Items');
      return;
    }
    
    let itemObject = {itemName, itemPrice, itemDescription, itemPicture: currentSelectedImageTitle};
    let value = addMenuItem(itemObject);
    if(value === false){
      //console.log("Name must be unique within a section.");
      addItemNameError("Name must be unique within a section.");
      return;
    }

    removeItemNameError();
    setItemName('');
    setItemPrice('');
    setItemDescription('');
    setCurrentSelectedImageTitle('...');
}

let resetImageSelected = (e) => {
  e.preventDefault();
  setCurrentSelectedImageTitle('...');
}



function getSectionTitle(){

  if(sectionTitle === undefined || sectionTitle === null || sectionTitle === ''){
    return 'No Section Selected: Cannot Add Items';
  }
  
  let value = (sectionTitle.length > 20) ? sectionTitle.substring(0, 20) + '...' : sectionTitle;

  return `Add To ${value}`;

}


function checkPrice(value){

  let check = checkPriceFormat(value);
  
  if(check.correct === false){
    addItemPriceError(check.message);
    return;
  }

  setItemPrice(value);
  removeItemPriceError();

}

  return (
    <div className='flex flex-col w-full mt-3 mb-6 min-h-66 h-auto'>

      <div className='flex flex-row justify-center screen216:justify-start w-full h-auto'>

        <form onSubmit={addItem} className='flex flex-col justify-start min-h-66 h-auto w-100 bg-indigo-200 border border-black'>

          <div className='flex flex-row justify-center h-7 w-full bg-indigo-400'>
            <h1>{getSectionTitle()}</h1>
          </div>

          <div className='flex flex-row justify-start w-full h-16'>

            <div className="flex flex-row justify-start items-center h-16 w-70"> 
              <input type="text" value={itemName} onChange={(e) => setItemName(e.target.value)} id="itemName" className={`ml-2 border ${itemNameBorder} bg-gray-100 text-gray-900 placeholder:text-gray-500 text-sm rounded-lg w-68 h-10 p-2.5`} placeholder="Enter Item Name" />
            </div>

            <div className='flex flex-row justify-start items-center h-16 w-28'>
              <FaDollarSign className='text-green-700 ml-1'/>
              <input type="text" value={itemPrice} onChange={(e) => checkPrice(e.target.value)} id="itemPrice" className={`border ${itemPriceBorder} bg-gray-100 text-gray-900 placeholder:text-gray-500 text-sm rounded-lg w-22 h-10 p-2.5`} placeholder="Enter Price" />
            </div>

          </div>

          <div className={`flex flex-row justify-start w-full h-auto ${errorContainerSize}`}>
            <div className='h-auto w-70'>
              <h3 className='pl-3 text-red-600'>{itemNameError}</h3>
            </div>
            <div className='h-auto w-28'>
              <h3 className='pl-6 text-red-600'>{itemPriceError}</h3>
            </div>
          </div>


          <div className='w-full h-16 flex flex-row justify-start items-center'> 
            <button type="button" onClick={(e) => {openImageSelector(e, currentSelectedImageTitle, {sectionName: null, itemName: null,})}} className='ml-2 rounded h-10 w-26 bg-slate-500 text-white'>Add Picture</button>
            <div className='flex flex-row justify-start items-center rounded ml-1 h-10 w-56 bg-gray-700 border border-gray-800'>
              <h1 className='ml-1 text-white text-sm'>{(currentSelectedImageTitle.length > 15) ? currentSelectedImageTitle.substring(0, 15) + "..." : currentSelectedImageTitle}</h1>
            </div>
            <div className='flex flex-row justify-center items-center h-10 w-8'>
              <TiDelete onClick={(e) => resetImageSelected(e)} className={`text-4xl text-red-700 cursor-pointer ${showImageTitleDelete}`}/>
            </div>
          </div>

          <div className='flex flex-row justify-start h-24 w-100'>
            <div className="flex flex-row justify-start items-center h-24 w-84 ml-2">  
              <textarea id="itemDescription" value={itemDescription} onChange={(e) => setItemDescription(e.target.value)}  className="rounded-md w-84 h-20 border border-black p-1" placeholder='Item Description (Optional)'></textarea>
            </div>
            
            <div className='flex flex-row justify-center items-center h-24 w-14'>
              <button className="flex flex-row justify-center items-center h-12 w-12 text-5xl rounded-sm text-green-700"><MdAddCircle/></button>
            </div>
          </div>
         
        </form>



      </div>

      
    </div>
  )
}

export default EditorMenu;
