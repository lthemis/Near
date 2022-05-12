# Near! [Live version](https://nearshoppingapp.netlify.app/)

<p align="center">
  <img src="client/src/assets/cover.png" width="200"/>
</p>
Near! is an E-commerce solution enabling proximity-based shopping experience. It enables users to shop with and support local community by buying and selling items based on distance between their current location and the location of the selected item.

## Getting Started

1. Install dependencies in both client and server folders.

    ```bash
    npm install
    ```
2. Create accounts and obtain your personal API keys from [Positionstack](https://positionstack.com/) and [Mapquest](https://developer.mapquest.com/documentation/).
   
3. Create .env file in server folder.

    ```bash
    PORT=3000
    DB=
    SECRET=
    POSITIONSTACK_KEY=
    MAPQUEST=
    ```


4. Install the [Mongo](https://www.mongodb.com/docs/manual/installation/) database on your machine.


5. Start the server. From the server folder, run

    ```bash
    nodemon index.js
    ```

6. Start the client. From the client folder, run

    ```bash
    npm start
    ```

## Tech Stack

* [React](https://reactjs.org/)
* [Leaflet](https://leafletjs.com/)
* [Node.js](https://nodejs.org/)
* [Express](https://expressjs.com/)
* [Mongo](https://www.mongodb.com/)
