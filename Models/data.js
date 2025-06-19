export let users = [
    { id: 1, username: 'admin', email: 'admin@example.com' },
    { id: 2, username: 'user1', email: 'user1@example.com' },
    { id: 3, username: 'user2', email: 'user2@example.com' }
];

if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify(users));
}

export let initialPosts = [
  {  
      id: 1,
      title: "Exploring Path Francés",
      image: "../img/frances.jpg",
      duration: "30 days",
      distance: "780 km",
      content: "The most popular Camino route from St-Jean-Pied-de-Port to Santiago. Experience diverse landscapes, rich history, and vibrant pilgrim culture.",
      path: "francés",
      isLiked: false,
      itinerary: [
          {
              day: 1,
              from: "St-Jean-Pied-de-Port",
              to: "Roncesvalles",
              distance: "25",
              albergue: "Albergue de Roncesvalles"
          },
          {
              day: 2,
              from: "Roncesvalles",
              to: "Zubiri",
              distance: "22",
              albergue: "Albergue Municipal de Zubiri"
          }
      ]
  },
  {
      id: 2,
      title: "Coastal Path Portugués",
      image: "../img/portugues.jpg",
      duration: "12 days",
      distance: "280 km",
      content: "The Portuguese Coastal route from Porto offers stunning ocean views, fresh seafood, and charming fishing villages along the way.",
      path: "portugués-costa",
      isLiked: false,
      itinerary: [
          {
              day: 1,
              from: "Porto",
              to: "Vila do Conde",
              distance: "25",
              albergue: "Albergue São João Baptista"
          },
          {
              day: 2,
              from: "Vila do Conde",
              to: "Esposende",
              distance: "23",
              albergue: "Albergue de Peregrinos de Esposende"
          }
      ]
  },
  {
      id: 3,
      title: "Northern Path Adventure",
      image: "../img/norte.jpg",
      duration: "35 days",
      distance: "825 km",
      content: "The challenging but beautiful Northern route along Spain's coast with breathtaking views of the Cantabrian Sea.",
      path: "norte",
      isLiked: false,
      itinerary: [
          {
              day: 1,
              from: "Irún",
              to: "San Sebastián",
              distance: "25",
              albergue: "Albergue de Peregrinos de San Sebastián"
          },
          {
              day: 2,
              from: "San Sebastián",
              to: "Zarautz",
              distance: "20",
              albergue: "Albergue de Zarautz"
          }
      ]
  }
]; 

if (!localStorage.getItem('posts')) {
  localStorage.setItem('posts', JSON.stringify(initialPosts));
};


export let initialTasks = [
    { id: 1, name: "Pack Gear", icon: "bi-bag-check", completed: false },
    { id: 2, name: "Buy Supplies", icon: "bi-cart-check", completed: false },
    { id: 3, name: "Plan Route", icon: "bi-gear", completed: false },
    { id: 4, name: "Break in Hiking Shoes", icon: "bi-check-circle", completed: false },
    { id: 5, name: "Book Albergues", icon: "bi-calendar-check", completed: false },
    { id: 6, name: "Train with Long Walks", icon: "bi-bag-check", completed: false },
    { id: 7, name: "Learn Basic Spanish", icon: "bi-check-circle", completed: false },
    { id: 8, name: "Get Pilgrim Passport", icon: "bi-cart-check", completed: false },
    { id: 9, name: "Pack First Aid Kit", icon: "bi-bag-check", completed: false },
    { id: 10, name: "Check Weather Forecast", icon: "bi-calendar-check", completed: false },
    { id: 11, name: "Download Offline Maps", icon: "bi-gear", completed: false },
    { id: 12, name: "Buy Travel Insurance", icon: "bi-check-circle", completed: false }
];
  
if (!localStorage.getItem('tasks')) {
  localStorage.setItem('tasks', JSON.stringify(initialTasks));
};
