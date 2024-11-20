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
      let temp2 = bigClientArray;
      setBigClientArray([...temp2, {name: name, items: []}]);
      checkEditedWarning();
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
      addItemInBigArray(itemObject);  
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
      bigCopy[i].items = [...itemsCopy, itemObject];
      setBigClientArray([...bigCopy]);
      checkEditedWarning();
    }

    function editMenuItem(editIndex, newName, newPrice, newImage, newDescription){
      editItemInBigArray(editIndex, newName, newPrice, newImage, newDescription); 
    }

    function editItemInBigArray(editIndex, newName, newPrice, newImage, newDescription){
      
      let details = findSectionInBigArray();
      if(details.found === false){
        return;
      }
      let i = details.index;
      let bigCopy = bigClientArray;
      bigCopy[i].items[editIndex].itemName = newName;
      bigCopy[i].items[editIndex].itemPrice = newPrice;
      bigCopy[i].items[editIndex].itemPicture = newImage;
      bigCopy[i].items[editIndex].itemDescription = newDescription;
      setBigClientArray([...bigCopy]);
      checkEditedWarning();
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


    return ( 
        <div className='flex flex-row justify-center w-full h-auto mt-10'>

            <div className='flex flex-col justify-start w-108 screen216:w-210 h-auto'>

                <form onSubmit={deployMenu} className='w-full h-auto border border-black'>
                    {setMenuContainerTop()}
                </form>

                <div className='flex flex-col screen216:flex-row justify-start w-108 screen216:w-210 h-auto'>

                  <div className='flex flex-col justify-start w-108 h-128'>
                    <div className='flex flex-row justify-start w-108 h-60'>
                      <EditorMenuSection bigClientArray={bigClientArray} addNewSection={addNewSection} setCurrentSectionTitle={setCurrentSectionTitle} deleteSection={deleteSection}/>
                    </div>
                    <div className='flex flex-row justify-start w-108 h-66'>
                      <EditorMenu bigClientArray={bigClientArray} addMenuItem={addMenuItem}  currentSectionTitle={currentSectionTitle} openImageSelector={openImageSelector} currentSelectedImageTitle={currentSelectedImageTitle} setCurrentSelectedImageTitle={setCurrentSelectedImageTitle} />
                    </div>
                  </div>

                  <MenuContainer bigClientArray={bigClientArray} currentSectionTitle={currentSectionTitle} editMenuItem={editMenuItem} deleteMenuItem={deleteMenuItem} openImageSelector={openImageSelector} editSelectedImageTitle={editSelectedImageTitle} resetEditSelectedImageTitle={resetEditSelectedImageTitle}/>

                </div>

            </div>

        </div>
    )
}

export default EditorMenuBlock

/*<MenuContainer bigClientArray={bigClientArray} currentSectionTitle={currentSectionTitle} editMenuItem={editMenuItem} deleteMenuItem={deleteMenuItem} openImageSelector={openImageSelector} editSelectedImageTitle={editSelectedImageTitle} resetEditSelectedImageTitle={resetEditSelectedImageTitle}/>*/
/*<div className='flex flex-col screen216:flex-row justify-start w-108 screen216:w-210 h-auto'>*/
