// const express = require('express');
import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import cors from 'cors';
import { db } from './config/db.js';
import servicesRoutes from './routes/servicesRoutes.js';
import authRoutes from './routes/authRoutes.js';

//Variables entorno
dotenv.config();

// Configuración app
const app = express();

// Leer datos de body
app.use(express.json());

// database
db();

// Habilito Cors
app.use(cors());

// Defino ruta
app.use('/api/services', servicesRoutes);
app.use('/api/auth', authRoutes);

// Defino puerto
const PORT = process.env.port || 4000;

app.listen(PORT, () => {
    console.log(colors.blue.bgMagenta('El servidor esta corriendo en el puerto'), colors.bold(PORT));
})