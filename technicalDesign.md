# Technical Design
Ideally, to be read with the **README.md** to give a better understanding.

## Overview
#### Problem
Difficulty in creating, accessing and usage of a banking account with ease and less hassles.

#### Solution
Creation of an efficient and simple account management system.

## Background
Roughly 36% of nigerian adults are unbanked ( https://www.gov.uk/government/news/nigeria-new-data-from-efina-shows-financial-inclusion-growth ).
Roughly 31% of adults worldwide are unbanked ( https://globalfindex.worldbank.org/sites/globalfindex/files/chapters/2017%20Findex%20full%20report_chapter2.pdf ).
Complaints about services in the nigerian financial sector made 33%(a third) of all cases filed by consumers to the Federal Competition and Consumer Protection Commission between January and September 2020 ( https://www.premiumtimesng.com/news/headlines/446948-customer-satisfaction-nigerian-banks-others-worst-performers-govt-data.html ).

#### Motivations
Enable secured access to an account management system through RESTful API to ease financial transactions. This will reduce reliance of physical transactions, reduce security risk, reduce cost, reduce tendency to make error and enable instant payment.

## Goals
 - Ability for users to register and create a secured account.
 - Ability for users to be able to fund their account at their comfort.
 - Ability for users to transfer funds to other users' accounts.
 - Ability for users to withdraw money from his/ her account.

#### Future Goals
 - Ability to keep record of account transactions.
 - Ability for users to have different types of accounts.
 - Addition of multiple types of accounts.
 - Addition of advanced security features.

## Design

#### Structure
The application employs the RESTful and MVC architectures.

 - **controllers** (logic that executes when an endpoint is matched)
 - **services** (the database access layer)
 - **routes**
 - **seeds** (dummy data to load the database to enable testing)
 - **util** (helper functions that can be used anywhere)
 - **middlewares** (includes auth.js to enable protection of restricted routes)
 - **knexfile** (config file to enable connection to the database)
 - **migration** (enables the creation and schema implementation and tables of the database)
 - **test** (contains test that will be run against the endpoints)

#### API Reference Specification

| Method     | URI | Media type | Description | Protected | Status Code |
| :--------- |:-----:| :-----:| -----:| :-----:| :-----:| :-----:|
| POST  | /accounts | application/json | Creates a new account | No | 201 Created, 400 Bad Request, 500 Internal Server Error |
| PATCH    |   /accounts/:accountNumber/deposit |   application/json |  Deposits fund to an account  | Yes | 200 OK, 400 Bad Request, 500 Internal Server Error |
| PATCH      |    /accounts/:accountNumber/transfer |    application/json |  Transfers fund to a receiver's account   | Yes |  200 OK, 400 Bad Request, 500 Internal Server Error |
| PATCH  | /accounts/:accountNumber/withdraw | application/json | Withdraws fund from an account | Yes | 200 OK, 400 Bad Request, 500 Internal Server Error |

#### Technology Stack
The stack consists of:
 - MySQL (database)
 - Node.js
 - Knex.js (query builder)
 - Express

#### Database
The database is made up of a single table with the following schema:

| Field     | Type | Null | Key | Default | Extra |
| --------- | -----:| -----:| -----:| -----:| -----:|
| account_number  | number | No | primary | null | auto increment |
| firstname    |   string |   No |    |   null |    |
| lastname      |    string |    No |     |    null |     |
| username  | string | No | unique | null |  |
| password     |   string |   No |    |   null |    |
| balance      |    decimal |    No |     |    0.00 |     |
| token  | string | Yes |  | null |  |
| created_at     |   timestamp |   Yes |    |   current_timestamp |    |

#### Authentication
This is done through passing a valid token through the **x-access-token** HTTP header. The token is compared with valid tokens stored in the database.

#### Authorization
This is done by comparing the account number gotten from the url and the account number linked to the token.

#### Test
Each route has a corresponding test file which takes into account edge cases.

##### Test Tools
These includes:
 - Supertest
 - Jest


#### Dependencies
The following dependencies are installed along with the project:
 - axios
 - bcrypt
 - cors
 - dotenv
 - express
 - jsonwebtoken
 - knex
 - mysql
 - mysql2

#### Dev Dependencies
The following dev dependencies are installed along with the project:
 - jest
 - supertest


