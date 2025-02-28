import React, { useEffect, useState } from 'react'
import EditorMenu from './EditorMenu';
import EditorMenuSection from './EditorMenuSection';
import MenuContainer from './MenuContainer';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';

const EditorMenuBlock = ({getBlockMenu, editBlockMenu, turnOffMenuDeployment, setDeployedStatusMessage, editMenuSections, getBlockMenuSections, openImageSelector, currentSelectedImageTitle, setCurrentSelectedImageTitle, editSelectedImageTitle, resetEditSelectedImageTitle, editedWarning, setEditedWarningMessage}) => {

    let [currentSectionTitle, setCurrentSectionTitle] = useState('');
    let [menuDeployed, setMenuDeployed] = useState(false);
    let [bigClientArray, setBigClientArray] = useState([]);

    useEffect(() => {

      let details = getBlockMenu();
      if(details !== null && details.menu !== undefined){
        let i = 0;
        let size = details.menu.length;
        let arr = [];
        
        while(i < size){
          let itemObject = {
            name: details.menu[i].name,
            //items: [...details.menu[i].items]
            items: []
          };

          details.menu[i].items.map((x) => {
            let temp = {
              itemName: x.itemName,
              itemPrice: x.itemPrice,
              itemPicture: x.itemPicture,
              itemDescription: x.itemDescription
            }
            itemObject.items.push(temp);
          });

          arr.push(itemObject);
          i++;
        }

        if(size > 0){
          setCurrentSectionTitle(details.menu[0].name);
        }

        setBigClientArray([...arr]);
      }
      if(details !== null && details.menuDeployed){
        setMenuDeployed(true);
        setDeployedStatusMessage('true');
      }
      else if(details !== null && details.menuDeployed === false){
        setDeployedStatusMessage('false');
      }
      else if(details === null){
        setDeployedStatusMessage('null');
      }
    
    }, []);

    function addNewSection(sectionName){

      let name = sectionName;
      let tempArray = bigClientArray;

      let found = false;
      tempArray.map((sectionContainer) => {
        if(sectionContainer.name === name){
          found = true;
        }
      });
      if(found){
        console.log("Section names must be unique");
        return false;
      }
    
      setBigClientArray([...tempArray, {name: name, items: []}]);
      checkEditedWarning();
      return true;
      
    }

    function deleteSection(deleteIndex){

      let bigCopy = bigClientArray;
      
      if(deleteIndex < 0 || deleteIndex >= bigCopy.length){
        return;
      }

      let size =  bigCopy.length;
      let array = null;
    
      if(deleteIndex === 0){
        if(size > 1){
          array = [...bigCopy.slice(1)];
        }
        else{
          array = [];
        }
      }
      else{
        array = [...bigCopy.slice(0, deleteIndex), ...bigCopy.slice(deleteIndex+1)];
      }

      //bigCopy = array;

      let newSelectIndex = 0;

      if(array.length > 0){
        newSelectIndex = (deleteIndex === 0 ? 0 : deleteIndex - 1);
        if(bigCopy[deleteIndex].name === currentSectionTitle){
          setCurrentSectionTitle(array[newSelectIndex].name);
        }
      }
      else if(array.length === 0){
        setCurrentSectionTitle('');
      }
      
      setBigClientArray([...array]);
      checkEditedWarning();

    }


    function getDeployedBar(){

        return (
            <div className='flex flex-row justify-start h-12 w-full'>
                <div className='flex flex-row justify-center items-center w-1/2 h-full'>
                    <IoIosCheckmarkCircleOutline className='text-green-600' size='36'/>
                    <h2 className='text-green-600 text-lg'> - Deployed</h2>
                </div>
                <div className='flex flex-row justify-around items-center w-1/2 h-full'>
                    <button className="h-10 w-20 rounded-md text-white bg-slate-600">Update</button>
                    <button type="button" onClick={(e) => rescind(e)} className="h-10 w-20 rounded-md text-white bg-slate-600">Rescind</button>
                </div>
            </div>
        );
    }

    function getUndeployedBar(){
        return (
            <div className='flex flex-row justify-center items-center w-full h-12'>
                <button className="h-10 w-20 rounded-md text-white bg-slate-600">Deploy</button>
            </div>    
        );
    }

    function setMenuContainerTop(){
        if(menuDeployed){
            return getDeployedBar();
        }
        return getUndeployedBar();
      }


    let deployMenu = (e) => {
        
        e.preventDefault();
        
        if(bigClientArray === undefined || bigClientArray === null){
          return;
        }

        let tempArray = [];
        
        bigClientArray.map((businessObject) => {
    
          let itemObject = {
            name: businessObject.name,
            items: []
          };

          businessObject.items.map((sectionObject) => {
            
            let temp = {
              itemName: sectionObject.itemName,
              itemPrice: sectionObject.itemPrice,
              itemPicture: sectionObject.itemPicture,
              itemDescription: sectionObject.itemDescription
            }

            itemObject.items.push(temp)

          });

          tempArray.push(itemObject);

        });


        //let success = editBlockMenu(bigClientArray);
        let success = editBlockMenu(tempArray);

        if(success){
            setMenuDeployed(true);
            setDeployedStatusMessage('true');
            if(editedWarning === ''){
              setEditedWarningMessage('hidden');
          }
        }
    }

    let rescind = (e) => {
        e.preventDefault();
        turnOffMenuDeployment();
        setMenuDeployed(false);
        setDeployedStatusMessage('false');
    }

    function addMenuItem(itemObject){
      return addItemInBigArray(itemObject);  
    }

    function findSectionInBigArray(){

      let returnValue = {
        found: false,
        index: -1
      };

      let i = 0;
      let length = bigClientArray.length;

      while(i < length){
        if(bigClientArray[i].name === currentSectionTitle){
          returnValue.found = true;
          returnValue.index = i;
          return returnValue;
        }
        i++;
      }

      return returnValue;
      
    }

    function addItemInBigArray(itemObject){

      let details = findSectionInBigArray();

      if(details.found === false){
        return;
      }

      let i = details.index;
      let bigCopy = bigClientArray;
      let itemsCopy = bigCopy[i].items;

      let found = false;
      itemsCopy.map((item) => {
        if(item.itemName === itemObject.itemName){
          found = true;
        }
      });
      if(found){
        return false;
      }

      bigCopy[i].items = [...itemsCopy, itemObject];
      setBigClientArray([...bigCopy]);
      checkEditedWarning();
      return true;
    }

    function editMenuItem(editIndex, newName, newPrice, newImage, newDescription){
      return editItemInBigArray(editIndex, newName, newPrice, newImage, newDescription); 
    }

    function editItemInBigArray(editIndex, newName, newPrice, newImage, newDescription){

      let returnValue = {
        error: false,
        message: ""
      };
      
      let details = findSectionInBigArray();
      if(details.found === false){
        //return false;
        returnValue.error = true;
        returnValue.message = "Section not found";
        return returnValue;
      }

      let i = details.index;
      let bigCopy = bigClientArray;

      let found = false;
      bigCopy[i].items.map((menuItem, index) => {
        if(menuItem.itemName === newName && editIndex !== index){
          found = true;
        }
      });

      if(found){
        returnValue.error = true;
        returnValue.message = "Name must be unique within a section";
        return returnValue;
        //return false;
      }

      bigCopy[i].items[editIndex].itemName = newName;
      bigCopy[i].items[editIndex].itemPrice = newPrice;
      bigCopy[i].items[editIndex].itemPicture = newImage;
      bigCopy[i].items[editIndex].itemDescription = newDescription;
      setBigClientArray([...bigCopy]);
      checkEditedWarning();
      //return true;
      return returnValue;
      
    }

    function deleteMenuItem(deleteIndex){
      deleteItemInBigArray(deleteIndex);    
    }

    function deleteItemInBigArray(deleteIndex){

      let details = findSectionInBigArray();
      if(details.found === false){
        return;
      }
      let i = details.index;
      let bigCopy = bigClientArray;

      let size =  bigCopy[i].items.length;
      let array = null;
    
      if(deleteIndex === 0){
        if(size > 1){
          array = [...bigCopy[i].items.slice(1)];
        }
        else{
          array = [];
        }
      }
      else{
        array = [...bigCopy[i].items.slice(0, deleteIndex), ...bigCopy[i].items.slice(deleteIndex+1)]
      }

      bigCopy[i].items = array;
      setBigClientArray([...bigCopy]);

      checkEditedWarning();
    }

    function checkEditedWarning(){
      if(editedWarning === 'hidden'){
          setEditedWarningMessage('');
      }
    }

    function checkPriceFormat(value){

      let length = value.length;
      let index = 0;
      let maxDecimal = 2;
      let dotFound = false;

      let returnValue = {
        message: "",
        correct: true
      };

      if(length > 0){
        if(value.charAt(0) === '.'){
          returnValue.message = "";
          returnValue.correct = false;
          return returnValue;
          //return false;
        }
      }
    
      while(index < length){
    
        if(dotFound){
          maxDecimal = maxDecimal - 1;
          if(maxDecimal < 0){
            returnValue.message = "";
            returnValue.correct = false;
            return returnValue;
            //return false;
          }
        }
    
        if(isNaN(value.charAt(index))){
    
          if(value.charAt(index) === '.'){
            if(dotFound){
              //console.log("Only one decimal point");
              returnValue.message = "Only one decimal point";
              returnValue.correct = false;
              return returnValue;
              //return false;
            }
            dotFound = true;
          }
    
          else if(value.charAt(index) !== '.'){
            //console.log("Must be a number");
            //return false;
            returnValue.message = "Must be a number";
            returnValue.correct = false;
            return returnValue;
          }
    
        } 
    
        index++;
      }
    
      if(length > 4){
    
        if(dotFound === false || length > 7 || ((length > 5) && (value.charAt(5) === '.')) || ((length > 6) && (value.charAt(6) === '.'))){
          //console.log("Max Price: $9999.99");
          //return false;
          returnValue.message = "Max Price: $9999.99";
          returnValue.correct = false;
          return returnValue;
        }
        
      }
    
      //return true;
      return returnValue
    
    }


    return ( 
        <div className='flex flex-row justify-center w-full min-w-108 h-auto mt-10'>

            <div className='flex flex-col justify-start w-108 screen216:w-210 h-auto'>

                <form onSubmit={deployMenu} className='w-full h-auto border border-black'>
                    {setMenuContainerTop()}
                </form>

                <div className='flex flex-col screen216:flex-row justify-start w-108 screen216:w-210 h-auto'>

                  <div className='flex flex-col justify-start w-108 min-h-128 h-auto'>
                    <div className='flex flex-row justify-start w-108 min-h-60 h-auto'>
                      <EditorMenuSection bigClientArray={bigClientArray} addNewSection={addNewSection} currentSectionTitle={currentSectionTitle} setCurrentSectionTitle={setCurrentSectionTitle} deleteSection={deleteSection}/>
                    </div>
                    <div className='flex flex-row justify-start w-108 min-h-66 h-auto'>
                      <EditorMenu bigClientArray={bigClientArray} addMenuItem={addMenuItem}  currentSectionTitle={currentSectionTitle} openImageSelector={openImageSelector} currentSelectedImageTitle={currentSelectedImageTitle} setCurrentSelectedImageTitle={setCurrentSelectedImageTitle} checkPriceFormat={checkPriceFormat} />
                    </div>
                  </div>

                  <MenuContainer bigClientArray={bigClientArray} currentSectionTitle={currentSectionTitle} editMenuItem={editMenuItem} deleteMenuItem={deleteMenuItem} openImageSelector={openImageSelector} editSelectedImageTitle={editSelectedImageTitle} resetEditSelectedImageTitle={resetEditSelectedImageTitle} checkPriceFormat={checkPriceFormat} />

                </div>

            </div>

        </div>
    )
}

export default EditorMenuBlock

/*<MenuContainer bigClientArray={bigClientArray} currentSectionTitle={currentSectionTitle} editMenuItem={editMenuItem} deleteMenuItem={deleteMenuItem} openImageSelector={openImageSelector} editSelectedImageTitle={editSelectedImageTitle} resetEditSelectedImageTitle={resetEditSelectedImageTitle}/>*/
/*<div className='flex flex-col screen216:flex-row justify-start w-108 screen216:w-210 h-auto'>*/
