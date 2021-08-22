let axios = require('axios');
let data = null

async function getData(method, url, body){
    const config = {
        method: method,
        url: url,
        data: body,
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': process.env.FRESH_STATUS_AUTH
        }
      };
      
    await axios(config)
    .then((response) => {
        data = response.data
    })
    .catch((error) => {
        console.log(error);
    })
     
    return data
}

module.exports = getData