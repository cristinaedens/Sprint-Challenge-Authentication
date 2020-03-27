const router = require('express').Router();
const bcrypt = require('bcryptjs');

const Users = require('../users/userModel');
const newToken = require('./generateToken');
const { validateUser } = require('../users/userValidation');

router.post('/register', (req, res) => {
    // implement registration
    let user = req.body

    const validateResult = validateUser(user);
    if (validateResult.isSuccessful === true) {
        const hash = bcrypt.hashSync(user.password, 8);
        user.password = hash;

        Users.add(user)
            .then(saved => {
                const token = newToken(saved);
                res.status(201).json(token);
            })
            .catch(err => {
                res.status(500).json({ message: 'I need this break', err })
            })
    } else {
        res.status(400).json({ Message: 'not valid', errors: validationResult })
    }
});

router.post('/login', (req, res) => {
    // implement login
    let { username, password } = req.body;

    Users.findBy({ username })
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                const token = newToken(user);
                res.status(200).json({ Message: `Welcome ${user.username}`, token });
            } else {
                res.status(401).json({ Message: 'Credentials not valid' });
            }
        })
        .catch(err => {
            res.status(500).json({ Message: 'This is not the error you are looking for' })
        })
});

module.exports = router;