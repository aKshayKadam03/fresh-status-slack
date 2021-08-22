let axios = require('axios');
let data = null

async function getData(method, url){
    const config = {
        method: method,
        url: url,
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': 'Basic ZjZjN2Y2NzgzY2JhZTlmY2NhMmJkNjE2NGMyNDQ3YjI6YWtzaGF5a2FkYW0tMTcx'
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