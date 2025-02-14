import React, { useEffect, useState } from 'react'
import EditorSquare from './EditorSquare';

const EditorTitle = ({turnOffDeployment, getBlockCard, editBlockCard}) => {

    let [cardDepolyed, setCardDeployed] = useState('');
    let [editedWarning, setEditedWarning] = useState('hidden');

    function setEditedWarningMessage(value){
        setEditedWarning(value);
    }

    function setDeployedStatusMessage(value){
        setCardDeployed(value);
    }

    function getDeployedStatusMessage(){
        if(cardDepolyed === 'null'){
            return [<h1 key={'key-DeployedMessage'} className='ml-2'>You are not logged in.</h1>]; 
        }
        else if(cardDepolyed === 'true'){
            return [<h1 key={'key-DeployedMessage'} className='ml-2 text-green-700'>Your business card is deployed and visible to other users.</h1>];
        }
        else if(cardDepolyed === 'false'){
            return [<h1 key={'key-DeployedMessage'} className='ml-2 text-red-700'>Your business card is not deployed. Without a visible business card, potential customers cannot access your business.</h1>];
        }
        else{
            return [];
        }
    }

  return (
    <>
        <div className='flex flex-row justify-center w-full h-36 screen180:mt-24 mt-40'>
            <div className='flex flex-col justify-start h-full screen216:w-216 screen216:min-w-216 w-108 min-w-108'>
                <div className='flex flex-row justify-start items-center h-12 w-full bg-white border-b border-gray-700'>
                    <h1 className='text-gray-500 pl-2 text-2xl'>Manage Your Business Card:</h1>
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
        <EditorSquare turnOffDeployment={turnOffDeployment} getBlockCard={getBlockCard} editBlockCard={editBlockCard} setDeployedStatusMessage={setDeployedStatusMessage} editedWarning={editedWarning} setEditedWarningMessage={setEditedWarningMessage}/>
    </>
  )
}

export default EditorTitle

