import React, {useState, useEffect} from 'react'
import { FaEdit } from 'react-icons/fa';
import { FaRegTrashAlt } from 'react-icons/fa';
import {TiDelete} from "react-icons/ti";

const BusinessMenuItem = ({sectionName, name, price, description, image, index, editorOpen, expandSize, shrinkSize, editMenuArrayItem, deleteMenuArrayItem, deleteFromItemsEdited, openImageSelector, editSelectedImageTitle, resetEditSelectedImageTitle, checkPriceFormat}) => {

    let [itemName, setItemName] = useState(name);
    let [itemPrice, setItemPrice] = useState(price);
    let [itemDescription, setItemDescription] = useState(description);
    let [nameHolder, setNameHolder] = useState(name);
    let [priceHolder, setPriceHolder] = useState(price);
    let [descriptionHolder, setDescriptionHolder] = useState(description);

    //let [itemImage, setItemImage] = useState(image);
    let [itemImage, setItemImage] = useState('...');
    let [imageHolder, setImageHolder] = useState(image);

    let [showImageTitleDelete, setShowImageTitleDelete] = useState('hidden');

    let [itemSectionName, setItemSectionName] = useState(sectionName);

    let [imageChanged, setImageChanged] = useState(false);

    let [itemNameError, setItemNameError] = useState('');
    let [itemNameBorder, setItemNameBorder] = useState('border-gray-500');
    let [itemNameErrorContainerSize, setItemNameErrorContainerSize] = useState('');

    let [itemPriceError, setItemPriceError] = useState('');
    let [itemPriceBorder, setItemPriceBorder] = useState('border-gray-500');
    let [itemPriceErrorContainerSize, setItemPriceErrorContainerSize] = useState('');

    //let imageChanged = false;

    function removeItemNameError(){
        if(itemNameError.length > 0){
            setItemNameError('');
            setItemNameBorder('border-gray-500');
            setItemNameErrorContainerSize('');
        }
    }
    
    function addItemNameError(error){
        if(error.length > 0){
            setItemNameError(error);
            setItemNameBorder('border-red-500');
            setItemNameErrorContainerSize('min-h-6');
        }
    }

    function removeItemPriceError(){
        if(itemPriceError.length > 0){
            setItemPriceError('');
            setItemPriceBorder('border-gray-500');
            setItemPriceErrorContainerSize('');
        }
    }
    
    function addItemPriceError(error){
        if(error.length > 0){
            setItemPriceError(error);
            setItemPriceBorder('border-red-500');
            setItemPriceErrorContainerSize('min-h-6');
        }
    }

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
        removeItemNameError();
        removeItemPriceError();
        shrinkSize(e);
    }

    let approveEdit = (e) => {

        e.preventDefault();

        let requirementError = false;

        if(itemName.length === 0){
            addItemNameError('Required');
            requirementError = true;
        }
        else{
            removeItemNameError();
        }

        if(itemPrice.length === 0){
            addItemPriceError('Required');
            requirementError = true;
        }
        else{
            removeItemPriceError();
        }

        if(requirementError){
            return;
        }

        let value = editMenuArrayItem(e, itemName, itemPrice, itemImage, itemDescription);
        
        if(value.error){
            addItemNameError(value.message);
            return;
        }
        
        setNameHolder(itemName);
        setPriceHolder(itemPrice);
        setImageHolder(itemImage);
        setDescriptionHolder(itemDescription);
        setImageChanged(false);
        shrinkSize(e);
        
    }

    function checkPrice(value){

        let check = checkPriceFormat(value);
        
        if(check.correct === false){
            addItemPriceError(check.message);
            return;
        }
      
        setItemPrice(value);
        removeItemPriceError();
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
                <div className='flex flex-col justify-start w-full min-h-72 h-auto'>

                    <div className='flex flex-row justify-start w-full min-h-60 h-auto'>

                        <div className='flex flex-col justify-start w-full min-h-60 h-auto'>

                            <input type="text" value={itemName} onChange={(e) => setItemName(e.target.value)} id="itemName" className={`border ${itemNameBorder} bg-gray-100 text-gray-900 placeholder:text-gray-500 text-sm rounded-lg w-72 ml-2 mt-2 h-10 p-2.5`} placeholder="Edit Item Name" />
                            <div className={`h-auto w-70 ${itemNameErrorContainerSize}`}>
                                <h3 className='pl-3 text-red-600 text-base'>{itemNameError}</h3>
                            </div>

                            <input type="text" required value={itemPrice} onChange={(e) => checkPrice(e.target.value)} id="itemPrice" className={`border ${itemPriceBorder} bg-gray-100 text-gray-900 placeholder:text-gray-500 text-sm rounded-lg w-44 ml-2 mt-2 h-10 p-2.5`} placeholder="Edit Price" />
                            <div className={`h-auto w-70 ${itemPriceErrorContainerSize}`}>
                                <h3 className='pl-3 text-red-600 text-base'>{itemPriceError}</h3>
                            </div>

                            <div className='w-full h-16 flex flex-row justify-start items-center'> 
                                <button type="button" onClick={(e) => {openImageSelector(e, itemImage, {sectionName: itemSectionName, itemName: itemName})}} className='ml-2 rounded h-10 w-24 text-base bg-slate-500 text-white'>Edit Picture</button>
                                <div className='flex flex-row justify-start items-center rounded ml-1 h-10 w-64 bg-gray-700 border border-gray-800'>
                                    <h1 className='ml-1 text-white text-sm'>{(itemImage.length > 18) ? itemImage.substring(0, 18) + "..." : itemImage}</h1>
                                </div>
                                <div className='flex flex-row justify-center items-center h-11 w-8'>
                                    <TiDelete onClick={(e) => resetImageSelected(e)} className={`text-4xl text-red-700 cursor-pointer ${showImageTitleDelete}`}/>
                                </div>
                            </div>

                            <textarea value={itemDescription} onChange={(e) => setItemDescription(e.target.value)} id="itemDescription"  className="w-72 h-20 ml-2 mt-2 text-sm bg-gray-100 placeholder:text-gray-500 border-gray-700 rounded-md text-gray-900 border p-2.5" placeholder='Edit Description'></textarea>
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
                <div className='w-full min-h-44 h-auto'>
                    <div className='bg-indigo-300 flex flex-row justify-start h-auto min-h-12 w-full'>
                        <div className='flex flex-row justify-center items-center h-auto min-h-12 w-3/4'>
                            <div className='text-lg h-auto min-h-12 w-auto max-w-68 break-words text-wrap overflow-visible pt-3 pb-3'>
                                {itemName}  
                            </div>
                        </div>
                        <div className='flex flex-row justify-center items-center h-12 w-1/4'>
                            {`$${itemPrice}`} 
                        </div>
                    </div>

                    <div className='flex flex-row justify-start min-h-12 h-auto w-full mb-1'>
                        <div className='w-1/6 h-full flex flex-row justify-start items-center'>
                            <h1 className='text-base pl-2 font-medium'>Image: </h1>
                        </div>
                        <div className='w-5/6 min-h-12 h-auto break-words text-wrap overflow-visible'>
                            <h1 className='text-base pl-2'>{itemImage}</h1>
                        </div>
                    </div>
                    
                    <div className='flex flex-row justify-start h-20 w-full'>
                        <div className='bg-indigo-200 border border-indigo-400 flex flex-col justify-start h-full w-3/4 text-base overflow-y-auto overscroll-contain break-words text-wrap pl-2'>
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
        <div className='w-full min-h-32 h-auto'>
            <div className='bg-indigo-300 flex flex-row justify-start min-h-12 h-auto w-full'>
                <div className='flex flex-row justify-center items-center h-auto min-h-12 w-3/4'>
                    <div className='text-lg h-auto min-h-12 w-auto max-w-68 break-words text-wrap overflow-visible pt-3 pb-3'>
                        {itemName}
                    </div>  
                </div>
                <div className='flex flex-row justify-center items-center h-12 w-1/4'>
                    {`$${itemPrice}`} 
                </div>
            </div>
            <div className='flex flex-row justify-start h-20 w-full'>
                <div className='bg-indigo-200 border border-indigo-400 flex flex-col justify-start h-full w-3/4 text-base overflow-y-auto overscroll-contain break-words text-wrap pl-2'>
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
    <div className='w-full min-h-full h-auto'>
        {getTop()}
    </div>
  )
}

export default BusinessMenuItem



