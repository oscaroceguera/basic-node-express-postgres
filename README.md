# NODE.JS, EXPRESS.js, POSTGRESQL, SEQUALIZE

## Re-Initialize Data Base

If you want to re-initialize your database on every Express server start, you can add a condition to your sync method:

```javascript
const eraseDatabaseOnSync = true;
sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
  app.listen(process.env.PORT, () =>
    console.log(`Example app listening on port ${process.env.PORT}!`)
  );
});
```

## HOW TO SEED A POSTGRESQL DATABASE?

Last but not least, you may want to seed your PostgreSQL database with initial data to start with. Otherwise, you will always start with a blank slate when purging your database (e.g. eraseDatabaseOnSync) with every application start.

In our case, we have user and message entities in our database. Each message is associated to a user. Now, every time you start your application, your database is connected to your physical database. That's where you decided to purge all your data with a boolean flag in your source code. Also this could be the place for seeding your database with initial data.

```javascript
...
const eraseDatabaseOnSync = true;
sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
  if (eraseDatabaseOnSync) {
    createUsersWithMessages();
  }
  app.listen(process.env.PORT, () =>
    console.log(`Example app listening on port ${process.env.PORT}!`),
  );
});
const createUsersWithMessages = async () => {
  ...
};

```

The createUsersWithMessages() function will be used to seed our database. The seeding happens asynchronously, because creating data in the database is not a synchronous task. Let's see how we can create our first user in PostgreSQL with Sequelize:

```javascript
...
const createUsersWithMessages = async () => {
  await models.User.create(
    {
      username: 'hackname',
    },
  );
};
```

Each of our user entities has only a username as property. But what about the message(s) for this user? We can create them in one function with the user:

```javascript
...
const createUsersWithMessages = async () => {
  await models.User.create(
    {
      username: 'rwieruch',
      messages: [
        {
          text: 'Published the Road to learn React',
        },
      ],
    },
    {
      include: [models.Message],
    },
  );
};
```

We can say that our user entity should be created with message entities. Since a message has only a text, we can pass these texts as array to the user creation. Each message entity will then be associated to a user with a user identifier. Let's create a second user, but this time with two messages:

```javascript
...
const createUsersWithMessages = async () => {
  await models.User.create(
    {
      username: 'rwieruch',
      messages: [
        {
          text: 'Published the Road to learn React',
        },
      ],
    },
    {
      include: [models.Message],
    },
  );
  await models.User.create(
    {
      username: 'ddavids',
      messages: [
        {
          text: 'Happy to release ...',
        },
        {
          text: 'Published a complete ...',
        },
      ],
    },
    {
      include: [models.Message],
    },
  );
};

```

That's it. In our case, we have used our models to create users with associated messages. It happens when the application starts and we want to start with a clean slate; it's called database seeding. However, the API of our models is used the same way later in our application to create users and messages. In the end, we have set up PostgreSQL in a Node.js with Express application. What's missing is connecting the database to Express for enabling users to operate on the database with the API rather than operating on sample data.
