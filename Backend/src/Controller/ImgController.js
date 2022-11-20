const fs = require('fs/promises');
const path = require('path');
const DAO = require('../Database');

class ImgController {

    async download(req, res, next){
        try {
            const filePath = path.join(__dirname,'..', 'Database', 'uploads', req.params.filename);
            res.sendFile(filePath);
        } catch (error) {

            req.error = error; 
            next();
        }
    }

}

module.exports = ImgController;