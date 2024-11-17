import React, { useEffect, useState } from 'react';
//import MenuItemEditor from '../MenuItemEditor';
import BusinessMenuItem from './BusinessMenuItem';
import { GridLoader } from 'react-spinners';


const MenuContainer = ({currentSectionItems, currentSectionTitle, editMenuArrayItem, deleteMenuArrayItem, openImageSelector, editSelectedImageTitle, resetEditSelectedImageTitle}) => {

    let [itemsEdited, setItemsEdited] = useState([]);
    let [sectionName, setSectionName] = useState('');
    //let [containerPanel, setContainerPanel] = useState([]);
    //let [containerAnimation, setContainerAnimation] = useState('');

    useEffect(() => {

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

            /*
            setContainerAnimation('animate-shrinkMenuContainer');
            setTimeout(() => {
                setContainerAnimation('animate-expandMenuContainer'); 
            }, 4500);
            */

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

    }, [currentSectionItems, currentSectionTitle]);
    

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

            console.log(currentSectionItems[i]);

            arr.push(
                <div id={`item${i}`} key={`item${i}`} className={`bg-indigo-300 border border-black flex flex-col justify-start w-full h-auto text-lg mt-1 mb-2`} >
                    <BusinessMenuItem sectionName={sectionName} name={currentSectionItems[i].itemName} price={currentSectionItems[i].itemPrice} description={currentSectionItems[i].itemDescription} image={currentSectionItems[i].itemPicture} index={i} editorOpen={editorOpen} expandSize={expandSize} shrinkSize={shrinkSize} editMenuArrayItem={editMenuArrayItem} deleteMenuArrayItem={deleteMenuArrayItem} deleteFromItemsEdited={deleteFromItemsEdited} openImageSelector={openImageSelector} editSelectedImageTitle={editSelectedImageTitle} resetEditSelectedImageTitle={resetEditSelectedImageTitle}/>
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


    return ( 
        <div className='flex flex-row justify-center w-full mt-5 mb-10'>
            <div className='flex flex-col justify-start w-105'>
                <div id="menuContainer" className={`flex flex-col justify-start h-190 max-h-190 overflow-y-auto w-full bg-indigo-100`}>
                    {<div>{addToContainer()}</div>}
                </div>
            </div>
        </div>
    )
}

export default MenuContainer




/*
function mouseDownDragElement(e){
e.preventDefault();
console.log("Here in mouse down drag!");
pos1 = e.clientY;
console.log(pos1);
console.log(e.currentTarget);
console.log(e.currentTarget.getAttribute("ystart"));
}

function mouseUpDragElement(e){
e.preventDefault();
console.log("Here in mouse up drag!");
console.log(pos1);
console.log(e.currentTarget);
console.log(e.currentTarget.getAttribute("ystart"));
}

function mouseMoveDragElement(e){
e.preventDefault();
console.log("Here in mouse move drag!");
}

let dragMouseDown = (e) => {
e.preventDefault();
pos2 = e.clientX;
document.onmouseup = closeDragElement;
}

let closeDragElement = (e) => {

}

let recordSection = (e) => {
e.preventDefault();
getElementYPosition(e);

}

function getElementYPosition(e) {
let element = document.getElementById('menuContainer');
let rect = element.getBoundingClientRect();
let y = Math.floor(rect.top + window.scrollY);
console.log(y);
let clickY = Math.floor(e.clientY + window.scrollY);
let offset = clickY - y;
console.log(offset);
let sectionLocation = Math.ceil(offset/96) - 1;
console.log(sectionLocation);   
}
*/

