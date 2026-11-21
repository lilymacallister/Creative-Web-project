# Plant Swap

## Run steps & ports

Express server:
```
npm install
cp .env.example .env     # then edit .env to include your username and password and the link to the class database
npm run dev
```
Runs on port **3001**.

Sveltekit:
```
npm install
cp .env.example .env     # SKETCH_API_URL is the address of the Express API
npm run dev
```
Runs on port **5173**.

## Follow the flow

**Where is it decided?**

Express connects to the Mongoose cluster, stored in `S2bStarterExpress\.env`. The database name is `lilyPlantShelf`, also stored in this file, and the collection name is `Plant`, determined by the name of the model (`S2bStarterExpress\models\Plant.js`).

**Follow the filter**

1. The request goes to the svelte file `routes\shelf\+page.svelte`.
2. This file loads data using `routes\shelf\+page.server.js`.
3. This file determines what the request is, before requesting this from `lib\server\plantApi.js`.
4. Another request is then made to the express server, in `lib\plantData.js`.
5. This file creates a query for the Mongoose database, which finally returns the data.

**What is a plant's id?**

The plant's ID is stored in the "_id" feild in MongoDB, and is automatically generated. It is unique to each plant. In the Express sends it is stored the same as in MongoDb - once again as a string - and this string is used in the URLs when searching for a specific plant.

Express doesn't create the ID itself - it gets it from the Mongoose database. The SvelteKit code did not need much adjusting, as the ID was not changed by it at all - just checked or passed as a parameter when needed, such as having each plant card link to the plant's individual page on line 119 of `routes\shelf\+page.svelte`, or allowing the API to edit and delete specific plants.