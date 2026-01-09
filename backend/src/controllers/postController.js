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

postController.loginUser = async (req, res) => {
    postService.loginUser(req, res)
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.status(404).send({
                message: err.message || 'Some error occurred while retrieving data.'
            })
        })
}

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