export function getDateFormatted(){
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


    return `${h}${minString} ${mer} ${month}/${day}/${year}`;

}

export function getLastSevenDays(){

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

export function getHoursArray(){

  let hours = [];
  let i = 0;
  let limit = 24;

  while(i < limit){
    hours.push(0);
    i++;
  }

  return hours;
}

export function getCurrentDay(){

  let weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let d = new Date();
  let index = d.getDay();
  return weekdays[index];

}

export function getCurrentHour(){
  //let hours = [ "12AM","1AM","2AM","3AM","4AM","5AM","6AM","7AM","8AM","9AM","10AM","11AM","12PM","1PM","2PM","3PM","4PM","5PM","6PM","7PM","8PM","9PM","10PM","11PM"];
  let d = new Date();
  let index = d.getHours();
  return index;
}

export function getLastSevenDaysIncomeSetup(){

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

export function replaceLastSevenDaysIncomeSetup(oldIncomeSetup){

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