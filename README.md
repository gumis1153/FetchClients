## Description

Clone repository:

### `git clone https://github.com/gumis1153/FetchClients.git`

After clone, run:

### `npm install`

It will install all dependencies.

Then, you can run:

### `npm start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

App is created in create-react-app with Hooks and SCSS.

This project was created by Piotr Jakubowski.

# How it works

## 1. Fetching data

Data is fetching from API, when it's done app start fetching data about incomes from another API by every company id and is adding incomes.

## 2. Display data in table

Fetched data is displayed in separate component by .map() every element of downloaded data.

## 3. Sort

After fetch with no errors you can sort data - first click on the column header sort table asceding order by given column, second click by descending order.

## 4. Pagination

Pagination included, you can choose how many companies you want to be displayed by choosing right amount of them in select box in left side above header of table . Also you can move between tables with displayed data by buttons under the table.

## 5. Filtering

Filter table by enter value to input. Filtering is every column.

## 6. Responsive

App if full RWD you can run it on phone or tablet and it will works.
