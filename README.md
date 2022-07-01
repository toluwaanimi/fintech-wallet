# LazerPay

## Documentation of LazerPay

## Author 🚀

> ADEBAYO EMMANUEL TOLUWANIMI
---

## Technologies

- Node JS
- NestJS
- Typeorm
- Docker
- RabbitMQ

---

## Database

- [Postgres](https://www.postgresql.org/) (TypeORM)

---

## Install NodeJS

To Install NodeJS, kindly go to [Nodejs](https://nodejs.com) and follow the necessary instructions required depending on
your PC Operating System

## MACOS

using a [package](https://nodejs.org/en/#download) simply download the installer

using [homebrew](https://github.com/Homebrew/legacy-homebrew)

```markdown
brew install node
```

---

## Windows

using a [package](https://nodejs.org/en/#download) simply download the installer

using [chocolatey](http://chocolatey.org/) to install Node

```markdown
cinst nodejs
```

---

## To install Postgres

For Windows users, you can kindly follow this
tutorials [here](https://learnsql.com/blog/how-to-install-postgresql-on-windows-in-5-minutes/) to install Postgres on
your local PC which explains how to create a database

For Mac users, you can kindly follow this tutorials [here](https://www.robinwieruch.de/postgres-sql-macos-setup)  to
install Postgres on your local PC which explains how to create a database


---

## Setup Database

To setup your database for the project, after creation kindly open the app.module.ts file in the  folder of the
project and replace with your credentials

```markdown
  ... 
   url: db url here,
```

### OR

Create a .env file in the root directory and add your databae details. It should have the following properties

```markdown
DATABASE_HOST= DATABASE_USERNAME= DATABASE_PASSWORD= DATABASE_NAME= DATABASE_PORT=
```

Kindly replace these values with the appropriate values based on your Database environment
---

## Start Development

Kindly clone the repo `https://github.com/toluwaanimi/lazerpay.git`

### Installation

To install the necessary packages, in your folder directory kindly run

```markdown
npm i

# or

yarn add
```

* To continuously watch for changes
    * ```markdown 
      npm run dev
      ```

* To build your app for production
    * ```markdown
      npm run build
         ```


* To run your app server for production
    * ```markdown
      npm run start
         ```

* To run your E2E Test
    * ```markdown
      npm run test:e2e
         ```



* To run your Test
    * ```markdown
      npm run test
         ```

---

## Implementation Required
The Documentation can be found at /docs
# Docker Image

To run a docker image of Postgres and RabbitMQ
```markdown 
      docker-compose up
      ``




