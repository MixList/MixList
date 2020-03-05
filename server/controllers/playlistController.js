'use strict'
const axios = require('axios').default;
const { Playlist } = require('../models');

class PlaylistController {

    static showData(req, res, next){
        console.log('masuk sini')
        Playlist.findAll({
            where: {
                UserId: req.user.id
            }
        })
            .then(data=>{
                res.status(200).json(data);
            })
            .catch(err=>{
                console.log('error')
                next(err);
            })
    }

    static addData(req, res, next){
        let dataAdd = {
            title: req.body.title,
            artist: req.body.artist,
            UserId: req.user.id
        }

        Playlist.create(dataAdd)
            .then(data=>{
                res.status(201).json(dataAdd);
            })
            .catch(err=>{
                next(err);
            })
    }

    static editData(req, res, next){
        let dataEdit = {
            title: req.body.title,
            artist: req.body.artist,
            UserId: req.user.id
        }

        Playlist.update(dataEdit, {
            where: {
                id: req.params.id
            }
        })
            .then(data=>{
                if(data[0] === 0){
                    next({
                        msg: 'error not found',
                        status: 404
                    })
                }else{
                    res.status(200).json(dataEdit);
                }

            })
            .catch(err=>{
                next(err);
            })
    }

    static deleteData(req, res, next){
        let dataDelete;
        
        Playlist.findOne({
            where: {
                id: req.params.id
            }
        })
        .then(data=>{
            dataDelete = data;

            return Playlist.destroy({
                where: {
                    id: req.params.id
                }
            })
        })
        .then(data=>{
            if(data === 0){
                next({
                    msg: 'error not found',
                    status: 404
                })
            }else{
                res.status(200).json(dataDelete);
            }
        })
        .catch(err=>{
            next(err);
        })

class PlaylistController {
    static search(req, res, next) {
        console.log(req.body);
        let search = req.body.search;
        let url = `http://ws.audioscrobbler.com/2.0/?method=track.search&track=${search}&api_key=6d06b477bb91e3e396f172130f7952a3&format=json`;
        axios.get(url)
        .then(data => {
            res.status(200).json(data.data.results.trackmatches.track);
        }).catch(err => {
            next(err);
        });
    }
}

module.exports = PlaylistController