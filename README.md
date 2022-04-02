# Near

### Endpoints:

| Method     | path          | params   | body   | returns   |
| ---------- | ------------- | -------- | ------ | --------- |
| GET        | landing page  | -        | -      | -         |
| ---------- | ------------- | -------- | ------ | --------- |


# Near!

<p align="center">
  <img src="client/src/assets/cover.png" width="200"/>
</p>
Near! is a new approach to e-commerce - it's an app providing a flawless proximity-based shopping experience, allowing you to trade directly with the local community.

• Designed and developed a full-stack application from scratch for a week-long hackathon.
• Implemented client and the underlying API, data model, geocoding, and authentication.

• Created using: React, Express, MongoDB, Mongoose, ReactHookForm, Auth0.

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

3. Create .env file in client folder

    ```bash
    REACT_APP_BASE_URL=
    REACT_APP_ESRI_API_KEY=
    REACT_APP_SOCKET_URL=
    REACT_APP_CLOUDINARY_UPLOAD_PRESET=
    REACT_APP_CLOUDINARY_CLOUD_NAME=
    ```

4. Create .env file in server folder

    ```bash
    DATABASE_URL=
    SOCKET_URL=
    SERVER_URL=
    SERVER_PORT=
    ```

5. Install the [Mongo](https://www.mongodb.com/docs/manual/installation/) database on your machine


6. Start the server. From the server folder, run

    ```bash
    npx nodemon ./index.ts
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
