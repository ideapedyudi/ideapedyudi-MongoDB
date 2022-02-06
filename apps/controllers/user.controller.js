const db = require('../model')

const User = db.users

exports.findAll = (req, res) => {
    User.find()
        .then((result) => {
            res.send(result)
        }).catch((err) => {
            res.status(500).send({
                message: err.message || "Some Error While retrieving User."
            })
        })
}

exports.create = (req, res) => {
    const user = new User({
        nama: req.body.nama,
        umur: req.body.umur,
        alamat: req.body.alamat
    })

    user.save(user)
        .then((result) => {
            res.send(result)
        }).catch((err) => {
            res.status(409).send({
                message: err.message || "Some Error While create user."
            })
        })
}

exports.findOne = (req, res) => {
    const id = req.params.id

    User.findById(id)
        .then((result) => {
            res.send(result)
        }).catch((err) => {
            res.status(409).send({
                message: err.message || "Some Error While while show user."
            })
        })
}

exports.update = (req, res) => {
    const id = req.params.id

    User.findByIdAndUpdate(id, req.body)
        .then((result) => {
            if (!result) {
                res.status(404).send({
                    message: 'user not found'
                })
            }

            res.send({
                message: 'user was update'
            })
        }).catch((err) => {
            res.status(409).send({
                message: err.message || "Some Error while update user."
            })
        })
}

exports.delete = (req, res) => {
    const id = req.params.id

    User.findByIdAndRemove(id)
        .then((result) => {
            if (!result) {
                res.status(404).send({
                    message: 'user not found'
                })
            }

            res.send({
                message: 'user was delete'
            })
        }).catch((err) => {
            res.status(409).send({
                message: err.message || "Some Error while delete user."
            })
        })
}