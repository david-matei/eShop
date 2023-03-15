# Online-Shop-Project

# shopping-site-API

An API for an e-commerce website. Complete with authentication, authorization and access control
Read documentation !COMING SOON -> [here]()

## How to set up locally.

- Clone the repo.
- Run `npm install` to install dependencies.
- input environment variables for `MONGO_URI`, `PORT`, `JWT_SECRET`, `REFRESH_TOKEN`, `MAIL_USERNAME`, `MAIL_PASSWORD`, `OAUTH_CLIENTID`,
  `OAUTH_CLIENT_SECRET`, `OAUTH_REFRESH_TOKEN`, `STRIPE_SECRET_KEY`, `STRIPE_PUBLISHABLE_KEY`
- enter `npm run dev` in the terminal to start up the development server.

## Technology

- This API is created using the Node JS language and Express JS framework.
- It uses MongoDB database.

### Users are able to:

- Sign up or create accounts then sign in, log out.
- Verify their email.
- Edit their information.
- Get list of available products for sale and their details.
- Search for a particular product.
- Get products by categories.
- See product reviews/See by rating.
- Place orders and make online payments to purchase products.
- Others...

### Admin is able to:

- Upload or create new products and details.
- Update or edit existing product details.
- Delete products.
- Update other users access.
- Others...
