const { response } = require('express');
const express = require('express');
const router = express.Router();
const UserModel = require('./models/User.Model');
const jwt = require('jsonwebtoken');
const auth_middleware = require('./auth_middleware.js')

//create the user
router.post('/', function (req, res) {
    const { username, password } = req.body;
    // const username = req.body.username
    // const password = req.body.password
    console.log(req.body);

    if (!username || !password) {
        return res.status(422).send("Missing username: " + username + "or password:" + password)
    }
    return UserModel.insertUser({ username: username, password: password })
        .then((userResponse) => {
            req.session.username = username;

            //return response.cookie('huntersCookie', token, {httpOnly: true})
            return res.status(200).send({ username });
        })
        .catch(error => res.status(422).send(error))

});

//logout
router.post('/logout', function (req, res) {
    req.session.destroy()
    return res.send("Ok");
})

//get all user
router.get('/findAll', function (request, response) {
    UserModel.getAllUsers()
        .then((userResponse) => {
            response.status(200).send(userResponse)
        })
        .catch(error => response.status(400).send(error))
})

//check who is logged in now
router.get('/whoIsLoggedIn', auth_middleware, function (request, response) {
    const username = request.session.username;

    return response.send(username);

})

//find special username
router.get('/:username', (request, response) => {
    const username = request.params.username;
    if (!username) {
        return response.status(422).send("Missing data");
    }

    return UserModel.findUserByUsername(username)
        .then((userResponse) => {
            if (!userResponse) {
                response.status(404).send("User  are not found");
            }

            response.send(userResponse)
        })
        .catch((error) => response.status(500).send("Issue getting user"))

    // pokemons.push({
    //   name: name,
    //   health: health,
    // })

    // response.send("Success!")

})
router.post('/authenticate', function (request, response) {
    let { username, password } = request.body;
    if (!username || !password) {
        return response.status(422).send('Must include both password and username');
    }

    return UserModel.findUserByUsername(username)
        .then((userResponse) => {
            if (!userResponse) {
                return response.status(404).send("No user found with that username");
            }

            console.log(password);
            console.log(userResponse.password);

            if (userResponse.password === password) {
                request.session.username = username;
                const payload = { username: username };
                const token = jwt.sign(payload, "SUPER_DUPER_SECRET", {
                    expiresIn: '14d',
                });

                return response.cookie('huntersCookie', token, { httpOnly: true }).status(200).send({ username });
            } else {
                return response.status(404).send("No user found with that password");
            }
        })
        .catch((error) => console.error(`Something went wrong: ${error}`));


})



//   router.post('/authenticate', function(request, response) {
//     let { username, password } = request.body;
//     password = JSON.stringify(password);
//     console.log(username);
//     console.log(password);
//     if (!username || !password) {
//         return response.status(422).send('Must include both password and username');
//     }
//
//     return UserModel.findUserByUsername(username)
//         .then((userResponse) => {
//             console.log("AUTH RESPONSE: " + userResponse.body)
//             if (!userResponse) {
//                 return response.status(404).send("No user found with that username");
//             }
//             if (userResponse.password == password) {
//                 request.session.username = username;
//                 const payload = { username: username };
//                 const token = jwt.sign(payload, "SUPER_DUPER_SECRET", {
//                     expiresIn: '14d',
//                 });
//
//                 //return response.cookie('huntersCookie', token, {httpOnly: true})
//                 return response.cookie('huntersCookie', token, { httpOnly: true }).status(200).send({ username });
//
//                 // return response.status(200).send("User is logged in!")
//             } else {
//                 return response.status(404).send("No user found with that password");
//             }
//         })
//         .catch((error) => console.error(`Something went wrong: ${error}`));
//
//
//
//
//
// })

//add faviority
router.post('/addFavorites', auth_middleware, function (request, response) {
    const username = request.session.username;
    const jobId = request.body.jobId;
    if (!jobId) {
        return response.status(422).send("Missing jobId");
    }

    return UserModel.favorite(username, jobId)
        .then(userResponse => response.status(200).send(userResponse))
        .catch(error => response.status(400).send(error))

})

//show all favoirutes
router.get('/getAllFavorites/:username', auth_middleware, (request, response) => {
    // const username = request.session.username;
    const username = request.params.username;

    if (!username) {
        return response.status(422).send("user not found");
    }

    return UserModel.findUserByUsername(username)
        .then((userResponse) => {
            if (!userResponse) {
                response.status(404).send("array not found");
            }

            response.send(userResponse.favorites)
        })
        .catch((error) => response.status(500).send("Issue getting user"))

})


router.get('/allLiked', auth_middleware, (request, response) => {
    const username = request.session.username;

    return UserModel.findUserByUsername(username)
        .then((userResponse) => {
            if (!userResponse) {
                response.status(404).send("favorites array not found");
            }

            response.send(userResponse.favorites)
        })
        .catch((error) => response.status(500).send("Issue getting user"))

})




module.exports = router;