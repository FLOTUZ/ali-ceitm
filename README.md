
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

  

## Requeriments

 - Node JS `14.19`  https://nodejs.org/en/blog/release/v14.19.3/
 -  NPM `8.18` (Included in node installation)

## Setup

 ### In the root of the project run:

```bash
npm install

# or

yarn
```

### For run the project

#### Run migrations 
The project uses PrismaJS ORM for data persistency, by default, PrismaJS is configured for SQLite
For modify conection variables, you can modify the `DATABASE_URL` envirioment variable from `.env` file in the root of the project.

See the documentation for all the connection string options: 
👉 https://pris.ly/d/connection-strings

```
DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"
```

Once the database connection environment variable has been modified, you must run the migrations with the following command.

```bash
npm run prisma:migrate
```

### Run the development server:

```bash

npm run dev

# or

yarn dev

```

## Use

### Graphql API
This project uses [Apollo Server](https://www.apollographql.com/) as Graphql handler.

The graphql API can be accessed on [http://localhost:3000/api/graphql](http://localhost:3000). This endpoint can be edited in `pages/api/graphql.ts`.

### Prisma Studio
The easy way to see the content of your database is [Prisma Studio](https://www.prisma.io/studio) an basic visual managment system embeded on [PrismaORM](https://www.prisma.io/).

For see the embeded PrismaStudio run:

```bash
npm run prisma:studio
```

### See the result

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.
  
## Learn More

To learn more about Next.js, take a look at the following resources:


- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.

- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
  

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

  

## Deploy on Vercel

  

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

  

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.