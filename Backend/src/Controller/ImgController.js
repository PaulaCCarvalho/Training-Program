const fs = require('fs');
const DAO = require('../Database');

class ImgController {

    download(req, res, next){
        try {
            console.log('Aba')
            res.headers['Content-Type'] = 'image/png'
            res.sendFile("../Database/uploads/" + req.params.filename);
            
            
        } catch (error) {

            req.error = error 
            next
        }
    }

}

module.exports = ImgController;