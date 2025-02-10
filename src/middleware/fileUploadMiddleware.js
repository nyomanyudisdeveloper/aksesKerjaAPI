import multer from 'multer';
import { ResponseStatus } from '../utils/responseHelper.js';

const uploadImage = multer({ 
    storage: multer.memoryStorage()
});

export const checkFileIsImage = async (req,res,next) => {
    const uploadSingle = uploadImage.single("image");

    uploadSingle(req, res, (err) => {
        if (err) {
            return res.status(400).send({
                status:ResponseStatus.BAD_REQUEST,
                message: 'Format Image tidak sesuai',
                data:null 
            })
        }

        if (!req.file) {
            return res.status(400).send({ 
                status:ResponseStatus.BAD_REQUEST,
                message: 'Field file tidak boleh kosong',
                data:null 
            });
        }

        const {mimetype} = req.file
        if(mimetype != 'image/png' && mimetype != 'image/jpeg'){
            return res.status(400).send({ 
                status:ResponseStatus.BAD_REQUEST,
                message: 'Format Image tidak sesuai',
                data:null 
            });
        }

        next()
    });
}

