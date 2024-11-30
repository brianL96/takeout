import React, { useEffect, useState } from 'react'
import ImageSelectorItem from './ImageSelectorItem';
import { IoMdClose } from 'react-icons/io';

const ImageSelector = ({closeImageSelector, hideImageSelector, getAlbumItems, blocksArray, setCurrentSelectedImageTitle, defaultImageHighlight, editSelectedImageTitle, setEditSelectedImageTitle}) => {

    let [borderArray, setBorderArray] = useState([]);
    let [selectedIndex, setSelectedIndex] = useState(-1);
    let [opener, setOpener] = useState({sectionName: null, itemName: null});

    useEffect(() => {
      let albumItems = getAlbumItems();
      
      if(albumItems === null || albumItems.deployed === false || albumItems.album.length === 0){
        return;
      }

      let arr = [];
      let albumArray = albumItems.album;

      let highlight = 0;

      albumArray.map((x, index) => {
        arr.push('');
        if(x.title === defaultImageHighlight){
          highlight = index;
        }
      });

      //console.log("Default Image Highlight:");
      //console.log(defaultImageHighlight);
      
      arr[highlight] = 'border-2 border-blue-500';
      setBorderArray([...arr]);
      setSelectedIndex(highlight);

      let openerInfo = {
        sectionName: editSelectedImageTitle.sectionName,
        itemName: editSelectedImageTitle.itemName
      };

      setOpener(openerInfo);

    }, [blocksArray, defaultImageHighlight, editSelectedImageTitle]);

    let changeSelectedIndex = (e) => {

      e.preventDefault();

      let arr = [...borderArray];
      let newIndex = parseInt(e.currentTarget.getAttribute("value"));

      if(selectedIndex !== -1){
        arr[selectedIndex] = '';
      }
      if(newIndex === -1){
        return;
      }

      arr[newIndex] = 'border-2 border-blue-500';
      setBorderArray([...arr]);
      setSelectedIndex(newIndex);

    }

    let printSelectedItem = (e) => {

      e.preventDefault();

      let albumItems = getAlbumItems();
      
      if(albumItems === null || albumItems.deployed === false || albumItems.album.length === 0 || selectedIndex === -1 || selectedIndex > albumItems.album.length){
        return;
      }

      //console.log(`This is the item selected:`);
      //console.log(albumItems.album[selectedIndex].title);

      let selectedTitle = albumItems.album[selectedIndex].title;

      if(opener.sectionName === null && opener.itemName === null){
        setCurrentSelectedImageTitle(selectedTitle);
      }
      else{

        let openerValue = {
          sectionName: opener.sectionName,
          itemName: opener.itemName,
          imageName: selectedTitle,
          completeEdit: true
        };

        setEditSelectedImageTitle(openerValue);

      }

      hideImageSelector(e);

    }

    function insertAlbumItems(){
        let arr = [];
        let albumItems = getAlbumItems();
        if(albumItems === null || albumItems.deployed === false || albumItems.album.length === 0){
          arr.push(
            <div className='flex flex-row justify-center h-40 w-full mt-1'>
              <h1 className='text-lg text-red-500'>No Deployed Photos Found</h1> 
            </div>
          );
          return arr;
        }
        let albumArray = albumItems.album;
        let size = albumArray.length;
        let useBorderArray = false;
        if(borderArray.length === size){
          useBorderArray = true;
        }
        let i = 0;
        let limit = 3;
        let inRow = 0;
    
        while(i < size){
          let arr2 = [];
          
          
          while(inRow < limit && i < size){

            let squareBorder = (useBorderArray) ? borderArray[i] : '';
            
            arr2.push(
              <ImageSelectorItem squareImage={albumArray[i].image} squareTitle={albumArray[i].title} squareBorder={squareBorder} squareIndex={i} changeSelectedIndex={changeSelectedIndex}/>
            );
            inRow++;
            i++;
          }
          if(inRow > 0){
            arr.push(
              <div className='flex flex-row justify-start mt-1 mb-1 w-full min-h-40 h-auto'>
                {arr2}
              </div>
            );
          }
    
          inRow = 0;
          
        }
        return arr;
      }


    
  return (
    <div className={`fixed w-full top-auto h-96 flex flex-row justify-center ${closeImageSelector}`}>
        <div className='fixed flex flex-col justify-start z-20 w-120 h-96 bg-gray-300 border border-gray-800 shadow-2xl'>
            <div className='flex flex-row justify-between w-full h-14 bg-gray-300'>
                <div className='flex flex-col justify-center ml-2'>
                    <h1 className='text-lg'>Select Image From Your Album</h1>
                </div>
                <IoMdClose onClick={(e) => {hideImageSelector(e)}} className="text-2xl mt-3 mr-3 text-gray-700 cursor-pointer"/>
            </div>
            <div className='w-full h-68 bg-gray-100 border-x-8 border-gray-300 overflow-y-auto'>
                {insertAlbumItems()}
            </div>
            <div className='flex flex-row justify-center items-center w-full h-12 bg-gray-300'>
                <button type="button" onClick={(e) => {printSelectedItem(e)}} className='h-10 w-20 bg-green-700 rounded-sm text-white'>Select</button>
            </div>
        </div>
    </div>
  )
}

export default ImageSelector

/*
<div className='flex flex-col justify-start ml-4 h-full w-32'>
<div className='w-full h-28 cursor-pointer'>
  <img className='h-full w-full object-contain' src={albumArray[i].image} alt="Selected Image"></img>
</div>
<div className='w-full flex flex-row justify-center flex-wrap h-10 mt-1 text-sm'>{albumArray[i].title}</div>
</div>
*/