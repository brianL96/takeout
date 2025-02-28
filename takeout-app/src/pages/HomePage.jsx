import React, { useEffect, useState } from 'react'

import Home from '../components/HomeComponents/Home';
import HomeCycler from '../components/HomeComponents/HomeCycler';
import FilterToolbar from '../components/HomeComponents/FilterToolbar';
import InfoBar from '../components/HomeComponents/InfoBar';

const HomePage = ({blocksArray, printBoth, printFilterItems, currentFilterList, setCurrentFilterList, loginUsername}) => {

  let [filteredGuide, setFilteredGuide] = useState([]);
  let [currentSection, setCurrentSection] = useState(0);
  let [limitNumber, setLimitNumber] = useState(0);

  //printBoth();

  useEffect(() => {
    
    let count = 0;

    blocksArray.map((x) => {
      if(x.deployed){
        count++;
      }
    });
    
    setLimitNumber(count);

  }, [blocksArray]);
  
  return (
    <div className='mb-40'>
      <InfoBar loginUsername={loginUsername}/>
      <FilterToolbar printFilterItems={printFilterItems} setFilteredGuide={setFilteredGuide} currentFilterList={currentFilterList} setCurrentFilterList={setCurrentFilterList}/>
      <HomeCycler setCurrentSection={setCurrentSection} limitNumber={limitNumber}/>
      <Home blocksArray={blocksArray} filteredGuide={filteredGuide} currentSection={currentSection}/>
    </div>
  )
}

export default HomePage