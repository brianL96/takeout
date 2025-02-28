import React, { useEffect, useState } from 'react';
import HomeCyclerNumber from './HomeCyclerNumber';
import { BsArrowLeft} from 'react-icons/bs';
import { BsArrowRight } from 'react-icons/bs';

const HomeCycler = ({setCurrentSection, limitNumber}) => {

  let [selectedIndex, setSelectedIndex] = useState(0);
  let [numbersDisplay, setNumbersDisplay] = useState([1, 2, 3, 4, 5]);
  let [lastSectionNumber, setLastSectionNumber] = useState(5);
  let [lastIndex, setLastIndex] = useState(4);

  useEffect(() => {

    //console.log("Calling the useEffect in HomeCycler");
    
    let start = 0;
    let limit = limitNumber;
    let perPage = 6;

    while(limit > 0){
      limit = limit - perPage;
      start++;
    }
    
    //console.log(`This is the limitNumber: ${limitNumber}`);
    //console.log(`This is the amount of sections: ${start}`);
    setLastSectionNumber(start);

    let newLast = start - 1;

    if(start < 5){
      //console.log("Start is less than 5");
      if(start === 0){
        setLastIndex(0);
      }
      else{
        setLastIndex(newLast);
      } 
    }
    else{
      setLastIndex(4);
    }

  }, [limitNumber]);

  let changeSelectedIndex = (e) => {

    e.preventDefault();
    let value = parseInt(e.target.getAttribute("value"));
    if(value !== selectedIndex){
      setSelectedIndex(value);
    }
    setCurrentSection(numbersDisplay[value] - 1);

  }

  function getFormattedNumbers(){

    let i = 0;
    let size = numbersDisplay.length;
    let arr = [];

    while(i < size){
      
      let selected = false;

      if(numbersDisplay[i] > lastSectionNumber){
        i++;
        continue;
      }

      if(i === selectedIndex){
        selected = true;
      }

      arr.push(<HomeCyclerNumber key={`HomeCyclerNumber-${i+1}`} number={numbersDisplay[i]} selected={selected} index={i} changeSelectedIndex={changeSelectedIndex}/>);

      i++;
    }

    return arr;
  }

  function shiftNumbers(shiftType){

    let arr = [];

    if(shiftType === 'left'){
      if(numbersDisplay[0] <= 1){
        return;
      }
      numbersDisplay.map((x) => {
        arr.push(x - 1);
      });
      setCurrentSection(arr[0] - 1);
    }
    else if(shiftType === 'right'){

      if(numbersDisplay[lastIndex] >= lastSectionNumber){
        return;
      }
      
      numbersDisplay.map((x) => {
        arr.push(x + 1);
      });
      setCurrentSection(arr[4] - 1);
    }

    setNumbersDisplay([...arr]);
  }

  let leftIndex = (e) => {

    e.preventDefault();
    let index = selectedIndex;

    if(index < 0){
      return;
    }
    else if(index === 0){
      shiftNumbers('left');
      return;
    }

    index--;
    setSelectedIndex(index);
    setCurrentSection(numbersDisplay[index] - 1);

  }

  let rightIndex = (e) => {

    e.preventDefault();

    let index = selectedIndex;
    //console.log(`This is the selectedIndex: ${selectedIndex}`);
    //console.log(`This is the lastIndex: ${lastIndex}`);

    if(index > 4){
      //console.log("Right Clicked: returning");
      return;
    }
    else if(index === lastIndex){
      //console.log("Right Clicked: going to shift right");
      shiftNumbers('right');
      return;
    }

    //console.log("Right Clicked: just moving indexes");

    index++;
    setSelectedIndex(index);
    setCurrentSection(numbersDisplay[index] - 1);
    
  }

  return (
    <div className='flex flex-row justify-center w-full min-w-120 h-15 mt-5'>
      <div className='flex flex-row justify-center items-center w-full h-full'>
        <BsArrowLeft onClick={(e) => {leftIndex(e)}} className='text-3xl cursor-pointer mt-1'/>
        {getFormattedNumbers()}
        <h1 className='ml-3'>...</h1>
        <BsArrowRight onClick={(e) => {rightIndex(e)}} className='text-3xl cursor-pointer mt-1 ml-5'/>
      </div>
    </div>
  )
}

export default HomeCycler