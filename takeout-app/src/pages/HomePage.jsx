import React, { useEffect, useState } from 'react'

import Home from '../components/HomeComponents/Home';
import HomeCycler from '../components/HomeComponents/HomeCycler';
import FilterToolbar from '../components/HomeComponents/FilterToolbar';

const HomePage = ({blocksArray, printBoth, printFilterItems, currentFilterList, setCurrentFilterList}) => {

  let [filteredGuide, setFilteredGuide] = useState([]);
  let [currentSection, setCurrentSection] = useState(0);
  let [limitNumber, setLimitNumber] = useState(0);

  printBoth();

  useEffect(() => {

    console.log("Calling the useEffect in HomePage:");
    
    let count = 0;

    blocksArray.map((x) => {
      if(x.deployed){
        count++;
      }
    });
    
    setLimitNumber(count);

  }, [blocksArray]);
  
  return (
    <>
      <FilterToolbar printFilterItems={printFilterItems} setFilteredGuide={setFilteredGuide} currentFilterList={currentFilterList} setCurrentFilterList={setCurrentFilterList}/>
      <HomeCycler setCurrentSection={setCurrentSection} limitNumber={limitNumber}/>
      <Home blocksArray={blocksArray} filteredGuide={filteredGuide} currentSection={currentSection}/>
    </>
  )
}

export default HomePage