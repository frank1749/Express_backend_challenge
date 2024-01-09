import mongoose from 'mongoose';

const projectSchema = mongoose.Schema({
    nombreProyecto: {
        type: String,
        required: true,
        trim: true, // Elimina espacios en blanco del String
        unique: true,
    },
    fechaInicial: {
        type: Date,
        required: true,
        trim: true
    },
    fechaFinal: {
        type: Date,
        required: true,
        trim: true
    },
    items: {
        type: Array
    }
});

const ProyectosModel = mongoose.model('Proyectos', projectSchema);
export default ProyectosModel