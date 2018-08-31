module.exports = {

  getClarifaiData: (url) => {

    return new Promise((resolve, reject) => {

      // instantiate a new Clarifai app passing in your clientId and clientSecret
        const app = new Clarifai.App({
            apiKey: '185dac78c93743398b48f19e8a744bb7'
        });

      // predict the contents of an image by passing in a url
      app.models.predict(Clarifai.GENERAL_MODEL, url)
      .then(
        function(response) {
          resolve(response);
        },
        function(err) {
          reject(err);
        }
      )
    });
  },
  
  // get the name of property and value of the property of the image given
  parseOneData: (imageUrl, response) => {
    var concepts = response.outputs[0].data.concepts;
    for (let i = 0; i < concepts.length; i++) {
      console.log(concepts[i].name," ", concepts[i].value);
    }
  }

};