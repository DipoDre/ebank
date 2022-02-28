# EBank

## Technical Design
A short and brief technical design information can  be found in the **technicalDesign.md** file

## Getting Started
  - First of all run **npm install**.

  - Start up your **MySQL** server.

  - Create a database.

  - Create a **.env** file and add values to the following variables:
```
MYSQL_USERNAME =
MYSQL_PASSWORD = 
MYSQL_DATABASE = 
TEST_DATABASE = 
NODE_ENV = 
MYSQL_PORT = 
MYSQL_HOST = 
JWT_SECRET = 
```

  - Run **npm run migrate** to create a table with necessary schema to the created database.

  - Run **npm run start** to start the application.

  - To run test, run **npm run seed:run** to populate the created table with dummy data that will be used for testing.

  - Run **npm run test** to run the test.




## Api Interface
#### Create Account

  - Method: `POST`
  - URL path: `/accounts`
  - Request body:

    ```
    {
      "newAccountData" : {
        "firstname": <firstname of new user>,
        "lastname": <lastname of new user>,
        "username": <username of new user>,
        "password": <password of new user>
      }
        
    }
    ```

  - Response:

    Header: `HTTP 201`
    Body:
      ```
      {
          "account_number": <new account number>,
          "username": <registered username>,
          "token": <authentication token>,
          "message": <status of request>,
      }
      ```
    or

    Header: `HTTP <HTTP_CODE>`
    Body:

      ```
      {
          "message": <error message>
      }
      ```

  - Note:

    - Firstname and lastname must be more than 2 characters each.
    - Firstname and lastname should contain alphabets only.
    - The firstname, lastname, username and password are required.
    - Username should not be less than 5 characters.
    - Password should not be less than 8 characters.
    - Username is unique.


#### Fund Account

  - Method: `PATCH`
  - URL path: `/accounts/:accountNumber/deposit`
  - Header: `x-access-token :  <token>`
  - Request body:

    ```
    {
      "depositAmount" : <amount to be deposited>
    }
    ```

  - Response:

    Header: `HTTP 200`
    Body:
      ```
      {
          "message": "The account was funded successfully"
      }
      ```
    or

    Header: `HTTP <HTTP_CODE>`
    Body:

      ```
      {
          "message": <error message>
      }
      ```

  - Note:

    - Minimum deposit amount is 100.00.
    - Account balance can not exceed 100 million.
    - Route is protected and requires authentication via token.


#### Transfer Fund

  - Method: `PATCH`
  - URL path: `/accounts/:accountNumber/transfer`
  - Header: `x-access-token :  <token>`
  - Request body:

    ```
    {
      "receiverAccountNumber" : <receiver's account number>,
      "transferAmount" : <amount to transfer to receiver>
    }
    ```

  - Response:

    Header: `HTTP 200`
    Body:
      ```
      {
          "message": "Fund transfer was successful"
      }
      ```
    or

    Header: `HTTP <HTTP_CODE>`
    Body:

      ```
      {
          "message": <error message>
      }
      ```

  - Note:

    - Minimum transfer amount is 50.00.
    - Transfer amount can not be more than sender's account balance.
    - Transfer can not be done to self.
    - The receiver's account must be valid.
    - Route is protected and requires authentication via token.


#### Withdraw Fund

  - Method: `PATCH`
  - URL path: `/accounts/:accountNumber/withdraw`
  - Header: `x-access-token :  <token>`
  - Request body:

    ```
    {
      "withdrawAmount" : <amount to be withdrawn>
    }
    ```

  - Response:

    Header: `HTTP 200`
    Body:
      ```
      {
          "message": "Fund withdraw was successful"
      }
      ```
    or

    Header: `HTTP <HTTP_CODE>`
    Body:

      ```
      {
          "message": <error message>
      }
      ```

  - Note:

    - Minimum withdraw amount is 100.00.
    - Withdraw amount can not be more than account balance.
    - Route is protected and requires authentication via token.
    
