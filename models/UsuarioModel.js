import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { uniqueId } from '../utils/index.js';

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        lowercase: true
    },
    type: {
        type: String,
        enum: ['constructor', 'proveedor'],
        default: 'constructor',
        required: true,
        trim: true
    },
    token: {
        type: String,
        default: () => uniqueId() // Para escalamiento a futuro
    },
});

// Hashear contraseña
userSchema.pre('validate', async function (next) {
    if (!this.isModified('password')) {
        next();
    };
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.checkPassword = async function (inputPassword) {
    return await bcrypt.compare(inputPassword, this.password);
}

const UsuarioModel = mongoose.model('Usuarios', userSchema);
export default UsuarioModel;