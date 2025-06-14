const express = require('express');
const conMesa = require('../controlador/MesaAyudaControlador');

class MesaAyudaVista {
    constructor() {
        this.router = express.Router();
        this.controlador = new conMesa();
        this.configurarRutas();
    }

    configurarRutas() {
        this.router.post('/funcionario', (req, res) => this.controlador.crearFuncionario(req, res));
    }

    mostrarRutas() {
        return this.router;
    }
}

module.exports = new MesaAyudaVista().mostrarRutas();