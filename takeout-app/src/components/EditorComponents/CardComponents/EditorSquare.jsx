import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';

const EditorSquare = ({turnOffDeployment, getBlockCard, editBlockCard, setDeployedStatusMessage, editedWarning, setEditedWarningMessage}) => {

    let [image, setImage] = useState('#');
    let [businessName, setBusinessName] = useState('');
    let [streetAddress, setStreetAddress] = useState('');
    let [townAddress, setTownAddress] = useState('');
    let [stateAddress, setStateAddress] = useState('');
    let [zipAddress, setZipAddress] = useState('');
    let [cardColor, setCardColor] = useState('bg-stone-200');
    let [headerFont, setHeaderFont] = useState('');
    let [deployedStatus, setDeployedStatus] = useState(false);
    let [selectorBGCArray, setSelectorBGCArray] = useState([
        'h-8 border-2',
        'h-7 border',
        'h-7 border',
        'h-7 border',
        'h-7 border',
        'h-7 border',
        'h-7 border',
        'h-7 border'
    ]);

    useEffect(() => {
        let details = getBlockCard();

        if(details !== null){
            if(details.name !== undefined){
                setBusinessName(details.name);
            }
            if(details.street !== undefined){
                setStreetAddress(details.street);
            }
            if(details.town !== undefined){
                setTownAddress(details.town);
            }
            if(details.state !== undefined){
                setStateAddress(details.state);
            }
            if(details.zip !== undefined){
                setZipAddress(details.zip);
            }
            if(details.color !== undefined){
                setCardColor(details.color);
            }
            if(details.image !== undefined){
                setImage(details.image);
            }
            if(details.font !== undefined){
                setHeaderFont(details.font);
                checkRadioButton(details.font);
            }
            if(details.font === undefined){
                checkRadioButton('');
            }
            if(details.deployed !== undefined && details.deployed){
                setDeployedStatus(true);
                setDeployedStatusMessage('true');
            }
            if(details.deployed === undefined || details.deployed === false){
                setDeployedStatusMessage('false');
            }

            let colorIndex = getIndexFromColorValue(details.color);
            let arr = getResetSelectorBGCArray(colorIndex);
            setSelectorBGCArray(arr);
        }
        else if(details === null){
            checkRadioButton('');
            setDeployedStatusMessage('null');
        }
        //console.log(details);
    }, []);

    function getIndexFromColorValue(bgColor){
        let value = 0;
        switch(bgColor){
            case "bg-stone-200":
            value = 0;
            break;
            case "bg-gradient-to-l from-red-400 to-red-200":
            value = 1;
            break;
            case "bg-gradient-to-l from-orange-400 to-orange-200":
            value = 2;
            break;
            case "bg-gradient-to-l from-yellow-400 to-yellow-200":
            value = 3;
            break;
            case "bg-gradient-to-l from-green-400 to-green-200":
            value = 4;
            break;
            case "bg-gradient-to-l from-blue-400 to-blue-200":
            value = 5;
            break;
            case "bg-gradient-to-l from-indigo-400 to-indigo-200":
            value = 6;
            break;
            case "bg-gradient-to-l from-violet-400 to-violet-200":
            value = 7;
            break;
            default:
            value = 0;
        }
        return value;
    }

    function getResetSelectorBGCArray(index){
        let arr =  [
            'h-7 border',
            'h-7 border',
            'h-7 border',
            'h-7 border',
            'h-7 border',
            'h-7 border',
            'h-7 border',
            'h-7 border'
            ];
        arr[index] = 'h-8 border-2';
        return arr;
    }
    
    let deploy = (e) => {
        e.preventDefault();
        let businessAttributes = {
            name: businessName,
            street: streetAddress,
            town: townAddress,
            state: stateAddress,
            zip: zipAddress,
            color: cardColor,
            image: image,
            font: headerFont,
            deployed: true
        };
        let success = editBlockCard(businessAttributes);
        if(success){
            setDeployedStatus(true);
            setDeployedStatusMessage('true');
            if(editedWarning === ''){
                setEditedWarningMessage('hidden');
            }
        }
        
    }

    let rescind = (e) => {
        e.preventDefault();
        turnOffDeployment();
        setDeployedStatus(false);
        setDeployedStatusMessage('false');
    }

    let printBGC = (e) => {
        e.preventDefault();
        setCardColor(e.target.getAttribute("value"));
        let arr = getResetSelectorBGCArray(parseInt(e.target.getAttribute("numid")));
        setSelectorBGCArray(arr);
        checkEditedWarning();
    }

    let printFont = (e) =>{
        //e.preventDefault();
        //console.log(e.target.value);
        if(e.target.value === headerFont){
            return;
        }
        setHeaderFont(e.target.value);
        checkEditedWarning();
    }
   
      function getDeployedBar(){

        return (
            <>
                <div className='flex flex-row justify-center items-center w-1/2'>
                    <IoIosCheckmarkCircleOutline className='text-green-600' size='36'/>
                    <h2 className='text-green-600 text-lg'> - Deployed</h2>
                </div>
                <div className='flex flex-row justify-around items-center w-1/2'>
                    <button className="h-10 w-20 rounded-md text-white bg-slate-600">Update</button>
                    <button type="button" onClick={rescind} className="h-10 w-20 rounded-md text-white bg-slate-600">Rescind</button>
                </div>
            </>
        );
      }

      function getUndeployedBar(){
        
        return (
            <div className='flex flex-row justify-center items-center w-full'>
                <button className="h-10 w-20 rounded-md text-white bg-slate-600">Deploy</button>
            </div>    
        );

      }

      function setCardEditorBase(){
        if(deployedStatus){
            return getDeployedBar();
        }
        return getUndeployedBar();
      }

      function checkEditedWarning(){
        if(editedWarning === 'hidden'){
            setEditedWarningMessage('');
        }
      }

      function checkRadioButton(font){

        //console.log("Made it inside check Radio Button")
        //console.log(font);
        let elementName = '';

        if(font === undefined || font === null || font === ''){
            //console.log("1st");
            let addDefault = document.querySelector('#font-radio-1');
            //console.log(addDefault);
            if(addDefault !== undefined && addDefault !== null){
                addDefault.setAttribute("checked", "true");
            }
            //console.log(addDefault);
            return;
        }
        else if(font === 'font-edu'){
            //console.log("2nd");
            elementName = 'font-radio-2';
        }
        else if(font === 'font-gummy'){
            //console.log("3rd");
            elementName = 'font-radio-3';
        }
        else if(font === 'font-kaushan'){
            //console.log("4th");
            elementName = 'font-radio-4';
        }

        let docElement = document.querySelector(`#${elementName}`);

        if(docElement !== undefined && docElement !== null){
            docElement.setAttribute("checked", "true");
        }

      }

      let filePicked = (e) => {

        let file = e.target.files[0];

        if(file === undefined || file === null){
            return;
        }

        let fileType = file.type;
        if(fileType.length < 6 || fileType.substring(0, 6) !== 'image/'){
            console.log("Image file type only");
            let fileChooser = document.querySelector("#image-input");
            fileChooser.value = '';
            return;
        }

        if(file){
            let reader = new FileReader();
            reader.onload = (readerEvent) => {
                //setImage(readerEvent.target.result);
                console.log("Image file size before adjustment:");
                console.log(readerEvent.target.result.length);
                compressImage(readerEvent.target.result);
            };
            reader.readAsDataURL(file);
        }
        checkEditedWarning();
    }

    function compressImage(fileData){

        let image = new Image();
        image.src = fileData;
          
        image.onload = () => {
    
            let adjustment = calculateAdjustment(image.width, image.height);
            let canvas = document.createElement('canvas');
            let canvasContext = canvas.getContext('2d');
    
            let adjustWidth = Math.round(image.width * adjustment);
            let adjustHeight = Math.round(image.height * adjustment);
    
            canvas.width = adjustWidth;
            canvas.height = adjustHeight;
            canvasContext.drawImage(image, 0, 0, adjustWidth, adjustHeight);
            
            /*
            console.log("Dimensions (Width then Height) Without Adjustment:");
            console.log(image.width);
            console.log(image.height);
            */
    
            canvas.toBlob((blob) => {
    
                let reader = new FileReader();
    
                reader.onload = (readerEvent) => {
                    console.log("Length of image file after adjustment");
                    console.log(readerEvent.target.result.length);
                    //printImageDimensions(readerEvent.target.result);
                    setImage(readerEvent.target.result);
                };
    
                reader.readAsDataURL(blob);
    
            }, "image/jpeg");
        };
       
    }

    function calculateAdjustment(startWidth, startHeight){

        let maxHeight = 480;
        let maxWidth = 480;
        let adjustment = 1;
    
        if(startWidth > startHeight){
          if(startWidth > maxWidth){
            adjustment = parseFloat((maxWidth/startWidth).toFixed(2));
          }
        }
        else if(startHeight > maxHeight){
          adjustment = parseFloat((maxHeight/startHeight).toFixed(2));
        }
    
        return adjustment;
    
    }

    function printImageDimensions(imageURL){

        let img = new Image();
        img.src = imageURL;
    
        img.onload = () => {
          console.log("Dimensions (Width then Height) With Adjustment:");
          console.log(img.width);
          console.log(img.height);
        };
    
    }

  return (
    <div className='flex flex-row justify-center w-full min-w-108 mt-10'>
        <form onSubmit={deploy} className='flex flex-col justify-start h-228 screen216:h-120 w-105 min-w-105 screen216:w-210 screen216:min-w-210 border border-black'>
            <div className='flex flex-col screen216:flex-row justify-start w-full h-216 screen216:h-108'>
                <div className='flex flex-col h-full w-full screen216:w-1/2 bg-slate-300'>

                    <div className="flex flex-col h-full w-full bg-purple-300">

                        <div className='h-48 w-full'>
                            <input type="text" required value={businessName} onChange={(e) => {setBusinessName(e.target.value); checkEditedWarning();}} id="businessName" className="mt-2 mb-2 ml-2 h-9 w-2/3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Business Name" />
                            <input type="text" required value={streetAddress} onChange={(e) => {setStreetAddress(e.target.value); checkEditedWarning();}} id="businessStreet" className="mb-2 ml-2 h-9 w-2/3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Street Address" />
                            <input type="text" required value={townAddress} onChange={(e) => {setTownAddress(e.target.value); checkEditedWarning();}} id="businessTown" className="mb-2 ml-2 h-9 w-2/3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Town Address" />
                            <div className='flex flex-row justify-start h-12 w-full'>
                                <div className='flex flex-col justify-center w-1/5 h-full'>
                                    <input type="text" required value={stateAddress} onChange={(e) => {setStateAddress(e.target.value); checkEditedWarning();}} id="businessState" className="mt-2 mb-2 ml-2 h-9 w-2/3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="State" />
                                </div>
                                <div className='flex flex-col justify-center w-4/5 h-full'>
                                    <input type="text" required value={zipAddress} onChange={(e) => {setZipAddress(e.target.value); checkEditedWarning();}} id="businessZip" className="mt-2 mb-2 ml-2 h-9 w-1/3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="ZIP Code" />
                                </div>
                            </div>
                        </div>

                        <div className='flex flex-col justify-center w-full h-15'>
                            <div className='flex flex-row justify-start w-full h-9'>
                                <input id="image-input" type="file"  onChange={(e)=>filePicked(e)} className="ml-2 w-2/3 h-full rounded-lg text-sm text-gray-900 border border-gray-300 cursor-pointer bg-gray-700 focus:outline-none dark:placeholder-gray-400 dark:border-gray-600 dark:text-white"></input>
                            </div>
                        </div>
                
                        <div className='flex flex-row justify-start mb-2 w-full h-12'>

                            <div className='flex flex-col justify-center ml-2 w-16 h-full'>
                                <div id="bgc-radio-1" numid="0" value="bg-stone-200" onClick={(e)=>printBGC(e)} className={`cursor-pointer rounded-md w-full mb-1 bg-stone-200 border-solid border-gray-700 ${selectorBGCArray[0]}`}></div>   
                            </div>
                    
                            <div className='flex flex-col justify-center ml-4 w-16 h-full'>
                                <div id="bgc-radio-2" numid="1" value="bg-gradient-to-l from-red-400 to-red-200" onClick={(e)=>printBGC(e)} className={`cursor-pointer rounded-md w-full mb-1 bg-gradient-to-l from-red-400 to-red-200 border-solid border-gray-700 ${selectorBGCArray[1]}`}></div>  
                            </div>

                            <div className='flex flex-col justify-center ml-4 w-16 h-full'>
                                <div id="bgc-radio-3" numid="2" value="bg-gradient-to-l from-orange-400 to-orange-200" onClick={(e)=>printBGC(e)} className={`cursor-pointer rounded-md w-full mb-1 bg-gradient-to-l from-orange-400 to-orange-200 border-solid border-gray-700 ${selectorBGCArray[2]}`}></div>
                            </div>

                            <div className='flex flex-col justify-center ml-4 w-16 h-full'>
                                <div id="bgc-radio-4" numid="3" value="bg-gradient-to-l from-yellow-400 to-yellow-200" onClick={(e)=>printBGC(e)} className={`cursor-pointer rounded-md w-full mb-1 bg-gradient-to-l from-yellow-400 to-yellow-200 border-solid border-gray-700 ${selectorBGCArray[3]}`}></div>
                            </div>

                        </div>

                        <div className='flex flex-row justify-start w-full h-12'>

                            <div className='flex flex-col justify-center ml-2 w-16 h-full'>
                                <div id="bgc-radio-5" numid="4" value="bg-gradient-to-l from-green-400 to-green-200" onClick={(e)=>printBGC(e)} className={`cursor-pointer rounded-md w-full mb-1 bg-gradient-to-l from-green-400 to-green-200 border-solid border-gray-700 ${selectorBGCArray[4]}`}></div>
                            </div>

                            <div className='flex flex-col justify-center ml-4 w-16 h-full'>
                                <div id="bgc-radio-6" numid="5" value="bg-gradient-to-l from-blue-400 to-blue-200" onClick={(e)=>printBGC(e)} className={`cursor-pointer rounded-md w-full mb-1 bg-gradient-to-l from-blue-400 to-blue-200 border border-solid border-gray-700 ${selectorBGCArray[5]}`}></div>
                            </div>

                            <div className='flex flex-col justify-center ml-4 w-16 h-full'>
                                <div id="bgc-radio-7" numid="6" value="bg-gradient-to-l from-indigo-400 to-indigo-200" onClick={(e)=>printBGC(e)} className={`cursor-pointer rounded-md w-full mb-1 bg-gradient-to-l from-indigo-400 to-indigo-200 border border-solid border-gray-700 ${selectorBGCArray[6]}`}></div>
                            </div>

                            <div className='flex flex-col justify-center ml-4 w-16 h-full'>
                                <div id="bgc-radio-8" numid="7" value="bg-gradient-to-l from-violet-400 to-violet-200" onClick={(e)=>printBGC(e)} className={`cursor-pointer rounded-md w-full mb-1 bg-gradient-to-l from-violet-400 to-violet-200 border border-solid border-gray-700 ${selectorBGCArray[7]}`}></div>
                            </div>

                        </div>


                        <div className='flex flex-row justify-around items-center mt-1 w-full h-16'>

                            <div className='flex flex-col w-24 h-14'>
                                <div className='w-full flex flex-row justify-center'>
                                    <div className='h-6 mb-1'>Default</div>
                                </div>
                                <div className='flex flex-row justify-center'>
                                    <input id="font-radio-1" type="radio" value="" name="font-radio" onChange={(e)=>printFont(e)} className="w-4 h-4 cursor-pointer appearance-none rounded-full border-2 border-gray-300 bg-gray-100 hover:bg-blue-400 checked:bg-blue-500"/>
                                </div>
                            </div>

                            <div className='flex flex-col w-24 h-14'>
                                <div className='w-full flex flex-row justify-center'>
                                    <div className='h-6 mb-1 font-edu'>Edu</div>
                                </div>
                                <div className='flex flex-row justify-center'>
                                    <input id="font-radio-2" type="radio" value="font-edu" name="font-radio" onChange={(e)=>printFont(e)} className="w-4 h-4 cursor-pointer appearance-none rounded-full border-2 border-gray-300 bg-gray-100 hover:bg-blue-400 checked:bg-blue-500"/>
                                </div>
                            </div>
                    
                            <div className='flex flex-col w-24 h-14'>
                                <div className='w-full flex flex-row justify-center'>
                                    <div className='h-6 mb-1 font-gummy'>Gummy</div>
                                </div>
                                <div className='flex flex-row justify-center'>
                                    <input id="font-radio-3" type="radio" value="font-gummy" name="font-radio" onChange={(e)=>printFont(e)} className="w-4 h-4 cursor-pointer appearance-none rounded-full border-2 border-gray-300 bg-gray-100 hover:bg-blue-400 checked:bg-blue-500"/>
                                </div>
                            </div>

                            <div className='flex flex-col w-24 h-14'>
                                <div className='w-full flex flex-row justify-center'>
                                    <div className='h-6 mb-1 font-kaushan'>Kaushan</div>
                                </div>
                                <div className='flex flex-row justify-center'>
                                    <input id="font-radio-4" type="radio" value="font-kaushan" name="font-radio" onChange={(e)=>printFont(e)} className="w-4 h-4 cursor-pointer appearance-none rounded-full border-2 border-gray-300 bg-gray-100 hover:bg-blue-400 checked:bg-blue-500"/>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>

                <div className="flex flex-row justify-center w-full screen216:w-1/2 h-full bg-slate-400">
                    <div className='flex flex-col justify-center w-9/10 h-full'>
                        <div className='w-full h-72 hover:shadow-2xl cursor-pointer border border-solid border-stone-500 hover:border-b-4 hover:border-l-4'>
                            <div className="h-full w-full">
                                
                                <div className={`flex flex-row justify-center items-center h-1/5 w-full ${cardColor}`}>
                                    <div className={`min-h-1/2 h-auto max-h-full w-auto max-w-full text-lg ${headerFont} break-words text-wrap overflow-y-hidden p-1`}>
                                        {(businessName.length > 41) ? businessName.substring(0, 41) + '...' : businessName}
                                    </div>
                                </div>
                                
                                <div className="h-3/5 bg-amber-950">
                                    <img className='h-full w-full object-contain' id="selectedImage" src={image} alt="Selected Image"></img>
                                </div>

                                
                                <div className={`flex flex-row justify-center items-center h-1/5 w-full ${cardColor}`}>
                                    <div className={`min-h-1/2 h-auto max-h-full w-auto max-w-full break-words text-wrap overflow-y-hidden p-1`}>
                                        {`${streetAddress} ${townAddress} ${stateAddress} ${zipAddress}`}
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex flex-row justify-start w-full h-12'>
              {setCardEditorBase()}
            </div>
        </form>
    </div>
    
    );
  
}

export default EditorSquare;

