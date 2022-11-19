const fs = require('fs/promises');
const path = require('path');
const DAO = require('../Database');

class ImgController {

    async download(req, res, next){
        try {
            console.log('Start')
            const filePath = path.join(__dirname,'..', 'Database', 'uploads', req.params.filename);
            // res.headers.Content-Type = 'image/jpeg';
            const b = await fs.readFile(filePath);
            res.send(b.toString());
        } catch (error) {

            req.error = error; 
            next();
        }
    }

}

module.exports = ImgController;