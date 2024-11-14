import React, { useEffect, useState } from 'react'

const MenuSectionContainer = ({bigClientArray, setCurrentSectionTitle}) => {

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
    sectionArrayList.map((x) => {
      /*
      if(useColor){
        bgColor = colorArray[index];
      }
      */
      arr.push(
        <div className='flex flex-row justify-center w-full h-auto'>
          <div value={x.name} onClick={(e) => {changeSection(e)}} className={`flex flex-row justify-between items-center bg-amber-500 border border-amber-700 h-10 w-98 mt-1 mb-1 cursor-pointer`}>
            <h1 className='text-base ml-2'>{`${x.name}`}</h1>
            <h1 className='text-base mr-2'>{`${x.amount} item(s)`}</h1>
          </div>
        </div>
      )
    });
    
    return arr;
  }

  return (
    <div className='flex flex-row justify-center w-100 h-auto bg-orange-200 border-x border-b border-black'>
      <form className='flex flex-col justify-start w-100'>
        {}
        <div id="menuContainer" className='flex flex-col justify-start h-56 max-h-72 overflow-y-auto w-full'>
            {<div>{populateContainer()}</div>}
        </div>
      </form>
    </div>
  )
}

export default MenuSectionContainer