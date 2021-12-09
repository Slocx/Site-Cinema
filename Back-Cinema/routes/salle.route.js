// import du framework
const express = require('express');

const SalleModel = require('../models/salle.model');

// récupération du Router Express
const Router = express.Router();

// logique pour la route 'salles'
Router.route('/salles')
    .get(async (_, res) => {
        // Récupération de TOUS les films dans la base
        // await = attends la reponse
        let salles = await SalleModel.find();

        if (salles.length === 0) {
            res.status(404);
        } else {
            res.status(200);
        }

        res.json(salles);
    })
    .post(async (req, res) => {
        let newSalle = req.body;
        try {
            let resp = await SalleModel.create(newSalle);
            res.status(201).json(resp);
        } catch (err) {
            console.error(err);
            sendErrMessage(res, err);
        }
    });

// logique pour la route 'salles/id'
Router.route('/salles/:id')
    .get(async (req, res) => {
        try {
            // recherche d'une salle par id
            let salle = await SalleModel.findById(req.params.id);
            res.status(200).json(salle);
        } catch (err) {
            sendErrMessage(res, err);
        }
    })
    .put(async (req, res) => {
        let newSalle = req.body;
        try {
            let resp = await SalleModel.findByIdAndUpdate(req.params.id, newSalle);
            res.json(resp);
        } catch (err) {
            sendErrMessage(res, err);
        }
    })
    .delete(async (req, res) => {
        try {
            let resp = await SalleModel.findByIdAndDelete(req.params.id);
            req.json(resp);
        } catch (err) {
            sendErrMessage(res, err);
        }
    });

// export de la route
module.exports = Router;
const sendErrMessage = (res, err) => {
    res.status(400).json({
        ok: false,
        message: err.message
    });
}

