const dbService = require('./Enlace/Conexion');
const bcrypt = require('bcrypt');
const Validador = require('../controlador/Validador')

class MesaAyudaModelo {
    constructor({ tipoDoc, documento, nombres, llave }) {
        this.tipoDoc = tipoDoc;
        this.documento = documento;
        this.nombres = nombres;
        this.llave = llave;
        this.fechaCreacion = new Date().toISOString();
    }

    async guardar() {
        const query = `
            INSERT INTO funcionario 
            (tipoDoc, documento, nombres, rol, fechaCreacion, creadoPor, llave)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

        try {
            const hash = await bcrypt.hash(this.llave, 10);
            const rol = "MesaAyuda"; // No encriptado
            const creadoPor = "Admin";

            const valores = [
                this.tipoDoc,
                this.documento,
                this.nombres,
                rol,
                this.fechaCreacion,
                creadoPor,
                hash
            ];

            return await dbService.query(query, valores);
        } catch (err) {
            console.error("Error al guardar funcionario:", err);
            throw new Error("No se pudo guardar el funcionario.");
        }
    }
}

module.exports = MesaAyudaModelo;
