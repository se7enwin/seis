const postService = require('../services/postService')

const postController = {}

// /**
//  * Get all posts
//  *
//  * @param {object} req - Express request object.
//  * @param {object} res - Express response object.
//  */
postController.getAll = async (req, res) => {
    postService.getAll()
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.status(404).send({
                message: err.message || 'Some error occurred while retrieving data.'
            })
        })
}

postController.create = async (req, res) => {
    postService.create(req, res)
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.status(404).send({
                message: err.message || 'Some error occurred while retrieving data.'
            })
        })
}
postController.getCharById = async (req, res) => {
    postService.getCharById(req, res)
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.status(404).send({
                message: err.message || 'Some error occurred while retrieving data.'
            })
        })
}


postController.createUser = async (req, res) => {
    postService.createUser(req, res)
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: err });
        })
}

// postController.loginUser = async (req, res) => {
//     postService.loginUser(req, res)
//         .then(data => {
//             res.json(data)
//         })
//         .catch(err => {
//             res.status(404).send({
//                 message: err.message || 'Some error occurred while retrieving data.'
//             })
//         })
// }

postController.loginUser = async (req, res) => {
    try {
        const result = await postService.loginUser(req, res);
        res.json(result);
    } catch (error) {
        res.status(401).json({
            msg: error.message || 'Error al autenticar'
        });
    }
};


postController.getFav = async (req, res) => {
    postService.getFav(req, res)
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.status(404).send({
                message: err.message || 'Some error occurred while retrieving data.'
            })
        })
}



postController.createFav = async (req, res) => {
    postService.createFav(req, res)
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.status(404).send({
                message: err.message || 'Some error occurred while retrieving data.'
            })
        })
}
postController.destroyFav = async (req, res) => {
    postService.destroyFav(req, res)
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.status(404).send({
                message: err.message || 'Some error occurred while retrieving data.'
            })
        })
}


postController.confirmUser = async (req, res) => {
    try {
        const data = await postService.confirmUser(req);
        res.json(data);
    } catch (err) {
        res.status(400).json({ msg: err.message });
    }
};

postController.resendConfirmation = async (req, res) => {
    try {
        const data = await postService.resendConfirmation(req);
        res.json(data);
    } catch (err) {
        res.status(400).json({ msg: err.message });
    }
};
postController.forgotPassword = async (req, res) => {
    console.log("👉 forgotPassword CONTROLLER");

    try {
        const data = await postService.forgotPassword(req);
        res.json(data);
    } catch (err) {
        res.status(400).json({ msg: err.message });
    }
};
postController.resetPassword = async (req, res) => {
    try {
        const data = await postService.resetPassword(req);
        res.json(data);
    } catch (err) {
        res.status(400).json({ msg: err.message });
    }
};
// postController.verifyResetToken = async (req, res) => {
//     try {
//         const data = await postService.verifyResetToken(req);
//         res.json(data);
//     } catch (err) {
//         res.status(400).json({ msg: err.message });
//     }
// };



postController.getProfile = async (req, res) => {
    res.json(req.user);
};


postController.createAuthor = async (req, res) => {
    postService.createAuthor(req, res)
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.status(404).send({
                message: err.message || 'Some error occurred while retrieving data.'
            })
        })
}

postController.createBook = async (req, res) => {
    postService.createBook(req, res)
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.status(404).send({
                message: err.message || 'Some error occurred while retrieving data.'
            })
        })
}


module.exports = postController