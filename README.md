# Google Sheets Data Viewer

## Description

This project is a simple web application built with Express.js that retrieves data from a Google Sheets spreadsheet and displays it in an HTML table.
It utilizes the Google Sheets API to fetch data and presents it in a sortable table format.

## Setup and Usage

1. Clone this repository.
2. Install the required npm packages using npm install.
3. Set up your Google Sheets API credentials:
   - Go to the [Google Cloud Console](https://console.cloud.google.com/apis/dashboard)
   - Create a new project and enable the Google Sheets API for the project.
   - Create credentials (OAuth client ID) and download the credentials as credentials.json.
   - Place credentials.json in the root directory of the project.
4. Set environment variables by creating a .env file in the root directory and adding the following:
   `PORT=3000`
5. Run the application with command:
   `node index.js`
6. Open a web browser and go to [localhost](http://localhost:3000) to view the Google Sheets data in a sortable HTML table.

## How it Works

- The application uses the Google Sheets API to authenticate and fetch data from a specified Google Sheets spreadsheet.
- The fetched data is transformed into an HTML table, making use of client-side sorting capabilities.
