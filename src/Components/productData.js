// src/data/productsData.js

export const productsData = [
  { id: 1, brand: 'Kingfisher', type: 'Strong', price: '160Rs', category: 'Beer' },
  { id: 2, brand: 'Budweiser', type: 'Mild', price: '180Rs', category: 'Beer' },
  { id: 3, brand: 'Heineken', type: 'Premium', price: '190Rs', category: 'Beer' },
  { id: 4, brand: 'Tuborg', type: 'Strong', price: '170Rs', category: 'Beer' },
  { id: 5, brand: 'Corona', type: 'Light', price: '220Rs', category: 'Beer' },
  { id: 6, brand: 'Bira 91', type: 'White', price: '200Rs', category: 'Beer' },
  { id: 7, brand: 'Carlsberg', type: 'Elephant', price: '175Rs', category: 'Beer' },
  { id: 8, brand: 'Foster’s', type: 'Strong', price: '160Rs', category: 'Beer' },
  { id: 9, brand: 'Haywards 5000', type: 'Strong', price: '150Rs', category: 'Beer' },
  { id: 10, brand: 'Simba', type: 'Stout', price: '210Rs', category: 'Beer' },
  { id: 11, brand: 'Royal Stag', type: 'Deluxe', price: '700Rs', category: 'Whiskey' },
  { id: 12, brand: 'Blenders Pride', type: 'Reserve', price: '950Rs', category: 'Whiskey' },
  { id: 13, brand: 'McDowell’s No.1', type: 'Platinum', price: '800Rs', category: 'Whiskey' },
  { id: 14, brand: 'Imperial Blue', type: 'Classic', price: '750Rs', category: 'Whiskey' },
  { id: 15, brand: 'Antiquity Blue', type: 'Premium', price: '1000Rs', category: 'Whiskey' },
  { id: 16, brand: 'Peter Scot', type: 'Deluxe', price: '1100Rs', category: 'Whiskey' },
  { id: 17, brand: 'Signature', type: 'Rare Aged', price: '900Rs', category: 'Whiskey' },
  { id: 18, brand: '100 Pipers', type: 'Blended Scotch', price: '1300Rs', category: 'Whiskey' },
  { id: 19, brand: 'Black Dog', type: 'Triple Gold Reserve', price: '1500Rs', category: 'Whiskey' },
  { id: 20, brand: 'Ballantine’s', type: 'Finest', price: '1700Rs', category: 'Whiskey' },
  { id: 21, brand: 'Sula', type: 'Red Zinfandel', price: '1200Rs', category: 'Wine' },
  { id: 22, brand: 'Fratelli', type: 'Cabernet Sauvignon', price: '1350Rs', category: 'Wine' },
  { id: 23, brand: 'Grover Zampa', type: 'Shiraz', price: '1400Rs', category: 'Wine' },
  { id: 24, brand: 'York', type: 'Chenin Blanc', price: '1250Rs', category: 'Wine' },
  { id: 25, brand: 'Reveilo', type: 'Merlot', price: '1500Rs', category: 'Wine' },
  { id: 26, brand: 'KRSMA', type: 'Sangiovese', price: '1600Rs', category: 'Wine' },
  { id: 27, brand: 'Big Banyan', type: 'Cabernet Shiraz', price: '1100Rs', category: 'Wine' },
  { id: 28, brand: 'Myra', type: 'Reserve Red', price: '1300Rs', category: 'Wine' },
  { id: 29, brand: 'Charosa', type: 'Tempranillo', price: '1550Rs', category: 'Wine' },
  { id: 30, brand: 'Four Seasons', type: 'Viognier', price: '1150Rs', category: 'Wine' },
];

export  const ordersData = [
  {
    orderId: 1, orderDate: '2025-04-23',
    address: '2-1-133,kmr,India,503111',
    paymentType: 'CC',
    status: 'Delivered',
    products: [
      { id: 4, brand: 'Tuborg', type: 'Strong', price: '170Rs', category: 'Beer', quantity: 3 },
      { id: 5, brand: 'Corona', type: 'Light', price: '220Rs', category: 'Beer', quantity: 6 },
      { id: 6, brand: 'Bira 91', type: 'White', price: '200Rs', category: 'Beer', quantity: 1 }
    ],
    subtotal: {
      price: '2300INR',
      discount: 'NA',
      deliveryCharges: 'NA',
      Subtotal: '2300INR'
    }
  },
  {
    orderId: 2, orderDate: '2025-04-23',
    address: '2-1-133,kmr,India,503111',
    paymentType: 'COD',
    status: 'Cancelled',
    products: [
      { id: 4, brand: 'Tuborg', type: 'Strong', price: '170Rs', category: 'Beer', quantity: 3 },
      { id: 5, brand: 'Corona', type: 'Light', price: '220Rs', category: 'Beer', quantity: 6 },
      { id: 6, brand: 'Bira 91', type: 'White', price: '200Rs', category: 'Beer', quantity: 1 }
    ],
    subtotal: {
      price: '2300INR',
      discount: 'NA',
      deliveryCharges: 'NA',
      Subtotal: '2300INR'
    }
  },
  {
    orderId: 3, orderDate: '2025-04-23',
    address: '2-1-133,kmr,India,503111',
    paymentType: 'UPI',
    status: 'Waiting for Delivery Partner',
    products: [
      { id: 4, brand: 'Tuborg', type: 'Strong', price: '170Rs', category: 'Beer', quantity: 3 },
      { id: 5, brand: 'Corona', type: 'Light', price: '220Rs', category: 'Beer', quantity: 6 },
      { id: 6, brand: 'Bira 91', type: 'White', price: '200Rs', category: 'Beer', quantity: 1 }
    ],
    subtotal: {
      price: '2300INR',
      discount: 'NA',
      deliveryCharges: 'NA',
      Subtotal: '2300INR'
    }
  },
  {
    orderId: 4, orderDate: '2025-04-23',
    address: '2-1-133,kmr,India,503111',
    paymentType: 'UPI',
    status: 'Waiting for Delivery Partner',
    products: [
      { id: 4, brand: 'Tuborg', type: 'Strong', price: '170Rs', category: 'Beer', quantity: 3 },
      { id: 5, brand: 'Corona', type: 'Light', price: '220Rs', category: 'Beer', quantity: 6 },
      { id: 6, brand: 'Bira 91', type: 'White', price: '200Rs', category: 'Beer', quantity: 1 }
    ],
    subtotal: {
      price: '2300INR',
      discount: 'NA',
      deliveryCharges: 'NA',
      Subtotal: '2300INR'
    }
  },
  {
    orderId: 4, orderDate: '2025-04-23',
    address: '2-1-133,kmr,India,503111',
    paymentType: 'UPI',
    status: 'Waiting for Delivery Partner',
    products: [
      { id: 4, brand: 'Tuborg', type: 'Strong', price: '170Rs', category: 'Beer', quantity: 3 },
      { id: 5, brand: 'Corona', type: 'Light', price: '220Rs', category: 'Beer', quantity: 6 },
      { id: 6, brand: 'Bira 91', type: 'White', price: '200Rs', category: 'Beer', quantity: 1 }
    ],
    subtotal: {
      price: '2300INR',
      discount: 'NA',
      deliveryCharges: 'NA',
      Subtotal: '2300INR'
    }
  }
];

