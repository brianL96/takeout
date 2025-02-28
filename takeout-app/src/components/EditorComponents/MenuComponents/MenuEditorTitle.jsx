import React, { useEffect, useState } from 'react'
import EditorMenuBlock from './EditorMenuBlock';

const MenuEditorTitle = ({getBlockMenu, editBlockMenu, turnOffMenuDeployment, editMenuSections, getBlockMenuSections, openImageSelector, currentSelectedImageTitle, setCurrentSelectedImageTitle, editSelectedImageTitle, resetEditSelectedImageTitle}) => {

    let [cardDepolyed, setCardDeployed] = useState('');
    let [editedWarning, setEditedWarning] = useState('hidden');

    function setDeployedStatusMessage(value){
        setCardDeployed(value);
    }

    function setEditedWarningMessage(value){
        setEditedWarning(value);
    }


    function getDeployedStatusMessage(){
        if(cardDepolyed === 'null'){
            return [<h1 key={'key-MenuEditorTitleDeployedMessage'} className='ml-2'>You are not logged in.</h1>]; 
        }
        else if(cardDepolyed === 'true'){
            return [<h1 key={'key-MenuEditorTitleDeployedMessage'} className='ml-2 text-green-700'>Your menu is deployed and visible to other users.</h1>];
        }
        else if(cardDepolyed === 'false'){
            return [<h1 key={'key-MenuEditorTitleDeployedMessage'} className='ml-2 text-red-700'>Your menu is not deployed. Without a visible menu, potential customers cannot place orders to your business.</h1>];
        }
        else{
            return [];
        }
    }

  return (
    <>
        <div className='flex flex-row justify-center w-full min-w-108 h-36 mt-10'>
            <div className='flex flex-col justify-start h-full screen216:w-216 screen216:min-w-216 w-108 min-w-108'>
                <div className='flex flex-row justify-start items-center h-12 w-full bg-white border-b border-gray-700'>
                    <h1 className='text-gray-500 pl-2 text-2xl'>Manage Your Menu:</h1>
                </div>
                <div className='flex flex-col justify-start h-24 w-full border-x border-black'>
                    <div className='w-9/10 h-1/2 pt-3'>
                        {getDeployedStatusMessage()}
                    </div>
                    <div className='w-9/10 h-1/2 pl-2'>
                        <h1 className={`text-base text-red-500 mt-9 screen216:mt-4 ${editedWarning}`}>Edited: Click 'Deploy' Or 'Update' To Save Changes.</h1>
                    </div>
                </div>
            </div>
        </div>
        <EditorMenuBlock getBlockMenu={getBlockMenu} editBlockMenu={editBlockMenu} turnOffMenuDeployment={turnOffMenuDeployment} setDeployedStatusMessage={setDeployedStatusMessage} editMenuSections={editMenuSections} getBlockMenuSections={getBlockMenuSections} openImageSelector={openImageSelector} currentSelectedImageTitle={currentSelectedImageTitle} setCurrentSelectedImageTitle={setCurrentSelectedImageTitle} editSelectedImageTitle={editSelectedImageTitle} resetEditSelectedImageTitle={resetEditSelectedImageTitle} editedWarning={editedWarning} setEditedWarningMessage={setEditedWarningMessage}/>
    </>
  )
}

export default MenuEditorTitle




