import { useEffect, useState } from 'react';


import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider
} from 'react-router-dom';

import NavbarLayout from './layouts/NavbarLayout';
import HomePage from './pages/HomePage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import BusinessEditorPage from './pages/BusinessEditorPage';
import BusinessMenuPage from './pages/BusinessMenuPage';
import BusinessGraphsPage from './pages/BusinessGraphsPage';
import CartPage from './pages/CartPage';
import PastOrdersPage from './pages/PastOrdersPage';
import NotFoundPage from './pages/NotFoundPage';
import businesses from './businessData/businesses.json';
import { copyBusiness } from './appHelperFunctions/importBusinessFunctions';
import {checkFilterMatch, insertIntoFilteredArray} from './appHelperFunctions/sortHelperFunctions';
import {getDateFormatted, getCurrentDay, getCurrentHour, getLastSevenDaysIncomeSetup, replaceLastSevenDaysIncomeSetup} from './appHelperFunctions/dateFunctions';



const App = () => {

  let [blocksArray, setBlocksArray] = useState([]);
  let [clientArray, setClientArray] = useState([]);
  let [loginUsername, setLoginUsername] = useState('');
  let [loginType, setLoginType] = useState('');

  let[currentFilterList, setCurrentFilterList] = useState([]);

  useEffect(() => {

    let copiedBusinesses = [];
    businesses.forEach((business) => {
      let copy = copyBusiness(business);
      copiedBusinesses.push(copy);
    });

    let arr = [];
    let businessIndex = 0;
    let total = copiedBusinesses.length;

    while(businessIndex < total){

      let weekList = copiedBusinesses[businessIndex].weekIncome;
      let today = getCurrentDay();
      let todayIndex = -1;
      let temp = copiedBusinesses[businessIndex];

      weekList.forEach((weekDay, dayIndex) => {
        if(weekDay.name === today){
          todayIndex = dayIndex;
        }
      });

      if(todayIndex !== -1){
        
        let limit = weekList.length;
        let iteration = 0;
        let runningIndex = todayIndex;
        temp.weekIncome = [];
        
      
        while((iteration < limit) && (todayIndex !== runningIndex || iteration === 0)){
          
          let item = {
            name: null,
            income: null,
            hourlyOrders: []
          };

          item.name = weekList[runningIndex].name;
          item.income = weekList[runningIndex].income;
          weekList[runningIndex].hourlyOrders.forEach((hourlyOrder) => {
            item.hourlyOrders.push(hourlyOrder);
          });
          
          temp.weekIncome.push(item);
          runningIndex = ((runningIndex - 1) < 0) ? (limit - 1) : (runningIndex - 1);
          iteration++;
        }

      }
      
      arr.push(temp);
      businessIndex++;
      
    }

    setBlocksArray([...arr]);
    
  }, []);

  
  function printFilterItems(filterArray){
    
    //console.log("Here is the filter array");
    //console.log(filterArray);

    let resultArray = [];

    //first running through the businesses

    blocksArray.map((business, businessIndex) => {
      
      let summary = {
        businessIndex: businessIndex,
        filterMatches: 0,
        totalMatches: 0,
        businessMatches: []
      };

      //second running through the filterArray

      filterArray.map((filterItem) => {

        let count = 0;

        //now need to run through the menu of a business
        business.menu.map((sectionItems) => {

          sectionItems.items.map((item) => {

            if(checkFilterMatch(filterItem, item.itemName, item.itemDescription)){
              //console.log("Look here for answer:");
              //console.log(item.itemName);
              count++;
            }

          });
          
        });

        if(count > 0){
          summary.filterMatches++;
        }

        summary.totalMatches = summary.totalMatches + count;
        summary.businessMatches.push(count);
        
      });
   
      resultArray = insertIntoFilteredArray(resultArray, summary);

    });

    return resultArray;
    
  }

  function activateLogin(username, accountType){
    setLoginUsername(username);
    setLoginType(accountType);
  }

  function activateLogout(){
    setLoginUsername('');
    setLoginType('');
  }

  function findLoggedIndex(){

    let i = 0;
    let length = blocksArray.length;
    let returnValue = {
      found: false,
      foundIndex: -1
    };
 
    while(i < length){
      if(blocksArray[i].username === loginUsername){
        returnValue.foundIndex = i;
        returnValue.found = true;
      }
      i++;
    }

    return returnValue;
  }

  function findClientLoggedIndex(){

    let i = 0;
    let length = clientArray.length;
    let returnValue = {
      found: false,
      foundIndex: -1
    };
 
    while(i < length){
      if(clientArray[i].username === loginUsername){
        returnValue.foundIndex = i;
        returnValue.found = true;
      }
      i++;
    }

    return returnValue;
  }


  function getClientCart(){

    let cartDetails = {
      cart : null,
      businessName : null
    };

    let loggedIndex = findClientLoggedIndex();
    let i = loggedIndex.foundIndex;

    if(!loggedIndex.found){
      //console.log("No login found");
      return cartDetails;
    }

    if(clientArray[i].cart === undefined){
      //console.log("No array found");
      return cartDetails;
    }

    cartDetails.cart = [...clientArray[i].cart];
    cartDetails.businessName = (clientArray[i].cartOrderTo === undefined || clientArray[i].cartOrderTo === null) ? "Not Availiable" : clientArray[i].cartOrderTo;
    
    return cartDetails;
    
  }

  function countClientCart(){

    let loggedIndex = findClientLoggedIndex();
    let i = loggedIndex.foundIndex;

    if(!loggedIndex.found){
      //console.log("No login found");
      return -1;
    }

    if(clientArray[i].cart === undefined){
      //console.log("No array found"); 
      return -1;
    }

    return clientArray[i].cart.length;

  }

  function addItemToClientCart(cartItem, businessName){
    
    let loggedIndex = findClientLoggedIndex();
    let i = loggedIndex.foundIndex;

    if(!loggedIndex.found){
      //console.log("No login found");
      return;
    }

    let bigArray = clientArray;
    if(bigArray[i].cart === undefined){
      bigArray[i].cart = [cartItem];
      bigArray[i].cartOrderTo = businessName;
    }
    else{
      let currentCart = bigArray[i].cart;
      if(currentCart.length === 0){
        bigArray[i].cartOrderTo = businessName;
      }
      if(bigArray[i].cartOrderTo !== businessName){
        //console.log("Error: You can only place order to a single business at a time");
        return;
      }
      bigArray[i].cart = [...currentCart, cartItem];
    }

    setClientArray([...bigArray]);
  
  }

  function removeItemFromClientCart(itemIndex){

    let loggedIndex = findClientLoggedIndex();
    let i = loggedIndex.foundIndex;

    if(!loggedIndex.found){
      //console.log("No login found");
      return;
    }

    let bigArray = clientArray;
    if(bigArray[i].cart === undefined){
      //console.log("No cart found");
      return;
    }
    else if(bigArray[i].cart.length === 0){
      bigArray[i].cartOrderTo = null;
      //console.log("Cart already has zero items");
      return;
    }
    else{
      let currentCart = bigArray[i].cart;
      currentCart.splice(itemIndex, 1);
      bigArray[i].cart = [...currentCart];
      if(bigArray[i].cart.length === 0){
        bigArray[i].cartOrderTo = null;
      }
    }

    setClientArray([...bigArray]);
  
  }

  function getPastOrders(){

    let loggedIndex = findClientLoggedIndex();
    let i = loggedIndex.foundIndex;

    if(!loggedIndex.found){
      //console.log("No login found");
      return [];
    }

    if(clientArray[i].pastOrders === undefined || clientArray[i].pastOrders === null){
      //console.log("No array found"); 
      return [];
    }

    return [...clientArray[i].pastOrders];

  }

  function addToPastOrders(index, businessName, cartContents, totalPrice){

    getDateFormatted();

    let pastOrder = {
      business: businessName,
      contents: cartContents,
      time: getDateFormatted(),
      total: totalPrice
    };

    let returnValue = null;

    let bigArray = clientArray;

    if(bigArray[index].pastOrders === undefined || bigArray[index].pastOrders === null){
      returnValue = [pastOrder];
    }
    else{
      let temp = [pastOrder, ...bigArray[index].pastOrders];
      returnValue = [...temp];
    }

    return returnValue;

  }

  function completeClientOrder(){
    let loggedIndex = findClientLoggedIndex();
    let i = loggedIndex.foundIndex;

    if(!loggedIndex.found){
      //console.log("No login found");
      return;
    }

    let bigArray = clientArray;
    if(bigArray[i].cart === undefined){
      //console.log("Cart not found");
      return;
    }
    else{
      if(bigArray[i].cartOrderTo !== undefined && bigArray[i].cartOrderTo !== null){
        console.log(bigArray[i].cartOrderTo);
      }
      console.log(bigArray[i].cart);

      let totalPrice = 0.00;
      bigArray[i].cart.map((x) => {
        totalPrice = Math.round((totalPrice + parseFloat(x.itemPrice)) * 100)/100;
      });

      bigArray[i].pastOrders = addToPastOrders(i, bigArray[i].cartOrderTo, bigArray[i].cart, totalPrice);
      editPurchasedItems(bigArray[i].cartOrderTo, bigArray[i].cart, totalPrice);
      bigArray[i].cart = [];
      bigArray[i].cartOrderTo = null;
      setClientArray([...bigArray]);
    }

  }

  function getMenuFromID(stringID){

    let id = parseInt(stringID);
    let i = 0;
    let length = blocksArray.length;
    let returnValue = {
      businessName: null,
      menu: null
    }
    
    while(i < length){
      if(blocksArray[i].id === id){
        if(blocksArray[i].menu !== undefined && blocksArray[i].menuDeployed){
          returnValue.menu = [...blocksArray[i].menu];
        }
        if(blocksArray[i].name !== undefined){
          returnValue.businessName = blocksArray[i].name;
        }
        break;
      }
      i++;
    }

    return returnValue;
  }

  function addClient(client){

    let returnValue = {
      found: false,
      type: 0
    };

    let index = 0;
    let length = clientArray.length;

    while(index < length){

      let x = clientArray[index];

      if(x.username === client.username){
        //console.log("Here is the matched username:");
        //console.log(x.username);
        returnValue.found = true;
        returnValue.type = 1;
        return returnValue;
      }
      else if(x.email === client.email){
        //console.log("Here is the matched email:");
        //console.log(x.email);
        returnValue.found = true;
        returnValue.type = 2;
        return returnValue;
      }

      index++;

    }
    
    //console.log("Made it past the mapping stuff");

    client.id = clientArray.length;
    setClientArray([...clientArray, client]);
    return returnValue;

  }

  function addBlock(business){

    let returnValue = {
      found: false,
      type: 0
    };

    let index = 0;
    let length = blocksArray.length;

    while(index < length){

      let x = blocksArray[index];

      if(x.username === business.username){
        //console.log("Here is the matched username:");
        //console.log(x.username);
        returnValue.found = true;
        returnValue.type = 1;
        return returnValue;
      }
      else if(x.email === business.email){
        //console.log("Here is the matched email:");
        //console.log(x.email);
        returnValue.found = true;
        returnValue.type = 2;
        return returnValue;
      }

      index++;

    }

    //console.log("Made it past the mapping stuff");

    business.id = blocksArray.length;
    business.albumItems = [];
    business.purchasedItems = [];
    business.weekIncome = getLastSevenDaysIncomeSetup();
    setBlocksArray([...blocksArray, business]);
    return returnValue;
    
  }


  function getTopSoldItems(){

    let returnValue = {
      items: [],
      percentage: -1,
      otherTotal: 0
    };

    let loggedIndex = findLoggedIndex();

    if(!loggedIndex.found){
      //console.log("No login found");
      return returnValue;
    }

    let arr = blocksArray;
    let list = arr[loggedIndex.foundIndex].purchasedItems;

    let i = 0;
    let limit = 5;
    let size = list.length;


    while(i < limit && i < size){

      let item = {
        name: list[i].name,
        count: list[i].count
      };

      returnValue.items.push(item);
      i++;

    }

    let totalCount  = 0;
    let topFiveCount = 0;
    let otherTotal = 0;

    list.map((x) => {
      totalCount = x.count + totalCount;
    });

    returnValue.items.map((x) => {
      topFiveCount = x.count + topFiveCount;
    });

    if(totalCount > 0){
      returnValue.percentage = Math.ceil( (topFiveCount/totalCount) * 100 );
    }
    
    otherTotal = totalCount - topFiveCount;
    returnValue.otherTotal = otherTotal;

    return returnValue;

  }

  function getWeekRevenue(){

    let returnValue = {
      weekdays: [],
    };

    let loggedIndex = findLoggedIndex();

    if(!loggedIndex.found){
      //console.log("No login found");
      return returnValue;
    }

    let arr = blocksArray;
    let weekList = arr[loggedIndex.foundIndex].weekIncome;
    
    weekList.forEach((x) => {

      let item = {
        name: x.name,
        income: x.income,
        hourlyOrders: [...x.hourlyOrders]
      };

      returnValue.weekdays.push(item);

    });
    
    return returnValue;
    
  }

  function editPurchasedItems(businessName, newPurchasedList, orderTotal){

    let bigArray = blocksArray;
    let bigIndex = 0;
    let bigSize = blocksArray.length;
    let businessID = -1;

    while(bigIndex < bigSize){
      if(bigArray[bigIndex].name === businessName){
        businessID = bigIndex;
      }
      bigIndex++;
    }

    if(businessID === -1){
      return;
    }

    let tempPurchasedItems =  [...bigArray[businessID].purchasedItems];

    newPurchasedList.map((item) => {

      let name = item.itemName;
      let index = 0;
      let size = tempPurchasedItems.length;
      let found = false;

      while(index < size){
        if(tempPurchasedItems[index].name === name){
          tempPurchasedItems[index].count = tempPurchasedItems[index].count + 1;
          found = true;
          break;
        }
        index++;
      }

      if(found === false){
        
        let newItem = {
          name: name,
          count: 1
        };
        tempPurchasedItems.push(newItem);
        
      }

    });

    if(tempPurchasedItems.length > 1){
      tempPurchasedItems.sort((a, b) => a.count > b.count ? -1 : 1);
    }

    bigArray[businessID].purchasedItems = [...tempPurchasedItems];
    
    if(bigArray[businessID].weekIncome[0].name === getCurrentDay()){
      let oldTotal = bigArray[businessID].weekIncome[0].income;
      bigArray[businessID].weekIncome[0].income = oldTotal + orderTotal;
    }
    else{
      let oldWeekIncome = bigArray[businessID].weekIncome;
      bigArray[businessID].weekIncome = replaceLastSevenDaysIncomeSetup(oldWeekIncome);
      bigArray[businessID].weekIncome[0].income = orderTotal;
    }
  
    let hourIndex = getCurrentHour();
    let newHourOrderCount = bigArray[businessID].weekIncome[0].hourlyOrders[hourIndex] + 1;
    bigArray[businessID].weekIncome[0].hourlyOrders[hourIndex] = newHourOrderCount;

    setBlocksArray([...bigArray]);
  
  }

  function turnOffAlbumDeployment(){

    let loggedIndex = findLoggedIndex();

    if(!loggedIndex.found){
      //console.log("No login found");
      return;
    }

    let arr = blocksArray;
    arr[loggedIndex.foundIndex].albumDeployed = false;
    setBlocksArray([...arr]);

  }

  function editAlbum(albumArray){

    let loggedIndex = findLoggedIndex();

    if(!loggedIndex.found){
      //console.log("No login found");
      return false;
    }

    let bigArray = blocksArray;
    bigArray[loggedIndex.foundIndex].albumItems = [...albumArray];
    bigArray[loggedIndex.foundIndex].albumDeployed = true;

    setBlocksArray([...bigArray]);

    return true;
  
  }

  function getAlbumItems(){

    let loggedIndex = findLoggedIndex();

    if(!loggedIndex.found){
      //console.log("No login found");
      return null;
    }

    let i = loggedIndex.foundIndex;
  
    let details = {
      album: [...blocksArray[i].albumItems],
      deployed: ((blocksArray[i].albumDeployed) ? true : false)
    };

    return details;

  }

  function getAlbumItemsWithID(id){

    if(id < 0 || id >= blocksArray.length){
      return [];
    }

    if(blocksArray[id].albumDeployed === false){
      return [];
    }

    return [...blocksArray[id].albumItems];

  }

  function turnOffDeployment(){
    let loggedIndex = findLoggedIndex();

    if(!loggedIndex.found){
      //console.log("No login found");
      return;
    }

    let arr = blocksArray;
    arr[loggedIndex.foundIndex].deployed = false;
    setBlocksArray([...arr]);

  }

  function editBlockCard(cardDetails){

    let loggedIndex = findLoggedIndex();

    if(!loggedIndex.found){
      //console.log("No login found");
      return false;
    }

    let arr = blocksArray;
    arr[loggedIndex.foundIndex].name = cardDetails.name;
    arr[loggedIndex.foundIndex].street = cardDetails.street;
    arr[loggedIndex.foundIndex].town = cardDetails.town;
    arr[loggedIndex.foundIndex].state = cardDetails.state;
    arr[loggedIndex.foundIndex].zip = cardDetails.zip;
    arr[loggedIndex.foundIndex].color = cardDetails.color;
    arr[loggedIndex.foundIndex].image = cardDetails.image;
    arr[loggedIndex.foundIndex].font = cardDetails.font;
    arr[loggedIndex.foundIndex].deployed = cardDetails.deployed;
    
    setBlocksArray([...arr]);
    return true;
  
  }

  function turnOffMenuDeployment(){

    let loggedIndex = findLoggedIndex();

    if(!loggedIndex.found){
      //console.log("No login found");
      return;
    }

    let arr = blocksArray;
    arr[loggedIndex.foundIndex].menuDeployed = false;
    setBlocksArray([...arr]);

  }

  function editBlockMenu(menuArray){

    let loggedIndex = findLoggedIndex();

    if(!loggedIndex.found){
      //console.log("No login found");
      return false;
    }

    let bigArray = blocksArray;
    bigArray[loggedIndex.foundIndex].menu = [...menuArray];
    bigArray[loggedIndex.foundIndex].menuDeployed = true;

    setBlocksArray([...bigArray]);

    return true;
  
  }

  function editMenuSections(sectionArray){
    let loggedIndex = findLoggedIndex();

    if(!loggedIndex.found){
      //console.log("No login found");
      return false;
    }

    let bigArray = blocksArray;
    bigArray[loggedIndex.foundIndex].menuSections = [...sectionArray];
    setBlocksArray([...bigArray]);
    return true;
  }

  function getBlockCard(){

    let loggedIndex = findLoggedIndex();

    if(!loggedIndex.found){
      //console.log("No login found");
      return null;
    }

    let details = {
      name: blocksArray[loggedIndex.foundIndex].name,
      street: blocksArray[loggedIndex.foundIndex].street,
      town: blocksArray[loggedIndex.foundIndex].town,
      state: blocksArray[loggedIndex.foundIndex].state,
      zip: blocksArray[loggedIndex.foundIndex].zip,
      color: blocksArray[loggedIndex.foundIndex].color,
      image: blocksArray[loggedIndex.foundIndex].image,
      font: blocksArray[loggedIndex.foundIndex].font,
      deployed: blocksArray[loggedIndex.foundIndex].deployed
    };

    return details;

  }

  function getBlockMenu(){

    let loggedIndex = findLoggedIndex();

    let details = {
      menuDeployed: false
    };

    if(!loggedIndex.found){
      //console.log("No login found");
      return null;
    }

    if(blocksArray[loggedIndex.foundIndex].menu === undefined){
      //console.log("No array found");
      return details;
    }

    details.menu = [...blocksArray[loggedIndex.foundIndex].menu];
    details.menuDeployed = blocksArray[loggedIndex.foundIndex].menuDeployed;

    return details;

  }

  function getBlockMenuSections(){

    let loggedIndex = findLoggedIndex();

    if(!loggedIndex.found){
      //console.log("No login found");
      return null;
    }

    if(blocksArray[loggedIndex.foundIndex].menuSections === undefined){
      //console.log("No array found");
      return null; 
    }

    let details = {
      menuSections: [...blocksArray[loggedIndex.foundIndex].menuSections]
    };

    return details;

  }

  let printBoth = (e) => {
    console.log(blocksArray);
    console.log(clientArray);
  }


  let router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<NavbarLayout loginUsername={loginUsername} activateLogout={activateLogout} loginType={loginType} countClientCart={countClientCart} getClientCart={getClientCart} completeClientOrder={completeClientOrder} removeItemFromClientCart={removeItemFromClientCart}/>}>
        <Route index element={<HomePage blocksArray={blocksArray} printBoth={printBoth} printFilterItems={printFilterItems} currentFilterList={currentFilterList} setCurrentFilterList={setCurrentFilterList} loginUsername={loginUsername}/>}/>
        <Route path='/signup' element={<SignUpPage addBlock={addBlock} addClient={addClient}/>}/>
        <Route path='/login' element={<LoginPage activateLogin={activateLogin} blocksArray={blocksArray} clientArray={clientArray}/>}/>
        <Route path='/businesseditor' element={<BusinessEditorPage turnOffDeployment={turnOffDeployment} turnOffMenuDeployment={turnOffMenuDeployment} getBlockCard={getBlockCard} getBlockMenu={getBlockMenu} editBlockCard={editBlockCard} editBlockMenu={editBlockMenu} getAlbumItems={getAlbumItems} editAlbum={editAlbum} turnOffAlbumDeployment={turnOffAlbumDeployment} editMenuSections={editMenuSections} getBlockMenuSections={getBlockMenuSections} blocksArray={blocksArray}/>}/>
        <Route path='/businessgraphs' element={<BusinessGraphsPage getTopSoldItems={getTopSoldItems} getWeekRevenue={getWeekRevenue}/>}/>
        <Route path='/businessmenu/:id' element={<BusinessMenuPage getMenuFromID={getMenuFromID} addItemToClientCart={addItemToClientCart} getAlbumItemsWithID={getAlbumItemsWithID} currentFilterList={currentFilterList} loginUsername={loginUsername}/>}/>
        <Route path='/cart' element={<CartPage getClientCart={getClientCart} completeClientOrder={completeClientOrder} removeItemFromClientCart={removeItemFromClientCart}/>}/>
        <Route path='/pastorders' element={<PastOrdersPage getPastOrders={getPastOrders}/>}/>
        <Route path='*' element={<NotFoundPage/>} />
      </Route>
    )
  );

  return <RouterProvider router={router}/>; 
}

export default App

