import AplicacionesModel from '../models/AplicacionesModel.js';
import { validateObjectId } from '../utils/index.js';

const createApplication = async (req, res) => {
    if (Object.values(req.body).includes('')) {
        return res.status(400).json({
            msg: 'Todos los campos deben ser completados'
        });
    }
    // Validar objectID
    const { idUsuario, idProyecto } = req.body;
    // Valido el id del proyecto y del usuario
    if (validateObjectId(idUsuario, res)) return;
    if (validateObjectId(idProyecto, res)) return;
    // Validar campos obligatorios
    if (!req.body.nombreUsuario || !req.body.emailUsuario || !req.body.tipoUsuario) {
        const error = new Error('Faltan campos obligatorios');
        return res.status(400).json({
            msg: error.message
        });
    };
    // Validación para no volver a aplicar a el mismo proyecto
    const projectsfound = await AplicacionesModel.find({
        idUsuario: idUsuario,
        idProyecto: idProyecto
    });
    if(projectsfound.length > 0){
        const error = new Error('Ya aplicaste a este proyecto');
        return res.status(400).json({
            msg: error.message
        });
    }
    try {
        const service = new AplicacionesModel(req.body);
        const result = await service.save();
        res.json(result);
    } catch (error) {
        console.log(error);
    }
};

const getApplication = async (req, res) => {
    try {
        const resut = await AplicacionesModel.find();
        res.json(resut);
    } catch (error) {
        console.log(error);
    }
};

export {
    createApplication,
    getApplication
}