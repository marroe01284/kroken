# Kroken (BETA)🐣
Kroken is a platform where users can view information about fishing lures that are effective in the the respective waters. there is alot of improvemnts and it will be resolved over time, this is the beginning of an idea which will take flight over time! 
## Table of Contents
- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [Running Locally](#running-locally)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Deployment](#deployment)
- [Future](#future)

## Features 🌟
- List all waters
- View a single water and its associated lures
- Create new water and lures
- ...

## Requirements
- Node.js (v18+ recommended)
- npm or yarn
- MySQL database

## Installation 📦
1. Clone this repository
    ```bash
    git clone https://github.com/marroe01284/kroken.git
    ```
2. Navigate into the project directory
    ```bash
    cd kroken
    ```
3. Install dependencies
    ```bash
    npm install
    ```

## Running Locally
1. Configure your `.env` file with your MySQL database credentials:
    ```env
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=somepassword
    DB_NAME=kroken_db
    DB_PORT=3306
    PORT=3004
    ```
2. Start the server
    ```bash
    npm run dev
    ```
   or
    ```bash
    node server.js
    ```
3. The API will be available at [http://localhost:3002](http://localhost:3002).

## Environment Variables
| Variable  | Description             |
|-----------|-------------------------|
| DB_HOST   | Database Host          |
| DB_USER   | Database User          |
| DB_PASSWORD | Database Password      |
| DB_NAME   | Database Name          |
| DB_PORT   | Database Port (usually 3306) |
| PORT      | Port on which the Node server will run |

## API Endpoints

### GET /water
**Description:** Retrieves all waters.

### GET /water/:id
**Description:** Retrieves single water and its associated lure

### POST /water
**Description:** Creates a new water collection

### POST /lure 
**Description:** Creates a new Lure

### PUT /lure
**Description:** Updates the lure collection

### DELETE /lure
**Description:** Deletes the existing Lure

## Deployment 🚀 

### API: https://kroken-p6rb.onrender.com

### Netlify: https://kroken.netlify.app

## Future
- Authentication page for Admin 
- Map out all the waters in Norway 
- Assign lures to the right waters 
- Style the website 
- Change the UX/UI 
- Expand the interface to take on additional tweaks(by fishingcards, hooks, etc...)
- Create a profile view 
- 
