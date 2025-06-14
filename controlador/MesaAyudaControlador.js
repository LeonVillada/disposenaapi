const MesaAyudaModelo = require('../modelo/MesaAyudaModelo');
const mesaayuda = require('../modelo/MesaAyudaModelo');
const Validador = require('./Validador');


class MesaAyudaControlador {
    constructor() {
        this.validador = new Validador();
    }

  async crearFuncionario(req, res) {
    const { t1: tipoDoc, t2: documento, t3: nombres, t4: llave } = req.body;

    const errores = this.validador.validarTodos(tipoDoc, documento, nombres, llave);
    if (errores.length > 0) {
      return res.status(400).json({ error: errores });
    }

    try {
      const nuevoFuncionario = new MesaAyudaModelo({
        tipoDoc: tipoDoc,
        documento: documento,
        nombres: nombres,
        llave: llave
      });

      const resultado = await nuevoFuncionario.guardar();

      // Enviar correo de bienvenida
      /*try {
      await CorreoControlador.enviarBienvenida(nom, email);
      } catch (correoError) {
        console.warn('Usuario creado, pero el correo no fue enviado:', correoError.message);
      }*/

      return res.status(201).json({
        mensaje: 'Funcionario creado con éxito',
        id: resultado.insertId
      });

    } catch (err) {
      if (err.message.includes('campo duplicado')) {
        return res.status(409).json({
          error: 'Ya existe un funcionario con estos datos.'
        });
      }
      return res.status(500).json({ error: 'Error no se pudo: ' + err.message });
    }
  }
}

module.exports = MesaAyudaControlador;