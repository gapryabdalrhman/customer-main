const leftNavActions = [
 
  {
    lists: [
      { link: "#", txt: "View Cart" },
      { link: "#", txt: "Edit Cart" },
      { link: "#", txt: "Delete Cart" },
    ],
    listAction: "Manage Cart",
    icon : 'fa-solid fa-cart-shopping' ,
  },
  
  {
    lists: [
      { link: "orders", txt: "All Orders" },
      { link: "#", txt: "Track Order" },
      { link: "#", txt: "Pick Order" },
    ],
    listAction: "Manage Orders",
    icon : 'fa-solid fa-cart-flatbed-suitcase'

    
  },
  
  {
    lists: [
      { link: "#", txt: "Change Password" },
      { link: "#", txt: "Delete Account" },
      { link: "#", txt: "Edit Information" },
    ],
    listAction: "Manage Profile",
    icon : 'fas fa-user'
  },
  
  {
    link : '/contactus' , 
    listAction: "Contact Us",
    icon : 'fa-solid fa-address-book'
  },
  
];

export default leftNavActions
