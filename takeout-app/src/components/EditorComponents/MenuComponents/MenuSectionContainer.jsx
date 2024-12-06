import React, { useEffect, useState } from 'react';
import { TiDelete } from 'react-icons/ti';
import { IoExpandOutline } from 'react-icons/io5';

const MenuSectionContainer = ({bigClientArray, setCurrentSectionTitle, deleteSection}) => {

  let [sectionArrayList, setSectionArrayList] = useState([]);
  //let [colorArray, setColorArray] = useState([]);

  useEffect(() => {

    if(bigClientArray === undefined || bigClientArray === null){
      return;
    }
    let arr = [];
    let arr2 = [];
    let i = 0; 
    let length = bigClientArray.length;

    while(i < length){
      let summary = {
        name: bigClientArray[i].name,
        amount : bigClientArray[i].items.length
      };
      //arr.push(bigClientArray[i].name);
      arr.push(summary);
      //arr2.push('bg-amber-500');
      i++;
    }

    /*
    if(arr2.length > 0){
      arr2[0] = 'bg-amber-300';
    }
    */

    setSectionArrayList([...arr]);
    //setColorArray([...arr2]);

  }, [bigClientArray]);

  let changeSection = (e) => {
    e.preventDefault();
    let newTitle = e.currentTarget.getAttribute('value');
    setCurrentSectionTitle(newTitle);
    /*
    let sectionIndex = parseInt(e.target.getAttribute('section-index'));
    changeBGColor(sectionIndex);
    */
  }

  let handleDeleteSection = (e) => {
    e.preventDefault();
    let deleteIndex = parseInt(e.currentTarget.getAttribute('index'));
    deleteSection(deleteIndex);
  }

  /*
  function changeBGColor(index){
    let arr = [];
    let i = 0;
    let length = sectionArrayList.length;
    while(i < length){
      arr.push('bg-amber-500');
      i++;
    }
    if(arr.length > index){
      arr[index] = 'bg-amber-300';
    }

    setColorArray([...arr]);
  }
  */

  function populateContainer(){
    
    let arr = [];
    /*
    let bgColor = 'bg-amber-500';
    let useColor = false;
    if(sectionArrayList.length === colorArray.length){
      useColor = true;
    }
    */
    sectionArrayList.map((x, index) => {
      /*
      if(useColor){
        bgColor = colorArray[index];
      }
      */
      arr.push(

        <div className='flex flex-row justify-center w-full h-auto'>

          <div className={`flex flex-row justify-start bg-amber-400 border border-amber-700 h-auto min-h-10 w-98 mt-1 mb-1`}>

            <div className='flex flex-row items-center w-10 h-10'> 
              <IoExpandOutline className='text-4xl text-green-700 cursor-pointer' value={x.name} onClick={(e) => {changeSection(e)}} />
            </div>
            <div className='flex flex-row items-center w-11 h-10'>
              <TiDelete className='text-4xl text-red-700 cursor-pointer' index={index} onClick={(e) => {handleDeleteSection(e)}}/>
            </div>
            <div className='flex flex-row justify-center items-center w-52 h-auto min-h-10'>
              <div className='h-auto w-auto max-w-52 break-words text-wrap overflow-visible'>
                <h1 className='text-base px-1'>{`${x.name}`}</h1>
              </div>
            </div>
            <div className='flex flex-row justify-center items-center w-22 h-10'>
              <h1 className='text-base'>{`${x.amount} item(s)`}</h1>
            </div>

          </div>

        </div>
      )
    });
    
    return arr;
  }

  return (
    <div className='flex flex-row justify-center w-100 h-36 bg-orange-200 border-x border-b border-black'>
      <div id="menuContainer" className='flex flex-col justify-start h-36 max-h-36 overflow-y-auto w-full'>
        {<div>{populateContainer()}</div>}
      </div>
    </div>
  )
}

export default MenuSectionContainer