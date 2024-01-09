import UsuarioModel from '../models/UsuarioModel.js';

const register = async (req, res) => {
    // Valido campos vacios
    if (Object.values(req.body).includes('')) {
        const error = new Error('Todos los campos son obligatorios');
        return res.status(400).json({
            msg: error.message
        });
    };
    // Evitar registros duplicados
    const { email, password } = req.body;
    const userExists = await UsuarioModel.findOne({ email });
    if (userExists) {
        const error = new Error('Usuario ya registrado');
        return res.status(400).json({
            msg: error.message
        });
    };
    // Validaciones password
    const MIN_PASSWORD_LENGTH = 8;
    if (password.trim().length < MIN_PASSWORD_LENGTH) {
        const error = new Error(`El password debe ser de mínimo ${MIN_PASSWORD_LENGTH} caracteres`);
        return res.status(400).json({
            msg: error.message
        });
    };
    // Valido el tipo de usuario a crear
    if(req.body.type){
        console.log(req.body.type);
        if(req.body.type !== 'constructor' && req.body.type !== 'proveedor') {
            const error = new Error('El tipo de usuario es inválido');
            return res.status(400).json({
                msg: error.message
            });
        }
    };

    try {
        const user = new UsuarioModel(req.body);
        await user.save();
        res.json({
            msg: 'Usuario creado exitosamente'
        })
    } catch (error) {
        console.log(error);
    }
};

const login = async (req, res) => {
    const { name, email, password } = req.body;
    // Valido si existe usuario
    const userExists = await UsuarioModel.findOne({ email });
    if (!userExists) {
        const error = new Error('El usuario no existe');
        return res.status(400).json({
            msg: error.message
        });
    };
    //Comprobar password
    if (await userExists.checkPassword(password)) {
        res.json({
            msg: 'Usuario Autenticado',
            data: {
                id: userExists.id,
                name: userExists.name,
                email: userExists.email,
                type: userExists.type
            }
        });
    } else {
        const error = new Error('Error de datos de usuario');
        return res.status(400).json({
            msg: error.message
        });
    };

};

export {
    register,
    login
}