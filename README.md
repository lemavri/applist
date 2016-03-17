# Preparations

Make sure you have [Node.js](https://nodejs.org/en/) installed.

#Running the app
In order to run the app you need to have npm and NodeJS installed.

Now, run `npm install` to install the dependencies.

You also need to set the ClientSecret, ClientId and Domain for your Auth0 app as environment variables with the following names respectively: `AUTH0_CLIENT_SECRET`, `AUTH0_CLIENT_ID` and `AUTH0_DOMAIN`.

Also, you need to create an API token with the following scopes: `read:clients`, `read:rules`, and set it to the `AUTH0_API_TOKEN` environment variable.

For that, if you just create a file named `.env` in the directory and set the values like the following, the app will just work:

````bash
# .env file
AUTH0_CLIENT_SECRET=myCoolSecret
AUTH0_CLIENT_ID=myCoolClientId
AUTH0_DOMAIN=myCoolDomain
AUTH0_API_TOKEN=myApiToken
````

Once you've set those 4 environment variables, just run `npm start` and try calling [http://localhost:3000/](http://localhost:3000/)
