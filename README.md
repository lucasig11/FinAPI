<p align="center">
  <img alt="License" src="https://img.shields.io/static/v1?label=license&message=MIT&color=8257E5&labelColor=000000">
</p>
<p align="center">
    <img alt="logo" src="./.github/logo.png" width="300"></img>
</p>

<p align="center">
  |&nbsp;&nbsp;&nbsp;
  <a href="#-technologies">Techs</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-project">Project</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-run">Run</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
</p>

---

## 👨‍💻 Technologies

This project was developed using the following technologies:

- [NodeJS](https://nodejs.org/en/)
- [Typescript](https://www.typescriptlang.org/)
- [Docker](https://www.docker.com/)
- [Postgres](https://www.postgresql.org/)

## 💻 Project

This project is a tiny financial API, with routes for creating, updating and deleting users as well as for banking operations as withdrawals, deposits, get the account balance and list it's statement. It was developed following the [constraints](#-constraints) provided by the eponymous project made in the first week of [Rocketseat](https://github.com/rocketseat-education)'s Ignite course.

## 🚀 Run

Make sure you have NodeJS (`node -v`) and Docker (`docker -v`, optional but highly recommended) installed in your machine.

```bash

git clone https://github.com/lucasig11/finapi                                   ## clone the repo

docker run --name postgres -e POSTGRES-PASSWORD=docker -p 5432:5432 -d postgres ## create postgres container
docker start postgres                                                           ## start all the containers

cd finapi                                                                       ## cd into the directory

yarn                                                                            ## install deps

yarn typeorm migration:run                                                      ## run the database migrations

yarn dev:server                                                                 ## start node (port 3333)
```

## 📝 Tests

```bash
yarn test
```

---

## Routes

Import the file in [.insomnia](.insomnia) to your [Insomnia app](https://insomnia.rest/) to test all the routes.

## Project Constraints

- **Application requirements**

  - [x] It should be possible to create an account;
  - [x] It must be possible to update customer account data
  - [x] It must be possible to delete an account;
  - [x] It must be possible to make a deposit;
  - [x] It must be possible to retrieve a customer's bank statement by id and date;
  - [x] It must be possible to make a withdrawal;

- **Business rules**
  - [x] It should not be possible to register an account with an existing CPF;
  - [x] It should not be possible to delete a non-existing account;
  - [x] It should not be possible to deposit to a non-existing account;
  - [x] It should not be possible to search for a statement in a non-existing account;
  - [x] It should not be possible to withdraw to a non-existing account;
  - [x] It must not be possible to make a withdrawal when the balance is insufficient;

---

Made with ♥ by [lucasig11](https://github.com/lucasig11) 👋🏻
