export function copyBusiness(business){
    let obj = {
      albumItems : [],
      albumDeployed: business.albumDeployed,
      color: business.color,
      deployed: business.deployed,
      email: business.email,
      font: business.font,
      id: business.id,
      image: business.image,
      menu: [],
      menuDeployed: business.menuDeployed,
      name: business.name,
      password: business.password,
      purchasedItems: [],
      state: business.state,
      street: business.street,
      town: business.town,
      username: business.username,
      weekIncome: [],
      zip: business.zip
    };

    business.menu.forEach((menuSection) => {
      let sectionObj = {
        name: menuSection.name,
        items: []
      };

      menuSection.items.forEach((menuItem) => {
        let menuItemObj = {
          itemDescription: menuItem.itemDescription,
          itemPrice: menuItem.itemPrice,
          itemName: menuItem.itemName,
          itemPicture: menuItem.itemPicture
        };
        sectionObj.items.push(menuItemObj);
      });

      obj.menu.push(sectionObj);
    });

    business.purchasedItems.forEach((purchasedItem) => {

      let purchasedObj = {
        name: purchasedItem.name,
        count: purchasedItem.count
      };
      obj.purchasedItems.push(purchasedObj);

    });

    business.weekIncome.forEach((dayIncome) => {
      let incomeObj = {
        name: dayIncome.name,
        income: dayIncome.income,
        hourlyOrders : []
      };

      dayIncome.hourlyOrders.forEach((hourlyOrder) => {
        incomeObj.hourlyOrders.push(hourlyOrder);
      });

      obj.weekIncome.push(incomeObj);
    });

    business.albumItems.forEach((albumItem) => {
      
      let albumObj = {
        title: albumItem.title,
        image: albumItem.image
      };

      obj.albumItems.push(albumObj);

    });

    return obj;

  }

  /*
  function getNumberOfDeployedCards(){

    let count = 0;

    blocksArray.map((x) => {
      if(x.deployed){
        count++;
      }
    });
    return count;

  }
  */