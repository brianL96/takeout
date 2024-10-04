import React, { useEffect, useState } from 'react'
import EditorMenuBlock from './EditorMenuBlock';

const MenuEditorTitle = ({getBlockMenu, editBlockMenu, turnOffMenuDeployment, editMenuSections, getBlockMenuSections, openImageSelector, currentSelectedImageTitle, setCurrentSelectedImageTitle}) => {

    let [cardDepolyed, setCardDeployed] = useState('');

    function setDeployedStatusMessage(value){
        setCardDeployed(value);
    }

    function getDeployedStatusMessage(){
        if(cardDepolyed === 'null'){
            return [<h1 className='ml-2'>You are not logged in.</h1>]; 
        }
        else if(cardDepolyed === 'true'){
            return [<h1 className='ml-2 text-green-700'>Your menu is deployed and visible to other users.</h1>];
        }
        else if(cardDepolyed === 'false'){
            return [<h1 className='ml-2 text-red-700'>Your menu is not deployed. Without a visible menu, potential customers cannot place orders to your business.</h1>];
        }
        else{
            return [];
        }
    }

  return (
    <>
        <div className='flex flex-row justify-center w-full h-36 mt-10'>
            <div className='flex flex-col justify-start h-full screen216:w-216 screen216:min-w-216 w-108 min-w-108'>
                <div className='flex flex-row justify-start items-center h-12 w-full bg-white border-b border-gray-700'>
                    <h1 className='text-gray-500 pl-2 text-2xl'>Manage Your Menu:</h1>
                </div>
                <div className='flex flex-row justify-start items-center h-24 w-full border-x border-gray-600'>
                    <div className='w-9/10 h-5/6'>
                        {getDeployedStatusMessage()}
                    </div>
                </div>
            </div>
        </div>
        <EditorMenuBlock getBlockMenu={getBlockMenu} editBlockMenu={editBlockMenu} turnOffMenuDeployment={turnOffMenuDeployment} setDeployedStatusMessage={setDeployedStatusMessage} editMenuSections={editMenuSections} getBlockMenuSections={getBlockMenuSections} openImageSelector={openImageSelector} currentSelectedImageTitle={currentSelectedImageTitle} setCurrentSelectedImageTitle={setCurrentSelectedImageTitle} />
    </>
  )
}

export default MenuEditorTitle

