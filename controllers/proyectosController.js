import ProyectosModel from '../models/ProyectosModel.js';
import { validateObjectId, handleNotFoundError } from '../utils/index.js';

const createProject = async (req, res) => {
    if (Object.values(req.body).includes('')) {
        return res.status(400).json({
            msg: 'Todos los campos son obligatarios'
        });
    }
    // Evitar nombres de proyecto duplicados
    const { nombreProyecto } = req.body;
    const projectExists = await ProyectosModel.findOne({ nombreProyecto });
    if (projectExists) {
        const error = new Error('El nombre de proyecto ya existe');
        return res.status(400).json({
            msg: error.message
        });
    };
    try {
        const service = new ProyectosModel(req.body);
        const result = await service.save();
        res.json(result);
    } catch (error) {
        console.log(error);
    }
};

const getProject = async (req, res) => {
    try {
        const resut = await ProyectosModel.find().sort({ _id: -1 });
        res.json(resut);
    } catch (error) {
        console.log(error);
    }
};

const updateItemsProject = async (req, res) => {
    if (Object.values(req.body).includes('')) {
        return res.status(400).json({
            msg: 'Todos los campos son obligatarios'
        });
    }
    const { idProyecto, dataItems } = req.body;
    // Valido elementos a actualizar
    if(!dataItems){
        const error = new Error('No hay elementos a actualizar');
        return res.status(400).json({
            msg: error.message
        });
    }
    try {
        const resut = await ProyectosModel.findByIdAndUpdate(
            idProyecto,
            { items: dataItems }
        );
        res.json(resut);
    } catch (error) {
        console.log(error);
    }
};

const getProjectById = async (req, res) => {
    const { id } = req.params;
    // Validar objectID
    if (validateObjectId(id, res)) return;
    // Validar que exista
    const service = await ProyectosModel.findById(id);
    if (!service) {
        return handleNotFoundError('No existe registro', res);
    };
    // Mostrar registro
    res.json(service);
}

export {
    createProject,
    getProject,
    getProjectById,
    updateItemsProject
}