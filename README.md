# 🔗 URL Shortener Microservice

A simple and functional URL shortening service built with Node.js, Express, and MongoDB. It allows users to generate custom or random short links for longer URLs with optional expiration.

## 🌐 Live Preview (optional)

If deployed, update this section with your live link.

## 🚀 Features

- Create short links with optional custom codes
- Set expiration time (in minutes) for links
- Redirects to original URL using the short code
- Logs timestamp and basic usage info
- Simple and responsive frontend with plain HTML/CSS/JS

## 📁 Folder Structure

Afford/ ├── app.js ├── public/ │ ├── index.html │ ├── style.css │ └── script.js ├── 
routes/ │ └── shortUrlRoutes.js ├── controllers/ │ └── urlController.js ├── models/ │ └──
Url.js ├── middleware/ │ └── logger.js ├── .env └── README.md


## 🛠 Setup

### 1. Clone the repo

```bash
git clone https://github.com/your-username/url-shortener.git
cd url-shortener


## 🛠 Setup

### 1. Clone the repo

```bash
git clone https://github.com/your-username/url-shortener.git
cd url-shortener

npm install

PORT=3000
MONGO_URI=your_mongo_connection_string

nodemon app.js
