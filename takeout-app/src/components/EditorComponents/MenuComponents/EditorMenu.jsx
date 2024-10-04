import React, { useState, useEffect } from 'react'
import MenuContainer from './MenuContainer';
import {FaDollarSign} from 'react-icons/fa6';
import { CiSaveDown1 } from 'react-icons/ci';
import {TiDelete} from "react-icons/ti";


const EditorMenu = ({bigClientArray, addMenuItem, editMenuItem, deleteMenuItem, currentSectionTitle, openImageSelector, currentSelectedImageTitle, setCurrentSelectedImageTitle}) => {

  let [itemName, setItemName] = useState('');
  let [itemPrice, setItemPrice] = useState('');
  let [itemDescription, setItemDescription] = useState('');
  let [sectionTitle, setSectionTitle] = useState(currentSectionTitle);
  let [showImageTitleDelete, setShowImageTitleDelete] = useState('hidden');

  let [currentSectionItems, setCurrentSectionItems] = useState([]);

  useEffect(() => {

    setSectionTitle(currentSectionTitle);

    if(bigClientArray === undefined || bigClientArray === null || currentSectionTitle === undefined || currentSectionTitle === null || currentSectionTitle === ''){
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

    if(found === false){
      return;
    }

    setCurrentSectionItems([...bigClientArray[i].items]);

    if(currentSelectedImageTitle === '...'){
      setShowImageTitleDelete('hidden');
    }
    else{
      setShowImageTitleDelete('');
    }

  }, [bigClientArray, currentSectionTitle, currentSelectedImageTitle]);


let addItem = (e) => {

    e.preventDefault();

    if(getSectionTitle() === 'No Section Selected: Cannot Add Items'){
      console.log("Cannot add item without first selecting a section");
      return;
    }
    
    let itemObject = {itemName, itemPrice, itemDescription, itemPicture: currentSelectedImageTitle};
    addMenuItem(itemObject);
    setItemName('');
    setItemPrice('');
    setItemDescription('');
    setCurrentSelectedImageTitle('...');
}

let resetImageSelected = (e) => {
  e.preventDefault();
  setCurrentSelectedImageTitle('...');
}

let editMenuArrayItem = (e, newName, newPrice, newImage, newDescription) => {
  e.preventDefault();
  let i = parseInt(e.target.value);
  editMenuItem(i, newName, newPrice, newImage, newDescription);
}

let deleteMenuArrayItem = (e) => {
  e.preventDefault();
  let i = parseInt(e.currentTarget.value);
  deleteMenuItem(i);
}


function getSectionTitle(){

  if(sectionTitle === undefined || sectionTitle === null || sectionTitle === ''){
    return 'No Section Selected: Cannot Add Items';
  }
  return `Add Item To ${sectionTitle}`;

}

  return (
    <div className='flex flex-col w-full mt-0 screen216:mt-5'>

      <div className='flex flex-row justify-center w-full mt-0 screen216:mt-5'>

        <form onSubmit={addItem} className='flex flex-col justify-start h-92 w-105 bg-indigo-200 border border-black'>

          <div className='flex flex-row justify-center h-7 w-full bg-indigo-400'>
            <h1>{getSectionTitle()}</h1>
          </div>

          <div className="flex flex-row justify-start items-center h-16 w-full"> 
            <input type="text" required value={itemName} onChange={(e) => setItemName(e.target.value)} id="itemName" className="w-3/4 h-11 ml-3 mt-2 mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Item Name" />
          </div>

          <div className='flex flex-row justify-start items-center h-16 w-full'>
            <FaDollarSign className='text-green-700'/>
            <input type="text" required value={itemPrice} onChange={(e) => setItemPrice(e.target.value)} id="itemPrice" className="w-1/4 h-11 mb-2 mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Price" />
          </div>

          <div className='w-full h-16 flex flex-row justify-start items-center'> 
            <button type="button" onClick={(e) => {openImageSelector(e, currentSelectedImageTitle)}} className='ml-4 rounded h-11 w-26 bg-slate-500 text-white'>Add Picture</button>
            <div className='flex flex-row justify-start items-center rounded ml-1 h-11 w-56 bg-gray-700 border border-gray-800'>
              <h1 className='ml-1 text-white text-sm'>{currentSelectedImageTitle}</h1>
            </div>
            <div className='flex flex-row justify-center items-center h-11 w-8'>
              <TiDelete onClick={(e) => resetImageSelected(e)} className={`text-4xl text-red-700 cursor-pointer ${showImageTitleDelete}`}/>
            </div>
          </div>

          <div className="flex flex-row justify-start items-center h-24 w-full">  
            <textarea id="itemDescription" value={itemDescription} onChange={(e) => setItemDescription(e.target.value)}  className="rounded-md w-4/5 h-4/5 ml-4 border border-black p-1" placeholder='Item Description (Optional)'></textarea>
          </div>
            
          <div className='flex flex-row justify-center items-center h-11 w-full'>
            <button className="flex flex-row justify-center items-center h-8 w-16 text-2xl rounded-md text-white bg-green-700"><CiSaveDown1/></button>
          </div>
         
        </form>



      </div>

      <MenuContainer currentSectionItems={currentSectionItems} currentSectionTitle={currentSectionTitle} editMenuArrayItem={editMenuArrayItem} deleteMenuArrayItem={deleteMenuArrayItem} openImageSelector={openImageSelector}/>
    </div>
  )
}

export default EditorMenu;
