import React, { useEffect, useState } from 'react';
//import MenuItemEditor from '../MenuItemEditor';
import BusinessMenuItem from './BusinessMenuItem';
import {FaAngleDown} from "react-icons/fa";
import { FaAngleUp } from 'react-icons/fa';



const MenuContainer = ({bigClientArray, currentSectionTitle, editMenuItem, deleteMenuItem, openImageSelector, editSelectedImageTitle, resetEditSelectedImageTitle, checkPriceFormat}) => {

    let [itemsEdited, setItemsEdited] = useState([]);
    let [sectionName, setSectionName] = useState('');
    //let [containerPanel, setContainerPanel] = useState([]);


    let [currentSectionItems, setCurrentSectionItems] = useState([]);

    let [arrowPosition, setArrowPosition] = useState('down');
    let [currentAnimation, setCurrentAnimation] = useState('');

    useEffect(() => {

        if(bigClientArray === undefined || bigClientArray === null || currentSectionTitle === undefined || currentSectionTitle === null){
            return;
        }
      
        let bigArrayIndex = 0;
        let bigArraySize = bigClientArray.length;
        let bigArrayFound = false;
      
        while(bigArrayIndex < bigArraySize){
            if(currentSectionTitle === bigClientArray[bigArrayIndex].name){
              bigArrayFound = true;
              break;
            }
            bigArrayIndex++;
        }

        if(bigArrayFound === false){
            setCurrentSectionItems([]);
            return;
        }
      
        setCurrentSectionItems([...bigClientArray[bigArrayIndex].items]);

        if(currentSectionItems === undefined || currentSectionItems === null){
            return;
        }
        
        
        let arr = [];

        if(currentSectionTitle !== sectionName){
            
            currentSectionItems.map((x) => {
                arr.push('base');
            });
            setItemsEdited([...arr]);
            setSectionName(currentSectionTitle);
            
            return;
        }

        let clientMenuSize = currentSectionItems.length;
        let itemsEditedSize = itemsEdited.length;
       
        if(itemsEditedSize >= clientMenuSize){
            return;
        }

        let amount = clientMenuSize - itemsEditedSize;
        let i = 0;
        
        while(i < amount){
            //'base' or 'editorOpen'
            arr.push('base');
            i++;
        }

        let temp = [...itemsEdited];
        setItemsEdited([...temp, ...arr]);
        

    }, [bigClientArray, currentSectionTitle]);


    let editMenuArrayItem = (e, newName, newPrice, newImage, newDescription) => {
        e.preventDefault();
        let i = parseInt(e.target.value);
        return editMenuItem(i, newName, newPrice, newImage, newDescription);
    }
    

    let deleteMenuArrayItem = (e) => {
        e.preventDefault();
        let i = parseInt(e.currentTarget.value);
        deleteMenuItem(i);
    }

    function addToContainer() {

        if(currentSectionItems === null || currentSectionItems.length === 0){
            return [];
        }

        let size = currentSectionItems.length;
        let i = 0;
        let arr = [];
        let editorOpen = false;
        
        while (i < size) {
            if(itemsEdited[i] === 'editorOpen'){
                editorOpen = true;
            }

            //console.log(currentSectionItems[i]);

            arr.push(
                <div key={`key-BusinessMenuItemContainer-${sectionName}-${currentSectionItems[i].itemName}`} id={`item${i}`} className={`bg-indigo-300 border border-black flex flex-col justify-start w-full h-auto text-lg mt-1 mb-2`} >
                    <BusinessMenuItem sectionName={sectionName} name={currentSectionItems[i].itemName} price={currentSectionItems[i].itemPrice} description={currentSectionItems[i].itemDescription} image={currentSectionItems[i].itemPicture} index={i} editorOpen={editorOpen} expandSize={expandSize} shrinkSize={shrinkSize} editMenuArrayItem={editMenuArrayItem} deleteMenuArrayItem={deleteMenuArrayItem} deleteFromItemsEdited={deleteFromItemsEdited} openImageSelector={openImageSelector} editSelectedImageTitle={editSelectedImageTitle} resetEditSelectedImageTitle={resetEditSelectedImageTitle} checkPriceFormat={checkPriceFormat} />
                </div>
            )
            i++;
            editorOpen = false;
        }

        return arr;
    }


    let expandSize = (e) => {
        e.preventDefault();
        let targetIndex = parseInt(e.currentTarget.value);
        let arr = [...itemsEdited];
        arr[targetIndex] = 'editorOpen';
        setItemsEdited([...arr]);
    }

    let shrinkSize = (e) => {
        e.preventDefault();
        let targetIndex = parseInt(e.currentTarget.value);
        let arr = [...itemsEdited];
        arr[targetIndex] = 'base';
        setItemsEdited([...arr]);
    }

    let deleteFromItemsEdited = (e) => {
        e.preventDefault();
        let targetIndex = parseInt(e.currentTarget.value);
        let temp = null;
        if(itemsEdited.length <= 1){
            setItemsEdited([]);
            return;
        }

        if(targetIndex === 0){
            temp = [...itemsEdited];
            setItemsEdited([...temp.slice(1)]);
            return;
        }

        temp = [...itemsEdited];
        setItemsEdited([...temp.slice(0, targetIndex), ...temp.slice(targetIndex + 1)]);
    }

    let downAnimation = (e) => {
        e.preventDefault();
        setArrowPosition('up');
        setCurrentAnimation('animate-expandMenuContainer')
    }

    let upAnimation = (e) => {
        e.preventDefault();
        setArrowPosition('down');
        setCurrentAnimation('animate-shrinkMenuContainer')
    }

    function getBottom(){
        if(arrowPosition === 'down'){
            return [
                <FaAngleDown key={'key-ArrowDown'} className='text-2xl cursor-pointer' onClick ={(e) => {downAnimation(e)}}/>
            ];
        }
        else if(arrowPosition === 'up'){
            return [
                <FaAngleUp key={'key-ArrowUp'} className='text-2xl cursor-pointer' onClick ={(e) => {upAnimation(e)}}/>
            ];
        }
    }



    return ( 
        <div className='flex flex-row justify-center w-108 screen216:w-102 mt-6 screen216:mt-2 mb-10'>
            <div className='flex flex-col justify-start w-full'>
                <div className='flex flex-row justify-center items-center w-full h-7 bg-gray-200 my-0 border border-gray-400'>
                    {(currentSectionTitle.length > 25) ? currentSectionTitle.substring(0, 25) + '...' : currentSectionTitle}
                </div>
                <div id="menuContainer" className={`flex flex-col justify-start h-80 max-h-160 overflow-y-auto w-full bg-indigo-100 ${currentAnimation}`}>
                    {<div>{addToContainer()}</div>}
                </div>
                <div className='flex flex-row justify-center items-center w-full h-10 bg-gray-200 my-0 border border-gray-400'>
                    {getBottom()}
                </div>
            </div>
        </div>
    )
}

export default MenuContainer


