
# Price Tracker : Full Stack Web Scraper

Price Tracker is a amazone product web scraping application that build with a Next.js 14 having features of data scraping, cron jobs, sending emails and more. 


## Features

- Scraping data from the Amazone site
- Store into the MongoDB data base
- cron jobs for automatically scraping data in fixed time interval
- send email to user when any product data(Price, availability) updates



## Run Locally

Clone the project

```bash
  git clone https://github.com/UjwalPatel05/price-tracker.git
```

Install dependencies

```bash
  npm install
```

Setup .env file
```bash
BRIGHT_DATA_USERNAME =
BRIGHT_DATA_PASSWORD = 

MONGODB_URI = 

EMAIL_SENDER = 
EMAIL_PASSWORD = 

```

Start the server

```bash
  npm run dev
```


## Screenshots

Dashboard
![Dashboard](https://res.cloudinary.com/djstjnl11/image/upload/v1704863495/vg4okpi1dxcigurw6ob7.png)

Scraped Product
![Scraped Product](https://res.cloudinary.com/djstjnl11/image/upload/v1704863495/vcdoollsfttoayfcu72i.png)

Click on the Track button and provide email to track the product
![Track Product](https://res.cloudinary.com/djstjnl11/image/upload/v1704863495/ntntwuohwjch16gxscvd.png)

Sample Email when you Track Product
![Sample Email](https://res.cloudinary.com/djstjnl11/image/upload/v1704863494/y0kjzj8x4lx6cckwlbkt.png)

## Tech Stack

**Client:** Next 14, React, TailwindCSS, TypeScript

**Server:** Next JS, MongoDB

**API:** BrightData (Open Source Scraper), Nodemailer

