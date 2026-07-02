# HoodMandu E-Commerce Website

## Overview
HoodMandu is an urban streetwear clothing brand that offers a unique selection of apparel designed for the modern individual. This e-commerce website is built using React.js with Vite, Material UI, Redux Toolkit, TanStack Query, React Router, Recharts, and React Hook Form with Yup.

## Features
- **Responsive Design**: The website is designed to be fully responsive, ensuring a seamless experience on both desktop and mobile devices.
- **Urban Streetwear Aesthetic**: The design incorporates a monochromatic color scheme with vibrant electric blue accents, reflecting the brand's identity.
- **Product Catalog**: Users can browse through a wide range of products, filter by categories, and view detailed product information.
- **Shopping Cart**: A user-friendly cart system allows customers to add, remove, and view items in their cart.
- **Contact Form**: Customers can easily reach out through a contact form with validation to ensure proper submissions.
- **Sales Analytics**: Visual representation of sales data using Recharts for better insights.

## Project Structure
```
hoodmandu
├── src
│   ├── main.jsx
│   ├── App.jsx
│   ├── api
│   │   ├── axiosClient.js
│   │   ├── productsApi.js
│   │   └── contactApi.js
│   ├── assets
│   │   └── fonts
│   │       └── .gitkeep
│   ├── components
│   │   ├── common
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Logo.jsx
│   │   │   └── LoadingSpinner.jsx
│   │   ├── home
│   │   │   ├── HeroBanner.jsx
│   │   │   ├── FeaturedProducts.jsx
│   │   │   ├── CategoryShowcase.jsx
│   │   │   └── SalesChart.jsx
│   │   ├── products
│   │   │   ├── ProductCard.jsx
│   │   │   ├── ProductGrid.jsx
│   │   │   ├── ProductFilters.jsx
│   │   │   └── ProductQuickView.jsx
│   │   ├── cart
│   │   │   ├── CartItem.jsx
│   │   │   ├── CartSummary.jsx
│   │   │   └── EmptyCart.jsx
│   │   └── contact
│   │       └── ContactForm.jsx
│   ├── hooks
│   │   ├── useProducts.js
│   │   └── useCart.js
│   ├── pages
│   │   ├── HomePage.jsx
│   │   ├── ProductsPage.jsx
│   │   ├── AboutPage.jsx
│   │   ├── ContactPage.jsx
│   │   └── CartPage.jsx
│   ├── routes
│   │   └── AppRoutes.jsx
│   ├── store
│   │   ├── index.js
│   │   └── slices
│   │       ├── cartSlice.js
│   │       ├── productsSlice.js
│   │       └── uiSlice.js
│   ├── styles
│   │   └── theme.js
│   ├── utils
│   │   ├── formatCurrency.js
│   │   └── constants.js
│   └── validation
│       └── contactSchema.js
├── index.html
├── vite.config.js
├── package.json
├── .eslintrc.cjs
├── .gitignore
└── README.md
```

## Getting Started
To get started with the HoodMandu e-commerce website, follow these steps:

1. **Clone the Repository**:
   ```
   git clone https://github.com/BibekTiwari42/hoodmandu.git
   ```

2. **Navigate to the Project Directory**:
   ```
   cd hoodmandu
   ```

3. **Install Dependencies**:
   ```
   npm install
   ```

4. **Run the Development Server**:
   ```
   npm run dev
   ```

5. **Open in Browser**:
   Visit `http://localhost:3000` to view the application.

## Technologies Used
- **React.js**: For building the user interface.
- **Vite**: For fast development and build tooling.
- **Material UI**: For UI components and styling.
- **Redux Toolkit**: For state management.
- **TanStack Query**: For data fetching and caching.
- **React Router**: For routing and navigation.
- **Recharts**: For data visualization.
- **React Hook Form & Yup**: For form handling and validation.

## License
This project is licensed under the MIT License. See the LICENSE file for details.