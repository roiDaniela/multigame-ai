checkIfSaved: (url, model) => {

  model.findOne({ 'imgUrl': url })  
  .catch(err => )
  .then(doSomething);
},


deleteDBAndRestart: () => {
  return new Promise(() => {

  })
  .then()
  .catch()

},

retrieveDataFromDB: () => {
  return new Promise(() => {

  })
  .then()
  .catch()

},