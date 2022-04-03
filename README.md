# Near!

<p align="center">
  <img src="client/src/assets/cover.png" width="200"/>
</p>
Near! is an E-commerce solution providing a flawless proximity-based shopping experience. It enables users to shop with and support local community by buing and selling items based on distance between their current locationa and the location of the selected item.

## Screenshots

<p align="center">
  <img src="" alt="appPhoto" />
</p>

## Getting Started

1. Clone this repo.

    ```bash
    git clone https://github.com/lthemis/Near
    ```

2. Install dependencies in both client and server folders.

    ```bash
    npm install
    ```
3. Create accounts and obtain your personal API keys from [Positionstack](https://positionstack.com/) and [Mapquest](https://developer.mapquest.com/documentation/).
   
4. Create .env file in server folder.

    ```bash
    PORT=3000
    DB=
    SECRET=
    POSITIONSTACK_KEY=
    MAPQUEST=
    ```


5. Install the [Mongo](https://www.mongodb.com/docs/manual/installation/) database on your machine.


6. Start the server. From the server folder, run

    ```bash
    nodemon index.js
    ```

7. Start the client. From the client folder, run

    ```bash
    npm start
    ```

## Tech Stack

* [React](https://reactjs.org/)
* [Leaflet](https://leafletjs.com/)
* [Node.js](https://nodejs.org/)
* [Express](https://expressjs.com/)
* [Mongo](https://www.mongodb.com/)
