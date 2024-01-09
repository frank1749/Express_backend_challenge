import dotenv from 'dotenv';
import { db } from '../config/db.js';
import UsuarioModel from '../models/UsuarioModel.js';
import { services } from './dataSeeder.js';
import colors from 'colors';

dotenv.config();

await db();

async function seedDB() {
    console.log('Desde seed');
    try {
        await UsuarioModel.insertMany(services);
        console.log(colors.green.bold('Se crearon los usuarios exitosamente'));
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

async function clearDB() {
    console.log('Limpiar seed');
    try {
        await UsuarioModel.deleteMany();
        console.log(colors.red.bold('Se eliminaron los usuarios exitosamente'));
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

if (process.argv[2] === '--import') {
    seedDB();
} else {
    clearDB();
}