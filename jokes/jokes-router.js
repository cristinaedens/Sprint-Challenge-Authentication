const axios = require('axios');

const router = require('express').Router();

// router.get('/', (req, res) => {
//   const requestOptions = {
//     headers: { accept: 'application/json' },
//   };

//   axios
//     .get('https://icanhazdadjoke.com/search', requestOptions)
//     .then(response => {
//       res.status(200).json(response.data.results);
//     })
//     .catch(err => {
//       res.status(500).json({ message: 'Error Fetching Jokes', error: err });
//     });
// });


const Users = require('../users/userModel')
const restricted = require('../auth/authenticate-middleware')

router.get('/', restricted, (req, res) => {
    Users.find()
        .then(param => {
            res.status(200).json(param)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})


module.exports = router

module.exports = router;