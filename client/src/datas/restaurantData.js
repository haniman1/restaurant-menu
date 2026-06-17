const restaurantData = {
  name: "Restaurant Name",

  description:
    "We serve fresh and delicious meals prepared with high-quality ingredients. Our mission is to provide exceptional food and an unforgettable dining experience.",

  about:
    "Our restaurant combines fresh ingredients, skilled chefs, and a welcoming atmosphere to create meals that customers love.",

  contact: {
    address: "Addis Ababa, Ethiopia",
    phone: "+251900000000",
    email: "restaurant@gmail.com",
    openHours: {
      weekdays: "8:00 AM - 10:00 PM",
      weekend: "9:00 AM - 11:00 PM",
    },
  },

  social: {
    instagram: "#",
    facebook: "#",
    tiktok: "#",
    telegram: "#",
  },

  categories: ["All", "Pasta", "Burger", "Pizza", "Drinks"],

  foods: [
    {
      id: 1,
      name: "Spaghetti",
      price: "250 ETB",
      category: "Pasta",
      isAvailable: true,
      image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9",
    },
    {
      id: 2,
      name: "Burger",
      price: "300 ETB",
      category: "Burger",
      isAvailable: false,
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
    },
  ],

  features: [
    {
      icon: "🍽️",
      title: "Fresh Ingredients",
      desc: "Every dish is prepared using carefully selected fresh ingredients.",
    },
    {
      icon: "👨‍🍳",
      title: "Professional Chefs",
      desc: "Our chefs prepare every meal with passion and expertise.",
    },
    {
      icon: "⭐",
      title: "Quality Service",
      desc: "We focus on customer satisfaction and memorable dining experiences.",
    },
  ],
};

export default restaurantData;
