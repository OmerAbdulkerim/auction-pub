
# Auction App

An e-commerce platform for eBay-style auctions featuring user authentication, the ability to browse active auctions and articles, the option to create new auctions, live bidding and user profile editing. 

![App Screenshot](https://firebasestorage.googleapis.com/v0/b/atlantbh-auctionapp.appspot.com/o/project-screenshots%2Flanding-page.png?alt=media&token=8db29091-2132-4b45-909c-85dc579b75eb)
## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [API Reference](#api-reference-and-documentation)



## Overview

The Auction App at it's core is an auction based e-commerce platform which allows users to create accounts and sell their own goods. Overall it took around 3 months to complete and it was built from scratch. It contains a number of fully custom built components and a plethora of functionalities. Here is just a glimpse of some of the features that are available within the application.

**Landing Page**\
The landing page features the option of filtering products by the main categories. It is also has a place for promoted items. It also contains an overview of items based on certain criteria (i.e. newly added items, top rated by other users and items which are soon expiring).  

![Landing Page](https://firebasestorage.googleapis.com/v0/b/atlantbh-auctionapp.appspot.com/o/project-screenshots%2Flanding-page.png?alt=media&token=8db29091-2132-4b45-909c-85dc579b75eb)
-

\
**Shop Page**\
The shop page displays all the items that are available for bidding at the moment. Initially it is sorted by the remaining time left for an auction in ascending order, meaning that the less time an item has left the closer to the top it's position will be.  

![Shop Page](https://firebasestorage.googleapis.com/v0/b/atlantbh-auctionapp.appspot.com/o/project-screenshots%2Fshop-page.png?alt=media&token=7c3a1576-d332-40f0-bf90-1cd68844806c)  
-

\
**Account Page**\
This is a standard Account Dashboard where users can edit information such as contact, card details and shipping addresses.  

![Account Page](https://firebasestorage.googleapis.com/v0/b/atlantbh-auctionapp.appspot.com/o/project-screenshots%2Fprofile-page.png?alt=media&token=71228f46-596e-429c-a731-9d366e9ca415)  
-

\
**Bids Page**\
Here users can find an overview of their past and currently active bids on items.  

![Bids Page](https://firebasestorage.googleapis.com/v0/b/atlantbh-auctionapp.appspot.com/o/project-screenshots%2Fbids-page.png?alt=media&token=7b9a8888-652c-4c6f-8bab-213f866ae7b9)

\
In addition to the features shown above there are also other functionalities such as: Stripe integration for payments, Mail integration for password reset, custom built form for adding products and starting auctions, product overview pages and full API documentation built with Swagger UI.
## Tech Stack

For this project the following technologies were used:

**Client:** React, Axios, Ant Design, SCSS, Figma

**Server:** Java, Spring Boot, PostgreSQL, Firebase, Stripe

**Deployment:** Docker, AWS EC2, Github Actions

**API Documentation:** Swagger

## API Reference and Documentation

The API and database schema documentation can be found using the following route:

```
/backend/api/v1/docs-ui.html
```

![API Documentation UI](https://firebasestorage.googleapis.com/v0/b/atlantbh-auctionapp.appspot.com/o/project-screenshots%2Fapi.png?alt=media&token=9585e634-1e8d-400d-b535-2aee324594c3)
