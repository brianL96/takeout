import React, { useEffect, useState } from 'react'

import { FaShoppingCart } from 'react-icons/fa';

const ClientMenuContainer = ({menuArray, addItemToClientCart, businessName, currentFilterList, albumArray}) => {

    let [notFoundFilterList, setNotFoundFilterList] = useState([]);
    let [menuHighlightList, setMenuHighlightList] = useState([]);
    let [pictures, setPictures] = useState([]);

    useEffect(() => {

        //you do have to cycle through all the menu items for the filter items, otherwise
        //a filter item may show up as unmatched, because an earlier filter item in the list matched instead

        let highlightList = [];
        let foundFilters = [];
        
        let outerIndex = 0;
        let outerSize = ((menuArray === null) ? 0 : menuArray.length);
        while(outerIndex < outerSize){
            menuArray[outerIndex].items.map((x) => {
                highlightList.push(false);
            });
            outerIndex++;
        }
        
        currentFilterList.map((x) => {
            let details = checkFilterItem(x);
            if(details.found){
                foundFilters.push(true);
                details.foundIndexes.map((x2) => {
                    highlightList[x2] = true;
                })
            }
            else{
                foundFilters.push(false);
            }
        });

        setNotFoundFilterList([...foundFilters]);
        setMenuHighlightList([...highlightList]);
        setPictures([...albumArray]);

    }, [menuArray, currentFilterList, albumArray]);

    function checkFilterItem(filterItem){

        let returnValue = {
            found: false,
            foundIndexes: []
        };

        if(menuArray === undefined || menuArray === null){
            return returnValue;
        }

        let i = 0;

        menuArray.map((x) => {
            x.items.map((x2) => {
                if(x2.itemName.toLowerCase().includes(filterItem.toLowerCase())){
                    returnValue.found = true;
                    returnValue.foundIndexes.push(i);
                }
                i++;
            });
        });

        return returnValue;

    }

    function placePicture(item){

        let arr = [];
        let i = 0;
        let size = pictures.length;

        if(item.itemPicture !== ''){
            while(i < size){
                if(pictures[i].title === item.itemPicture){
                    arr.push(
                        <div className='rounded-md w-full h-52 bg-stone-300'>
                            <img className='rounded-md h-full w-full object-contain' id="selectedImage" src={pictures[i].image} alt="Selected Image"></img>
                        </div>
                    );
                    break;
                }
                i++;
            }
        }
        return arr;
    }

    //function addSectionItems(index, keyIndex, section){

    function addSectionItems(section, startIndex, endIndex, keyIndex, sectionIndex){

        let arr = [];
        let i = startIndex;
        let size = endIndex;
        let maxSize = section.items.length;
        let menuItem = null;

        while(i <= size && i < maxSize){

            menuItem = section.items[i];

            let bgColor = 'bg-stone-100';
            let highlight = menuHighlightList[keyIndex];
            if(highlight){
                bgColor = 'bg-amber-500';
            }

            console.log("Here is the keyIndex:");
            console.log(keyIndex);

            arr.push(

            <div className='h-full w-72 flex flex-row justify-center screen216:justify-start'>

                <div className={`${bgColor} flex flex-col justify-start rounded-md border border-black w-70 screen216:ml-2 mb-2 min-h-44 h-auto`} key={`item${keyIndex}`}>

                    <div className='h-auto w-full flex flex-row justify-center items-center'>
                        {placePicture(menuItem)}
                    </div>

                    <div className='rounded-md flex flex-row justify-center min-h-10 h-auto w-full mt-2 mb-2'>  
                        <h1 className='text-lg pl-1 pr-1'>{`${menuItem.itemName}`}</h1>
                    </div>

                    <div className='rounded-md flex flex-row justify-center h-auto min-h-16 w-full'>
                        <h1 className='text-base px-1'>{`${menuItem.itemDescription}`}</h1>
                    </div>

                    <div className='rounded-md flex flex-row justify-start h-8 w-full mt-2'>
                        <h1 className='text-lg px-2'>{`$${menuItem.itemPrice}`}</h1>
                    </div>

                    <div className='rounded-md flex flex-row justify-start h-10 w-full mt-2 mb-2'>
                        <button type="button" section_value={sectionIndex} value={i} onClick={(e) => addItemToCart(e)} className="ml-2 flex flex-row justify-center items-center h-8 w-20 rounded-md text-white bg-green-800"><FaShoppingCart className='text-white'/></button>
                    </div>

                  

                </div>

            </div>
            );
        
            i++;
            keyIndex++;

        }

        return arr;
    }

    function addSectionRows(sectionIndex, keyIndex, section){

        let arr = [];
        let i = 0;
        let size = section.items.length;
        let keyCopy = keyIndex;
        

        while(i < size){
            
            arr.push(
                <div className='flex flex-col screen216:flex-row justify-start w-72 screen216:w-216 h-auto'>
                    {addSectionItems(section, i, i + 2, keyIndex, sectionIndex)}
                </div>
            );

            i = i + 3;
            keyCopy = keyCopy + 3;
            keyIndex = keyCopy;
            
        }

        return arr;
    }

    function addToContainer(){

        console.log("Inside add to container");
        console.log(menuArray);

        if(menuArray === null){
            return [            
                <div className='flex flex-col justify-start'>
                    <div className='h-12 w-full'>
                        <h1 className='text-2xl'>Menu Not Availiable</h1>
                    </div>
                    <div className='h-20 w-full bg-gray-300'>
                    </div>
                </div>
            ];
        }

        let arr = [];
        let keyIndex = 0;
        let keyRunner = 0;

        menuArray.map((x, index)=> {
            console.log("Is this the name?");
            console.log(x.name);

            arr.push(
                <div id={x.name.replaceAll(' ', '-')} className='w-full h-auto scroll-mt-40'>
                    <div className='w-full h-16 flex flex-row justify-center screen216:justify-start items-center my-4'>
                        <div className='w-auto h-16 flex flex-col justify-center border-b-2 border-black'>
                            <h1 className='text-2xl px-2'>{x.name}</h1>
                        </div>
                    </div>
                    <div className='w-full h-auto flex flex-col items-center mt-2'>
                        {/*addSectionItems(index, keyIndex, x)*/}
                        {addSectionRows(index, keyIndex, x)}
                    </div>
                </div>
            );

            keyRunner = keyRunner + x.items.length;
            keyIndex = keyRunner;
            
        });

        
        return[
            <div className='flex flex-col justify-start'>
                {[...arr]}
            </div>
        ];

    }


    let addItemToCart = (e) => {
        e.preventDefault();
        let sectionIndex = parseInt(e.currentTarget.getAttribute("section_value"));
        let object = menuArray[sectionIndex].items[parseInt(e.currentTarget.value)];
        console.log("Here is the object I'm pulling from: ");
        console.log(object);
        let item = {
            itemName : object.itemName,
            itemPrice : object.itemPrice
        };
        addItemToClientCart(item, businessName);
    }

    function getNotFoundList(){
        let arr = [];
        let altBG = 'bg-stone-100';
        notFoundFilterList.map((x, index) => {
            if(x === false){
                let itemName = currentFilterList[index];
                arr.push(
                    <div className={`flex flex-row justify-center items-center ${altBG} h-12 border-t border-black`}>
                        <h1 className='text-lg'>{itemName}</h1>
                    </div>
                )
            }
            altBG = (altBG === 'bg-stone-100') ? 'bg-stone-200' : 'bg-stone-100';
        });
        
        if(arr.length > 0){
            let temp = [];
            temp.push(
                <div className='rounded-sm flex flex-col mt-7 mb-8 border border-red-700 k w-full'>
                    <div className='rounded-sm flex flex-row justify-center items-center bg-red-700 h-10 mb-2'>
                        <h1 className='text-xl text-white'>Items Not Found:</h1>
                    </div>
                    <div className='rounded-sm w-full h-auto max-h-68 overflow-y-auto'>
                        {[...arr]}
                    </div>
                </div>
            );
            //return [...temp, ...arr];
            return temp;
        }
        
        return arr;
    }


    return (
        <div className='flex flex-row justify-center w-full mt-5 mb-10'>
            <div className='flex flex-col justify-start items-center w-full'>
                <div className='flex flex-row justify-center w-80'>
                    {getNotFoundList()}
                </div>
                <div className='flex flex-row justify-center w-100 screen216:w-216'>
                    <div className='flex flex-col justify-start h-auto w-full rounded-md bg-white'>
                        <div>{addToContainer()}</div>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default ClientMenuContainer


/*
function addToContainer(){

    console.log("Inside add to container");
    console.log(menuArray);

    if(menuArray === null){
        return [            
            <div className='flex flex-col justify-start'>
                <div className='h-12 w-full'>
                    <h1 className='text-2xl'>Menu Not Availiable</h1>
                </div>
                <div className='h-20 w-full bg-gray-300'>
                </div>
            </div>
        ];
    }

    let arr = [];
    let keyIndex = 0;

    menuArray.map((x, index)=> {
        console.log("Is this the name?");
        console.log(x.name);
        
        x.items.map((x2, index2) => {

            let bgColor = 'bg-indigo-300';
            let highlight = menuHighlightList[keyIndex];
            if(highlight){
                bgColor = 'bg-amber-400';
            }


            arr.push(
                <div className={`${bgColor} rounded-md border border-black flex flex-col justify-start w-full h-24 text-lg`} key={`item${keyIndex}`}>
                    <div className='rounded-md flex flex-row justify-start h-2/5 w-full'>
                        <div className='rounded-md flex flex-row justify-center items-center h-full w-3/4'>  
                            {`${x2.itemName}`} 
                        </div>
                        <div className='rounded-md flex flex-row justify-center items-center h-full w-1/4'>
                            {`$${x2.itemPrice}`}
                        </div>
                    </div>
                    <div className='rounded-md flex flex-row justify-start h-3/5 w-full'>
                        <div className="flex flex-row justify-center items-center h-full w-1/4">
                            <button type="button" section_value={index} value={index2} onClick={(e) => addItemToCart(e)} className="flex flex-row justify-center items-center h-10 w-16 rounded-md text-white bg-green-800"><FaShoppingCart className='text-white'/></button>
                        </div>
                        <div className='rounded-md flex flex-row justify-start h-full w-3/4 overflow-y-auto'>
                            {`${x2.itemDescription}`}
                        </div> 
                    </div>
                </div>
            );
        
            keyIndex++;

        });
        
    });

    
    return[
        <div className='flex flex-col justify-start'>
            <div className='h-12 w-full'>
                <h1 className='text-2xl'>Menu Items</h1>
            </div>
            {[...arr]}
        </div>
    ];

}
*/

/* Improved function, but still need one more */

/*
function addSectionItems(index, keyIndex, section){

    let arr = [];


    section.items.map((x2, index2) => {

        let bgColor = 'bg-stone-200';
        let highlight = menuHighlightList[keyIndex];
        if(highlight){
            bgColor = 'bg-amber-400';
        }

        console.log("Here is the keyIndex:");
        console.log(keyIndex);

        arr.push(

            <div className={`${bgColor} flex flex-col justify-start rounded-md border border-black w-72 min-h-28 h-auto`} key={`item${keyIndex}`}>

                <div className={`rounded-md flex flex-row justify-start w-full h-auto min-h-28 text-lg`} >

                    <div className={`rounded-md flex flex-col justify-start w-1/4 h-full min-h-28 text-lg`}>

                        <div className='rounded-md flex flex-row justify-center h-12 w-full'>
                            <button type="button" section_value={index} value={index2} onClick={(e) => addItemToCart(e)} className="mt-2 flex flex-row justify-center items-center h-10 w-16 rounded-md text-white bg-green-800"><FaShoppingCart className='text-white'/></button>
                        </div>

                        <div className='rounded-md flex flex-row justify-center h-12 w-full mt-4'>
                            {`$${x2.itemPrice}`}
                        </div>

                    </div>

                    <div className='rounded-md flex flex-col justify-start min-h-24 h-auto w-3/4'>

                        <div className='rounded-md flex flex-row justify-start min-h-12 h-auto w-full mt-2 mb-2'>  
                            <h1 className='text-lg pl-1 pr-3'>{`${x2.itemName}`}</h1>
                        </div>

                        <div className='rounded-md flex flex-row justify-start h-auto min-h-16 w-full pr-2 mb-2 text-base'>
                            {`${x2.itemDescription}`}   
                        </div>
                    </div>

                </div>
                <div className='h-auto w-full flex flex-row justify-center items-center mb-4'>
                    {placePicture(x2)}
                </div>
            </div>
        );
    
        keyIndex++;

    });

    return arr;
}
*/
