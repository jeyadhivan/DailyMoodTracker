<div align="center">

# 🧠 DailyMoodTracker  
*Track Your Emotions Day-by-Day with Ease*

![last-commit](https://img.shields.io/github/last-commit/jeyadhivan/DailyMoodTracker?style=flat&logo=git&logoColor=white&color=ffbe38)
![repo-top-language](https://img.shields.io/github/languages/top/jeyadhivan/DailyMoodTracker?style=flat&color=ffbe38)
![repo-language-count](https://img.shields.io/github/languages/count/jeyadhivan/DailyMoodTracker?style=flat&color=ffbe38)

**Built with the tools and technologies:**

![React](https://img.shields.io/badge/React-61DAFB.svg?style=flat&logo=React&logoColor=black)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=flat&logo=JavaScript&logoColor=black)
![CSS3](https://img.shields.io/badge/CSS3-1572B6.svg?style=flat&logo=css3&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000.svg?style=flat&logo=JSON%20web%20tokens&logoColor=white)
![npm](https://img.shields.io/badge/npm-CB3837.svg?style=flat&logo=npm&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF.svg?style=flat&logo=vite&logoColor=white)

</div>

---

## 📚 Table of Contents

- [Overview](#overview)
- [Demo](#demo)
- [Features](#features)
- [Login Credentials](#login-credentials)
- [Installation](#installation)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [API Details](#api-details)
- [Design Reference](#design-reference)

---

## 📌 Overview

**DailyMoodTracker** is a React-based mood tracking app where users can visually select their emotions via emojis on a calendar. This project uses **authentication**, **protected routing**, **calendar logic**, and **emoji filters** to offer a highly interactive mood-tracking experience.

---

## 🚀 Demo

🔗 [Live Demo Link](https://gjtracker.ccbp.tech/login)  


---

## ✨ Features

- 🔐 **JWT Login Authentication**
- 📅 **Interactive Monthly Calendar**
- 😊 **Emoji Selection for Each Day**
- 📊 **Filter by Day and Mood**
- 📈 **Reports Section for Summary**
- 🔒 **Protected Routes (Login, Home, Reports)**
- ✅ **Responsive UI for All Devices**

---

## 🔐 Login Credentials

Use any of the demo users:

username: rahul
password: rahul@2021


⚠️ This app uses a mock API with pre-configured usernames and passwords.

---

## 📦 Installation

```bash
git clone https://github.com/jeyadhivan/DailyMoodTracker.git
cd DailyMoodTracker
npm install
npm start
```

## 🛠 Tech Stack
  - React.js (with Hooks)

  - React Router v6

  - CSS3 (Responsive design)

  - JWT-based Authentication

  - Vite


## 📁 Project structure
src/
├── components/
│   ├── Login/
│   ├── Home/
│   ├── Reports/
│   ├── Header/
│   └── NotFound/
├── App.js
└── index.js

## 🔗 API Details

Login API
```
http
POST https://apis.ccbp.in/login
```

Request:

json
```
{
  "username": "rahul",
  "password": "rahul@2021"
}
```

Response:

json
```
{
  "jwt_token": "..."
}
```

🖼 Design Reference

Design inspired by the official Figma.

📄 License

This project is for educational purposes only.
