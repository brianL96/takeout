import React, {useState, useEffect} from 'react'
import { FaEdit } from 'react-icons/fa';
import { FaRegTrashAlt } from 'react-icons/fa';
import {TiDelete} from "react-icons/ti";

const BusinessMenuItem = ({sectionName, name, price, description, image, index, editorOpen, expandSize, shrinkSize, editMenuArrayItem, deleteMenuArrayItem, deleteFromItemsEdited, openImageSelector, editSelectedImageTitle, resetEditSelectedImageTitle}) => {

    let [itemName, setItemName] = useState(name);
    let [itemPrice, setItemPrice] = useState(price);
    let [itemDescription, setItemDescription] = useState(description);
    let [nameHolder, setNameHolder] = useState(name);
    let [priceHolder, setPriceHolder] = useState(price);
    let [descriptionHolder, setDescriptionHolder] = useState(description);

    let [itemImage, setItemImage] = useState(image);
    let [imageHolder, setImageHolder] = useState(image);

    let [showImageTitleDelete, setShowImageTitleDelete] = useState('hidden');

    let [itemSectionName, setItemSectionName] = useState(sectionName);

    let [imageChanged, setImageChanged] = useState(false);
    //let imageChanged = false;

    let resetImageSelected = (e) => {
        e.preventDefault();
        setItemImage('...');
        setImageChanged(false);
        //imageChanged = false;
        setShowImageTitleDelete('hidden');
    }
    
    let cancellation = (e) => {
        e.preventDefault();
        setItemName(nameHolder);
        setItemPrice(priceHolder);
        setItemImage(imageHolder);
        setItemDescription(descriptionHolder);
        if(imageHolder === undefined || imageHolder === null || imageHolder === '...'){
            setShowImageTitleDelete('hidden');
        }
        else{
            setShowImageTitleDelete('');
        }
        setImageChanged(false);
        //imageChanged = false;
        shrinkSize(e);
    }

    let approveEdit = (e) => {
        e.preventDefault();
        setNameHolder(itemName);
        setPriceHolder(itemPrice);
        setImageHolder(itemImage);
        setDescriptionHolder(itemDescription);
        setImageChanged(false);
        //imageChanged = false;
        shrinkSize(e);
        editMenuArrayItem(e, itemName, itemPrice, itemImage, itemDescription);
    }

    useEffect(() => {
        setItemName(name);
        setItemPrice(price);
        setItemDescription(description);

        setNameHolder(name);
        setPriceHolder(price);
        setDescriptionHolder(description);

        setItemSectionName(sectionName);

        if(imageChanged === false){
            if(image === undefined || image === null || image === '...'){
                setItemImage('...');
                setImageHolder('...');
                setShowImageTitleDelete('hidden');
            }
            else{
                setItemImage(image);
                setImageHolder(image);
                setShowImageTitleDelete('');
            }
        }

        if(editSelectedImageTitle.sectionName === itemSectionName && editSelectedImageTitle.itemName === itemName && editSelectedImageTitle.completeEdit === true && editSelectedImageTitle.imageName !== ''){
            setItemImage(editSelectedImageTitle.imageName);
            setShowImageTitleDelete('');
            setImageChanged(true);
            resetEditSelectedImageTitle();
            //imageChanged = true;
        }

    }, [sectionName, name, price, description, image, editSelectedImageTitle]);


    function getTop(){

        if(editorOpen){
            return [
                <div className='flex flex-col justify-start w-full h-72'>

                    <div className='flex flex-row justify-start w-full h-60'>

                        <div className='flex flex-col justify-star w-full h-60'>
                            <input type="text" required value={itemName} onChange={(e) => setItemName(e.target.value)} id="itemName" className="w-72 h-10 ml-2 mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Edit Item Name" />
                            <input type="text" required value={itemPrice} onChange={(e) => setItemPrice(e.target.value)} id="itemPrice" className="w-44 h-10 ml-2 mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Edit Price" />

                            <div className='w-full h-16 flex flex-row justify-start items-center'> 
                                <button type="button" onClick={(e) => {openImageSelector(e, itemImage, {sectionName: itemSectionName, itemName: itemName})}} className='ml-2 rounded h-10 w-24 text-base bg-slate-500 text-white'>Edit Picture</button>
                                <div className='flex flex-row justify-start items-center rounded ml-1 h-10 w-64 bg-gray-700 border border-gray-800'>
                                    <h1 className='ml-1 text-white text-sm'>{itemImage}</h1>
                                </div>
                                <div className='flex flex-row justify-center items-center h-11 w-8'>
                                    <TiDelete onClick={(e) => resetImageSelected(e)} className={`text-4xl text-red-700 cursor-pointer ${showImageTitleDelete}`}/>
                                </div>
                            </div>

                            <textarea value={itemDescription} onChange={(e) => setItemDescription(e.target.value)} id="itemDescription"  className="w-72 h-20 ml-2 mt-2 text-sm border-gray-300 rounded-md text-gray-900 dark:bg-gray-700 dark:text-white  border p-2.5" placeholder='Edit Description'></textarea>
                        </div>

                    </div>
                    <div className='flex flex-row justify-evenly items-center h-12 w-full'>
                        <button type="button" value={index} onClick={(e) => approveEdit(e)} className="h-8 w-20 text-base rounded-md text-white bg-slate-600">Save</button>
                        <button type="button" value={index} onClick={(e) => cancellation(e)} className="h-8 w-20 text-base rounded-md text-white bg-slate-600">Cancel</button>
                    </div>
                </div>
            ];
        }

        if(itemImage !== undefined && itemImage !== null && itemImage !== '...'){
            return [
                <div className='w-full h-44'>
                    <div className='bg-indigo-300 flex flex-row justify-start h-12 w-full'>
                        <div className='flex flex-row justify-center items-center h-full w-3/4'>
                            {itemName}  
                        </div>
                        <div className='flex flex-row justify-center items-center h-full w-1/4'>
                            {`$${itemPrice}`} 
                        </div>
                    </div>

                    <div className='flex flex-row justify-start items-center h-12 w-full'>
                        <h1 className='text-base pl-2 font-medium'>Image: </h1>
                        <h1 className='text-base pl-2'>{itemImage}</h1>
                    </div>
                    
                    <div className='flex flex-row justify-start h-20 w-full'>
                        <div className='bg-indigo-200 border border-indigo-400 flex flex-col justify-start h-full w-3/4 text-base overflow-y-auto overscroll-contain pl-2'>
                            {itemDescription}
                        </div>
                        <div className="flex flex-row justify-center h-full w-1/4">
                            <div className='flex flex-col justify-around w-20'>
                                <button type="button" value={index} onClick={(e) => expandSize(e)} className="flex flex-row justify-center items-center h-8 w-full text-lg rounded-md text-white bg-green-700"><FaEdit/></button>
                                <button type="button" value={index} onClick={(e) => {setImageChanged(false); deleteFromItemsEdited(e); deleteMenuArrayItem(e);}} className="flex flex-row justify-center items-center h-8 w-full text-lg rounded-md text-white bg-red-700"><FaRegTrashAlt/></button>
                            </div>
                        </div>
                    </div>
                </div>
            ];
        }

        return [
        <div className='w-full h-32'>
            <div className='bg-indigo-300 flex flex-row justify-start h-2/5 w-full'>
                <div className='flex flex-row justify-center items-center h-full w-3/4'>
                    {itemName}  
                </div>
                <div className='flex flex-row justify-center items-center h-full w-1/4'>
                    {`$${itemPrice}`} 
                </div>
            </div>
            <div className='flex flex-row justify-start h-3/5 w-full'>
                <div className='bg-indigo-200 border border-indigo-400 flex flex-col justify-start h-full w-3/4 text-base overflow-y-auto overscroll-contain pl-2'>
                    {itemDescription}
                </div>
                <div className="flex flex-row justify-center h-full w-1/4">
                    <div className='flex flex-col justify-around w-20'>
                        <button type="button" value={index} onClick={(e) => expandSize(e)} className="flex flex-row justify-center items-center h-8 w-full text-lg rounded-md text-white bg-green-700"><FaEdit/></button>
                        <button type="button" value={index} onClick={(e) => {setImageChanged(false); deleteFromItemsEdited(e); deleteMenuArrayItem(e);}} className="flex flex-row justify-center items-center h-8 w-full text-lg rounded-md text-white bg-red-700"><FaRegTrashAlt/></button>
                    </div>
                </div>
            </div>
        </div>
        ];
    }

  return (
    <div className='w-full h-full'>
        {getTop()}
    </div>
  )
}

export default BusinessMenuItem



