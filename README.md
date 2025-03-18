# Restaurant Sorter

Frontend application at this time. Users can sort restaurants according to a list of items they're looking for. Businesses can edit their menus, their photo gallery, their business card, and can view their sales data. Customers can add items to cart and checkout, and view past orders.

[Visit Site](https://superb-cendol-995263.netlify.app/)

## Tech Used:
React on the frontend. Tailwind for styling. ChartJS for charts.

## Running Locally:
Very simple because this is currently a frontend application only. Navigate the root folder and in the command line run the following two commands:
>npm install  
>npm run dev

and the application will run on localhost:3000.

## Future Updates:

Add a backend server and a database.

Need to pull restaurant menu data from an API and load it into a database. It seems difficult to find a single API that gives up-to-date menu infomation for all restuarants in a given area. Google Places API might be the best starting point.

Want to add functionality that gets the user's location on the frontend. From there, only display restaurants that are within a certain distance of the user's location. Or a user can enter a zipcode, and only restaurants inside or within a certain distance from that zipcode will be shown. The goal is to have some filter always applied to narrow down the total number of restaurants sent to the client.
