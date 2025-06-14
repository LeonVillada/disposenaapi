class Validador {
    ValidadorTodos(tipoDoc, documento, nombres, llave) {
        const errores = [];

        const campos = this.verCampos(tipoDoc, documento, nombres, llave);
        if (campos) errores.push(campos);//ok

        const tdoc = this.verIde(tipoDoc);//ok
        if (tdoc) errores.push(tdoc);

        const ide = this.verIde(documento);//ok
        if (ide) errores.push(ide);

        const nom = this.verNombres(nombres);//ok
        if (nom) errores.push(nom);

        const clave = this.verLlave(llave);//ok
        if (clave) errores.push(clave);

        return errores;
    }

verCampos(tipoDoc, documento, nombres, llave) {
    if (!tipoDoc || !documento || !nombres || !llave) {
        return 'Todos los campos son obligatorios.';
    }
    return null;
}

verTdoc(td) {
    const tdocValido = /^(CC|CE|PP|PT)$/;
    if (!tdocValido.test(td)) {
        return 'Tipo de documento inválido. Solo se admiten los siguientes: "CC", "CE", "PP", "PT".';
    }
    return null;
}


verIde(doc) {
    if (!/^\d{6,10}$/.test(doc)) {
        return 'La identificación debe tener entre 6 y 10 dígitos numéricos.';
    }
    return null;
}

verNombres(name) {
    const nom = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{3,100}$/;
        if (!nom.test(name)) {
            return 'Nombres y apellidos inválidos. Solo letras (3-100 caracteres).';
        }
    return null;
}

    verLlave(contra) {
        const key = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
        if (!key.test(contra)) {
        return 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un símbolo especial.';
        }
        return null;
    }
}

module.exports = Validador;