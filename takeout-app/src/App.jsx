import { useEffect, useState } from 'react';
//import { createContext } from 'react';

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
import cozyCafe from './blockImages/cozyCafe.jpg';
import lepeepFront from './blockImages/lepeepFront.jpg';
import koyGrill from './blockImages/koyGrill.jpg';
import orchidAsian from './blockImages/orchidAsian.jpg';

import businesses from './businessData/businesses.json';
//import BusinessesContext from './contexts/BusinessesContext';

const App = () => {

  let [blocksArray, setBlocksArray] = useState([]);
  let [clientArray, setClientArray] = useState([]);
  let [loginUsername, setLoginUsername] = useState('');
  let [loginType, setLoginType] = useState('');

  let[currentFilterList, setCurrentFilterList] = useState([]);

  useEffect(() => {

    let arr = [];
    businesses.map((x) => {
      //x.weekIncome = getLastSevenDaysIncomeSetup();
      arr.push(x);
    });
    setBlocksArray([...arr]);

    //let business1 = {name: 'Koy Grill', street: '336 NJ-18 N', town: 'East Brunswick', state: 'NJ', zip: '08816', color: 'bg-gradient-to-l from-green-400 to-green-200', image: koyGrill, font: '', deployed: true, username: 'B1', email: 'e1', password: 'p1', albumItems: [], purchasedItems: [], weekIncome: getLastSevenDaysIncomeSetup(), menuDeployed:true, menu: [{ name: 'Menu', items: [{itemName: 'Red Lentil Soup + 1 Pita', itemPrice: '7.00', itemDescription: 'A traditional red lentil pureed soup. Served with 1 Pita.'}, {itemName: 'Hummus + 2 Pita', itemPrice: '9.00', itemDescription: 'Pureed chickpeas blended with tahini, olive oil, lemon juice, garlic & spices.'}, {itemName: 'Chicken Gyro + 1 Pita', itemPrice: '21.00', itemDescription: ''}, {itemName: 'Lamb Gyro + 1 Pita', itemPrice: '22.00', itemDescription: ''}]}], id: 0};
    //let business2 = {name: 'Orchid Fine Asian Cuisine', street: '647 NJ-18', town: 'East Brunswick', state: 'NJ', zip: '08816', color: 'bg-gradient-to-l from-yellow-400 to-yellow-200', image: orchidAsian, font: '', deployed: true, username: 'B2', email: 'e2', password: 'p2', albumItems: [], purchasedItems: [], weekIncome: getLastSevenDaysIncomeSetup(), menuDeployed:true, menu: [{name: 'Specials', items: [{itemName: 'Egg Roll', itemPrice: '1.50', itemDescription: ''}, {itemName: 'Wonton Soup', itemPrice: '2.25', itemDescription: ''}, {itemName: 'Egg Fried Rice', itemPrice: '3.75', itemDescription: ''}, {itemName: 'Sesame Chicken', itemPrice: '7.50', itemDescription: ''}, {itemName: 'Chicken w. Broccoli', itemPrice: '7.00', itemDescription: ''}, {itemName: 'Roast Pork w. Mixed Veggies', itemPrice: '7.00', itemDescription: ''}]}], id: 1};
    //let business4 = {name: 'Le Peep', street: '561 US-1', town: 'Edison', state: 'NJ', zip: '08817', color: 'bg-gradient-to-l from-blue-400 to-blue-200', image: lepeepFront, font: '', deployed: true, username: 'B3', email: 'e3', password: 'p3', albumItems: [], purchasedItems: [], weekIncome: getLastSevenDaysIncomeSetup(), menuDeployed:true, menu: [{name: 'Breakfast Favorites', items: [{itemName: 'Nutty Oatmeal', itemPrice: '7.49', itemDescription: 'Steel cut oats topped with strawberries, bananas, walnuts, and almonds. We drizzle agave syrup on top. Served with a bagel and cream cheese'}, {itemName: 'Salmon & Bagel', itemPrice: '9.99', itemDescription: 'Pacific Smoked Salmon, cream cheese, onion, tomatoes, capers and a toasted bagel.'}, {itemName: 'Eighteen Wheeler', itemPrice: '11.49', itemDescription: 'Two slices of French toast, a pair of eggs and a choice of two pieces of bacon, sausage, turkey sausage or turkey bacon and potatoes.'}, {itemName:'Banana Fosters Waffle', itemPrice: '9.99', itemDescription: "Fresh bananas sauteed in cinnamon, brown sugar and butter and poured over a crispy Belgian waffle."}, {itemName: 'Crab Cake Benedict', itemPrice: '11.99', itemDescription: 'Ahoy there! Catch two crab cakes and top them with a pair of poached eggs. Cover it with hollandaise and be on your way.'}]}], id: 2};
    //let business5 = {name: 'COZY CAFE', street: '2638 County Rd 516', town: 'Old Bridge', state: 'NJ', zip: '08857', color: 'bg-gradient-to-l from-indigo-400 to-indigo-200', image: cozyCafe, font: '', deployed: true, username: 'B4', email: 'e4', password: 'p4', albumItems: [], purchasedItems: [], weekIncome: getLastSevenDaysIncomeSetup(), menuDeployed:true, menu: [{name: 'Favorites', items: [{itemName: "Three Eggs with Home Fries", itemPrice:'6.50', itemDescription: ''}]}, {name: 'Sides', items: [{itemName: 'Hash Brown', itemPrice: '3.00', itemDescription: ''}]}], id: 3};
    
  }, []);

  function getNumberOfDeployedCards(){

    let count = 0;

    blocksArray.map((x) => {
      if(x.deployed){
        count++;
      }
    });
    return count;

  }

  function removePunctuationCheck(filterWord, word){

    let size = word.length;

    if(size > 1){
      if(filterWord === word.slice(0, size - 1)){
        return true;
      }
    }

    if(size > 2){
      if('(' === word.charAt(0) && ')' === word.charAt(size - 1) && filterWord === word.slice(1, size - 1)){
        return true;
      }
    }
    return false;

  }

  function checkFilterMatch(filterItem, itemName, itemDescription){

    let filterSentence = filterItem.toLowerCase().split(" ");
    let nameSentence = itemName.toLowerCase().split(" ");
    
    let nameLength = nameSentence.length;
    let nameIndex = 0;

    if(nameLength > 0 && nameSentence[0] !== ""){

      while(nameIndex < nameLength){

        if(nameSentence[nameIndex] === filterSentence[0] || removePunctuationCheck(filterSentence[0], nameSentence[nameIndex])){

          let filterLength = filterSentence.length;
          let filterIndex = 1;
          let copyNameIndex = nameIndex + 1;
          let nameMatch = true;
          while((filterIndex < filterLength) && (copyNameIndex < nameLength)){
            if(nameSentence[copyNameIndex] !== filterSentence[filterIndex]){
              if(removePunctuationCheck(filterSentence[filterIndex], nameSentence[copyNameIndex]) === false){
                nameMatch = false;
                break;
              }
            }
            filterIndex++;
            copyNameIndex++;
          }

          if(nameMatch){
            return true;
          }

        }
        nameIndex++;
     }

    }

    let descriptionSentence = itemDescription.toLowerCase().split(" ");
    let descriptionLength = descriptionSentence.length;
    let descriptionIndex = 0;

    if(descriptionLength > 0 && descriptionSentence[0] !== ""){

      while(descriptionIndex < descriptionLength){

        if(descriptionSentence[descriptionIndex] === filterSentence[0] || removePunctuationCheck(filterSentence[0], descriptionSentence[descriptionIndex])){

          let filterLength = filterSentence.length;
          let filterIndex = 1;
          let copyDescriptionIndex = descriptionIndex + 1;
          let descriptionMatch = true;
          while((filterIndex < filterLength) && (copyDescriptionIndex < descriptionLength)){
            if(descriptionSentence[copyDescriptionIndex] !== filterSentence[filterIndex]){
              if(removePunctuationCheck(filterSentence[filterIndex], descriptionSentence[copyDescriptionIndex]) === false){
                descriptionMatch = false;
                break;
              }
            }
            filterIndex++;
            copyDescriptionIndex++;
          }

          if(descriptionMatch){
            return true;
          }

        }
        descriptionIndex++;
     }
     
    }
    
  }


  function printFilterItems(filterArray){
    
    console.log("Here is the filter array");
    console.log(filterArray);


  
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
              console.log("Look here for answer:");
              console.log(item.itemName);
              count++;
            }

            /*
            if(item.itemName.toLowerCase().includes(filterItem.toLowerCase())){
              console.log(item.itemName);
              count++;
            }
            */
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

  function insertIntoFilteredArray(array, item){

    let newList = null;
    let resultArray = [...array];
    let resultIndex = 0;
    let size = resultArray.length;
    let foundIndex = -1;

    while(resultIndex < size){
      if(item.filterMatches > resultArray[resultIndex].filterMatches){
        foundIndex = resultIndex;
        break;
      }
      if(item.filterMatches === resultArray[resultIndex].filterMatches && item.totalMatches > resultArray[resultIndex].totalMatches){
        foundIndex = resultIndex;
        break;
      }
      resultIndex++;
    }

    if(foundIndex === -1){
      //resultArray.push(summary);
      newList = [...array, item];
    }
    else if(foundIndex === 0){
      newList = [item, ...array];
    }
    else{
      newList = [...array.slice(0, foundIndex), item, ...array.slice(foundIndex)];
    }

    return newList;

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
      console.log("No login found");
      //return null;
      return cartDetails;
    }

    if(clientArray[i].cart === undefined){
      console.log("No array found");
      //return null; 
      return cartDetails;
    }

    cartDetails.cart = [...clientArray[i].cart];
    cartDetails.businessName = (clientArray[i].cartOrderTo === undefined || clientArray[i].cartOrderTo === null) ? "Not Availiable" : clientArray[i].cartOrderTo;
    //return [...clientArray[i].cart]

    return cartDetails;
    
  }

  function countClientCart(){

    let loggedIndex = findClientLoggedIndex();
    let i = loggedIndex.foundIndex;

    if(!loggedIndex.found){
      console.log("No login found");
      return -1;
    }

    if(clientArray[i].cart === undefined){
      console.log("No array found"); 
      return -1;
    }

    return clientArray[i].cart.length;

  }

  function addItemToClientCart(cartItem, businessName){

    //console.log("Inside addItemToClientCart, and here is the businessName:");
    //console.log(businessName);
    
    let loggedIndex = findClientLoggedIndex();
    let i = loggedIndex.foundIndex;

    if(!loggedIndex.found){
      console.log("No login found");
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
        console.log("Error: You can only place order to a single business at a time");
        return;
      }
      bigArray[i].cart = [...currentCart, cartItem];
    }

    /*
    console.log("New Cart:");
    console.log(bigArray[i].cartOrderTo);
    console.log(bigArray[i].cart);
    */

    setClientArray([...bigArray]);
  
  }

  function removeItemFromClientCart(itemIndex){

    let loggedIndex = findClientLoggedIndex();
    let i = loggedIndex.foundIndex;

    if(!loggedIndex.found){
      console.log("No login found");
      return;
    }

    let bigArray = clientArray;
    if(bigArray[i].cart === undefined){
      console.log("No cart found");
      return;
    }
    else if(bigArray[i].cart.length === 0){
      bigArray[i].cartOrderTo = null;
      console.log("Cart already has zero items");
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

    /*
    console.log("New Cart:");
    console.log(bigArray[i].cart);
    */

    setClientArray([...bigArray]);
  
  }

  function getPastOrders(){

    /*
    let ordersDetails = {
      orders : null,
    };
    */

    let loggedIndex = findClientLoggedIndex();
    let i = loggedIndex.foundIndex;

    if(!loggedIndex.found){
      console.log("No login found");
      //return ordersDetails;
      return [];
    }

    if(clientArray[i].pastOrders === undefined || clientArray[i].pastOrders === null){
      console.log("No array found"); 
      //return ordersDetails;
      return [];
    }

    return [...clientArray[i].pastOrders];

    //return ordersDetails;

  }

  function getDateFormatted(){
    let date = new Date();
    let year = date.getFullYear();
    let month = parseInt(date.getMonth()) + 1;
    let day = date.getDate();
    let hour = parseInt(date.getHours());
    let minute = parseInt(date.getMinutes());
    let mer = (hour < 12) ? 'AM' : 'PM';
    let minString = (minute > 9) ? (':' + minute) : (':0' + minute);
    let h = 0;

    if(hour === 0){
      h = 12;
    }
    else if(hour > 12){
      h = hour - 12;
    }
    else{
      h = hour;
    }

    //console.log(`Order Placed At: ${h}${minString} ${mer} ${month}/${day}/${year}`);

    return `${h}${minString} ${mer} ${month}/${day}/${year}`;

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
      //bigArray[index].pastOrders = [pastOrder];
      returnValue = [pastOrder];
    }
    else{
      let temp = [pastOrder, ...bigArray[index].pastOrders];
      //bigArray[index].pastOrders = [...temp];
      returnValue = [...temp];
    }

    return returnValue;

  }

  function completeClientOrder(){
    let loggedIndex = findClientLoggedIndex();
    let i = loggedIndex.foundIndex;

    if(!loggedIndex.found){
      console.log("No login found");
      return;
    }

    let bigArray = clientArray;
    if(bigArray[i].cart === undefined){
      console.log("Cart not found");
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
    //let menu = null;
 
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

    //return menu;
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
        console.log("Here is the matched username:");
        console.log(x.username);
        returnValue.found = true;
        returnValue.type = 1;
        return returnValue;
      }
      else if(x.email === client.email){
        console.log("Here is the matched email:");
        console.log(x.email);
        returnValue.found = true;
        returnValue.type = 2;
        return returnValue;
      }

      index++;

    }
    
    console.log("Made it past the mapping stuff");

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
        console.log("Here is the matched username:");
        console.log(x.username);
        returnValue.found = true;
        returnValue.type = 1;
        return returnValue;
      }
      else if(x.email === business.email){
        console.log("Here is the matched email:");
        console.log(x.email);
        returnValue.found = true;
        returnValue.type = 2;
        return returnValue;
      }

      index++;

    }

    console.log("Made it past the mapping stuff");

    business.id = blocksArray.length;
    business.albumItems = [];
    business.purchasedItems = [];
    business.weekIncome = getLastSevenDaysIncomeSetup();
    setBlocksArray([...blocksArray, business]);
    return returnValue;
    
  }

  /*
  function removeAlbumItem(deleteIndex){

    let loggedIndex = findLoggedIndex();

    if(!loggedIndex.found){
      console.log("No login found");
      return;
    }

    let index = loggedIndex.foundIndex;

    let arr = blocksArray;
    let oldList = [...arr[index].albumItems];
    let newList = null;
    let size = oldList.length;

    console.log("Inside removeAlbumItem");
    console.log(deleteIndex);

    if(deleteIndex === 0){
      if(size > 1){
        newList = [...oldList.slice(1)];
      }
      else{
        newList = [];
      }
    }
    else{
      newList = [...oldList.slice(0, deleteIndex), ...oldList.slice(deleteIndex + 1)]
    }

    arr[index].albumItems = [...newList];
    setBlocksArray([...arr]);

  }
  */

  /*
  function addAlbumItem(name, newItem){

    let loggedIndex = findLoggedIndex();

    if(!loggedIndex.found){
      console.log("No login found");
      return;
    }

    let i = loggedIndex.foundIndex;
    let arr = blocksArray;
    let newList = [...arr[i].albumItems, {title: name, image: newItem}];
    arr[i].albumItems = [...newList];
    setBlocksArray([...arr]);

  }
  */

  function replaceLastSevenDaysIncomeSetup(oldIncomeSetup){

    let newIncomeSetup = getLastSevenDaysIncomeSetup();
    let index = 0;
    let oldIndex = 0;
    let size = newIncomeSetup.length;

    while(index < size){
      if(newIncomeSetup[index].name === oldIncomeSetup[0].name){
        break;
      }
      index++;
    }

    let hourIndex = 0;
    let hourLimit = 24;

    while(index < size){
      newIncomeSetup[index].income = oldIncomeSetup[oldIndex].income;
      while(hourIndex < hourLimit){
        newIncomeSetup[index].hourlyOrders[hourIndex] = oldIncomeSetup[oldIndex].hourlyOrders[hourIndex];
        hourIndex++;
      }
      index++;
      oldIndex++;
      hourIndex = 0;
    }

    return newIncomeSetup;

  }

  function getLastSevenDaysIncomeSetup(){

    let weekOrder = getLastSevenDays();
    let weekIncomes = [];

    weekOrder.map((x) => {
      let dayInfo = {
        name: x,
        income: 0,
        hourlyOrders: getHoursArray()
      };
      weekIncomes.push(dayInfo);
    });

    return weekIncomes;

  }

  function getCurrentDay(){

    let weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let d = new Date();
    let index = d.getDay();
    return weekdays[index];

  }

  function getCurrentHour(){
    //let hours = [ "12AM","1AM","2AM","3AM","4AM","5AM","6AM","7AM","8AM","9AM","10AM","11AM","12PM","1PM","2PM","3PM","4PM","5PM","6PM","7PM","8PM","9PM","10PM","11PM"];
    let d = new Date();
    let index = d.getHours();
    return index;
  }

  function getHoursArray(){

    let hours = [];
    let i = 0;
    let limit = 24;

    while(i < limit){
      hours.push(0);
      i++;
    }

    return hours;
  }

  function getLastSevenDays(){

    let weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let weekorder = [];
    let d = new Date();
    let startIndex = d.getDay();
    let limit = 7;

    while(limit > 0){
      weekorder.push(weekdays[startIndex]);
      if(startIndex === 0){
        startIndex = 6;
      }
      else{
        startIndex--;
      }
      limit--;
    }

    return weekorder;
    
  }

  function getTopSoldItems(){

    let returnValue = {
      items: [],
      percentage: -1,
      otherTotal: 0
    };

    let loggedIndex = findLoggedIndex();

    if(!loggedIndex.found){
      console.log("No login found");
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
      console.log("No login found");
      return returnValue;
    }

    let arr = blocksArray;
    let weekList = arr[loggedIndex.foundIndex].weekIncome;

    weekList.map((x) => {

      let item = {
        name: null,
        income: 0,
        hourlyOrders: []
      };

      item.name = x.name;
      item.income = x.income;

      x.hourlyOrders.map((x2) => {
        item.hourlyOrders.push(x2);
      })

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
      console.log("No login found");
      return;
    }

    let arr = blocksArray;
    arr[loggedIndex.foundIndex].albumDeployed = false;
    setBlocksArray([...arr]);

  }

  function editAlbum(albumArray){

    let loggedIndex = findLoggedIndex();

    if(!loggedIndex.found){
      console.log("No login found");
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
      console.log("No login found");
      //return [];
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
      console.log("No login found");
      return;
    }

    let arr = blocksArray;
    arr[loggedIndex.foundIndex].deployed = false;
    setBlocksArray([...arr]);

  }

  function editBlockCard(cardDetails){

    let loggedIndex = findLoggedIndex();

    if(!loggedIndex.found){
      console.log("No login found");
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
      console.log("No login found");
      return;
    }

    let arr = blocksArray;
    arr[loggedIndex.foundIndex].menuDeployed = false;
    setBlocksArray([...arr]);

  }

  function editBlockMenu(menuArray){

    let loggedIndex = findLoggedIndex();

    if(!loggedIndex.found){
      console.log("No login found");
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
      console.log("No login found");
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
      console.log("No login found");
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
      console.log("No login found");
      return null;
    }

    if(blocksArray[loggedIndex.foundIndex].menu === undefined){
      console.log("No array found");
      return details;
    }

    details.menu = [...blocksArray[loggedIndex.foundIndex].menu];
    details.menuDeployed = blocksArray[loggedIndex.foundIndex].menuDeployed;

    /*
    let details = {
      menu: [...blocksArray[loggedIndex.foundIndex].menu],
      menuDeployed: blocksArray[loggedIndex.foundIndex].menuDeployed
    };
    */

    return details;

  }

  function getBlockMenuSections(){

    let loggedIndex = findLoggedIndex();

    if(!loggedIndex.found){
      console.log("No login found");
      return null;
    }

    if(blocksArray[loggedIndex.foundIndex].menuSections === undefined){
      console.log("No array found");
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
        <Route index element={<HomePage blocksArray={blocksArray} printBoth={printBoth} printFilterItems={printFilterItems} currentFilterList={currentFilterList} setCurrentFilterList={setCurrentFilterList}/>}/>
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

//<Route index element={<BusinessesContext.Provider value={{count, setCount}}><HomePage blocksArray={blocksArray}/></BusinessesContext.Provider>}/>
//<Route path='/signup' element={<BusinessesContext.Provider value={{count, setCount}}><SignUpPage addBlock={addBlock}/></BusinessesContext.Provider>}/>

//<Route index element={<BusinessesContext.Provider value={{count, setCount}}><HomePage blocksArray={blocksArray}/></BusinessesContext.Provider>}/>
//<Route path='/signup' element={<BusinessesContext.Provider value={{count, setCount}}><SignUpPage addBlock={addBlock}/></BusinessesContext.Provider>}/>

//<Route index element={<HomePage blocksArray={blocksArray} count={count} setCount={setCount}/>}/>
//<Route path='/signup' element={<SignUpPage addBlock={addBlock} count={count} setCount={setCount}/>}/>