import mongoose from 'mongoose';

const applicationSchema = mongoose.Schema({
    idUsuario: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        trim: true // Elimina espacios en blanco del String
    },
    nombreUsuario: {
        type: String,
        required: true,
        trim: true
    },
    emailUsuario: {
        type: String,
        required: true,
        trim: true
    },
    tipoUsuario: {
        type: String,
        required: true,
        trim: true
    },
    idProyecto: {
        type: mongoose.Schema.Types.ObjectId
    }
});

const AplicacionesModel = mongoose.model('Aplicaciones', applicationSchema);
export default AplicacionesModel