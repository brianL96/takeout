import React, { useState, useEffect } from 'react'

const ClientNavbar = ({menuArray, businessName, foundSections, loginUsername}) => {

  let [sectionList, setSectionList] = useState([]);
  let [highlightList, setHighlightList] = useState([]);
  let [businessTitle, setBusinessTitle] = useState('');
  let [topPosition, setTopPosition] = useState('top-18');

    useEffect(() => {

      if(businessName !== undefined && businessName !== null){
        setBusinessTitle(businessName);
      }

      let arr = [];
      let highlightArr = [];
      /*
      let itemsIndex = 0;
      let itemsSize = 0;
      let filterIndex = 0;
      let filterSize = 0;
      let foundFilterItem = false;
      */
      
      if(menuArray === undefined || menuArray === null){
        return;
      }

      menuArray.map((section) => {
        arr.push(section.name);
      });

      foundSections.map((found) => {
        highlightArr.push(found);
      });
      
      /*
      menuArray.map((section, sectionIndex) => {

        arr.push(section.name);
        highlightArr.push(false);
        itemsIndex = 0;
        itemsSize = section.items.length;
        

        while (itemsIndex < itemsSize){

          let sectionObject = section.items[itemsIndex];
          foundFilterItem = false;
          filterIndex = 0;
          filterSize = currentFilterList.length;

          while(filterIndex < filterSize){
            let filterItem = currentFilterList[filterIndex];
            if(sectionObject.itemName.toLowerCase().includes(filterItem.toLowerCase())){
              foundFilterItem = true;
              break;
            }
            filterIndex++;
          }

          if(foundFilterItem){
            highlightArr[sectionIndex] = true;
            break;
          }

          itemsIndex++;

        }

      });
      */

      //console.log("Look here for the highlight array:");
      //console.log(highlightArr);
      
      setSectionList([...arr]);
      setHighlightList([...highlightArr]);

      if(loginUsername !== undefined && loginUsername !== null && loginUsername.length > 0){
        setTopPosition('top-33');
      }
      else{
        setTopPosition('top-18');
      }

    }, [menuArray, businessName, foundSections, loginUsername]);


    function moveToSpot(e, sectionid){
      e.preventDefault();
      //console.log("Move To Spot Clicked");
      //console.log(`|${sectionid.replaceAll(' ', '-')}|`);
      //let element = document.querySelector(`#${sectionid.replaceAll(' ', '-').replaceAll('/', '-').replaceAll('\', '-'').replaceAll('(', '-').replaceAll(')', '-')}`);
      let element = document.querySelector(`#${CSS.escape(sectionid)}`);
      if(element !== undefined && element !== null){
        element.scrollIntoView({block:'start', behavior:'smooth'});
      }
      else{
        console.log("Problem finding section header");
        console.log(element);
      }

    }

    
    function addNavButtons(){
      let arr = [];
      let checkColor = false;
      if(sectionList.length === highlightList.length){
        checkColor = true;
      }
      sectionList.map((x, index) => {
        let bgColor = 'bg-slate-700 text-white';
        if(checkColor){
          if(highlightList[index]){
            bgColor = 'bg-amber-500';
          }
        }
        arr.push(
          <div className='flex flex-row justify-center items-center w-auto h-full'>
            <button type="button" onClick={(e) => {moveToSpot(e, x)}} className={`flex flex-row justify-center items-center flex-nowrap rounded w-auto h-8 ${bgColor} mx-5 px-5`}><h1 className='w-auto flex flex-row justify-start flex-nowrap whitespace-nowrap'>{x}</h1></button>
          </div>
        );
      });
      return arr;
    }
  


  return (
    <div className={`fixed screen180:top-14 ${topPosition} flex flex-col justify-start w-full min-h-24 h-auto bg-zinc-200 z-20`}>
      <div className={`w-full min-h-8 h-auto border-b border-black flex flex-row ${(businessTitle.length > 70) ? 'justify-start' : 'justify-center'} items-center overflow-x-auto overflow-y-hidden p-1`}>
        <h1 className='text-lg'>{businessTitle}</h1>
      </div>
      <div className='flex flex-row justify-start bg-zinc-300 border-b border-zinc-500 w-full h-16 overflow-x-auto'>
        {addNavButtons()}
      </div>
    </div>
  )
}

export default ClientNavbar