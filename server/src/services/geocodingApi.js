require('dotenv').config();
const BASE_URL = 'http://api.positionstack.com/v1/forward';
const KEY = process.env.POSITIONSTACK_KEY;
const axios = require('axios');


const forwardGeocoding = async ({country, city, street, homeNum, zip}) => {

  const params = {
    access_key: KEY,
    query: `${zip} ${street} ${homeNum}, ${city} ${country}`,
    limit: 1
  }

  return await axios.get(BASE_URL, {params})
    .then(response => {
      return response.data.data[0]
    }).catch(error => {
      console.log(error);
    });
}

module.exports = {forwardGeocoding}