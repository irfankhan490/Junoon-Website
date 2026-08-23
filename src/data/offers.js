// Mock offers/promotions data — mirrors what a real "Offers" API/admin table would return.

export const OFFERS = [
  {
    id: 'lucky-draw',
    title: 'Buy Junoon Tea & Win Big — Lucky Draw',
    short: 'Every pack is a chance to win.',
    description:
      'Purchase any Junoon Tea pack and get an entry into our ongoing Lucky Draw. Winners are picked regularly and rewarded with fantastic prizes across our sales regions.',
    prizes: ['Motorcycle', 'Washing Machine', 'LED TV', 'Solar Panel Kit', 'Electric Kettle', 'Wall Clock', 'Gift Hampers'],
    validity: 'Ongoing — while stocks last',
    badge: 'Lucky Draw',
    cta: 'Shop & Enter Draw',
    accent: 'gold',
  },
  {
    id: 'free-delivery',
    title: 'Free Delivery on Orders Above 5 Kg',
    short: 'Stock up and skip the delivery charge.',
    description:
      'Order 5 Kg or more of Junoon Tea in a single order and we’ll deliver it to your doorstep absolutely free — perfect for families, hostels, and offices stocking up.',
    prizes: [],
    validity: 'Valid on all home delivery orders, nationwide',
    badge: 'Free Delivery',
    cta: 'Shop Now',
    accent: 'leaf',
  },
  {
    id: 'wholesale-pricing',
    title: 'Special Wholesale Prices for Shops & Businesses',
    short: 'Better margins for your business.',
    description:
      'Grocery stores, supermarkets, restaurants, cafés, hotels and tea shops get exclusive wholesale rates on Junoon Tea, along with priority restocking support.',
    prizes: [],
    validity: 'Available year-round for registered businesses',
    badge: 'Wholesale',
    cta: 'Request Wholesale Pricing',
    accent: 'chili',
  },
]
