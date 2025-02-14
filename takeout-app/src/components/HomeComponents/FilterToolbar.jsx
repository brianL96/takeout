import React, { useEffect, useState } from 'react'
import { IoAddCircle } from 'react-icons/io5';
import { TiDelete } from 'react-icons/ti';


const FilterToolbar = ({printFilterItems, setFilteredGuide, currentFilterList, setCurrentFilterList}) => {

  let [itemName, setItemName] = useState('');
  let [filterList, setFilterList] = useState([]);

  useEffect(() => {
    setFilterList([...currentFilterList]);
    autoActivateFilter();
  }, [currentFilterList]);

  function getFilterList(){
    let arr = [];
    filterList.map((x, index) => {
      arr.push(
      <div key={index} className='flex flex-row justify-start items-center h-10 w-full border-b border-gray-400'>
        <div className='flex flex-nowrap flex-row justify-start items-center h-full w-5/6 overflow-x-auto'>
          <h1 className='pl-4 whitespace-nowrap'>{`${x}`}</h1>
        </div>
        <div className='flex flex-row justify-center items-center h-full w-1/6 border-l border-black'>
          <TiDelete index={index} onClick = {(e) => {deleteFromFilterList(e)}} className='text-3xl text-red-700 cursor-pointer'/>
        </div>
      </div>
    )});
    return arr;
  }

  function autoActivateFilter(){
    if(currentFilterList.length === 0){
      return;
    }
    let arr = currentFilterList;
    let filterGuide = printFilterItems([...arr]);
    setFilteredGuide(filterGuide);
  }

  let addToFilterList = (e) => {
    e.preventDefault();
    if(itemName.length === 0){
      return;
    }
    let arr = filterList;
    setFilterList([...arr, itemName]);
    setItemName('');
  }

  let deleteFromFilterList = (e) => {

    e.preventDefault();

    let deleteIndex = parseInt(e.currentTarget.getAttribute('index'));

    let size = filterList.length;

    let array = []; 
  
    if(deleteIndex === 0){
      if(size > 1){
        array = [...filterList.slice(1)];
      }
      else{
        array = [];
      }
    }
    else{
      array = [...filterList.slice(0, deleteIndex), ...filterList.slice(deleteIndex+1)]
    }

    setFilterList([...array]);
  
  }

  let activateFilter = (e) => {
    e.preventDefault();
    let arr = filterList;
    let filterGuide = printFilterItems([...arr]);
    setCurrentFilterList([...arr]);
    setFilteredGuide(filterGuide);
  }

  

  return (
    <div className='flex flex-row justify-center w-full min-w-120 screen216:h-40 h-80 screen180:mt-5 mt-8'>
      
        <div className='flex screen216:flex-row flex-col justify-start screen216:w-216 min-w-120 screen216:h-40 h-80 border-2 border-gray-300'>

          <div className='flex flex-col justify-start h-full screen216:w-72 w-120'>
            <div className='flex flex-col justify-center h-12 w-full'>
              <h1 className='ml-2 text-lg'>What are you looking for?</h1>
            </div>
            <div className='flex flex-row justify-start w-full h-12'>
              <input type="text" required value={itemName} onChange={(e) => setItemName(e.target.value)} id="item_name" className="mb-2 h-10 w-60 ml-2 pl-1 mt-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter item" />
              <button type="button" onClick={(e) => {addToFilterList(e)}} className="flex flex-row justify-center items-center h-10 w-12 mx-0 mt-3 text-base text-white bg-green-700"><IoAddCircle className='text-white text-2xl'/></button>
            </div>
            <div className='flex flex-row items-center w-full h-16'>
              <button type="button" onClick={(e) => {activateFilter(e)}} className="h-10 w-32 ml-2 text-base text-white bg-slate-600">Sort Businesses</button>
            </div>
          </div>

          <div className='flex flex-col justify-start h-full w-120 screen216:w-144'>
            <div className='flex flex-row justify-center items-center h-8 w-full'>
              <h1 className='text-sm'>Search List:</h1>
            </div>
            <div className='flex flex-row justify-center w-full h-28'>
              <div className='h-27 screen216:w-120 w-110 bg-gray-100 overflow-y-auto border border-gray-400'>
                {getFilterList()}
              </div>
            </div>
          </div>
          
        </div>
        

      
    </div>
  )
}

export default FilterToolbar