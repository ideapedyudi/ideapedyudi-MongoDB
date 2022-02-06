const db = require('../model')

const Post = db.posts

exports.findAll = (req, res) => {
    Post.find()
        .then((result) => {
            res.send(result)
        }).catch((err) => {
            res.status(500).send({
                message: err.message || "Some Error While retrieving posts."
            })
        })
}

exports.create = (req, res) => {
    const post = new Post({
        title: req.body.title,
        body: req.body.body,
        published: req.body.published ? req.body.published : false
    })

    post.save(post)
        .then((result) => {
            res.send(result)
        }).catch((err) => {
            res.status(409).send({
                message: err.message || "Some Error While create posts."
            })
        })
}

exports.findOne = (req, res) => {
    const id = req.params.id

    Post.findById(id)
        .then((result) => {
            res.send(result)
        }).catch((err) => {
            res.status(409).send({
                message: err.message || "Some Error While while show posts."
            })
        })
}

exports.update = (req, res) => {
    const id = req.params.id

    Post.findByIdAndUpdate(id, req.body)
        .then((result) => {
            if (!result) {
                res.status(404).send({
                    message: 'post not found'
                })
            }

            res.send({
                message: 'post was update'
            })
        }).catch((err) => {
            res.status(409).send({
                message: err.message || "Some Error while update posts."
            })
        })
}

exports.delete = (req, res) => {
    const id = req.params.id

    Post.findByIdAndRemove(id)
        .then((result) => {
            if (!result) {
                res.status(404).send({
                    message: 'posts not found'
                })
            }

            res.send({
                message: 'posts was delete'
            })
        }).catch((err) => {
            res.status(409).send({
                message: err.message || "Some Error while delete posts."
            })
        })
}