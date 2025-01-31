const db = require("../database/models");
const path = require('path');

const controller = {
  renderList: (req, res) => {
    db.Aspirante.findAll({
      include: ["profesion", "estado"]
    })
    .then(function (aspirantes) {
        const formattedAspirantes = aspirantes.map(aspirante => ({
            dni: aspirante.Dni,
            name: aspirante.Nombre,
            lastName: aspirante.Apellido,
            profession: aspirante.profesion.Nombre,
            status: aspirante.estado.Descripcion,
            avatar: `http://localhost:3001/img/${aspirante.Imagen}`,
            detail: `/applicants/${aspirante.Dni}`
        }));

        const result = {
            count: aspirantes.length,
            aspirantes: formattedAspirantes
        };
        res.json(result);
    }).catch(function (error) {
        console.error('Error al obtener los aspirantes:', error);
        res.status(500).json({ error: 'Error al obtener los aspirantes' });
    });
  },

  renderDetail: (req, res) => {
    db.Aspirante.findByPk(req.params.id, {
        include: ["profesion", "estado"]
    })
      .then(function (aspirante) {
        const result = {
            dni: aspirante.Dni,
            firstName: aspirante.Nombre,
            lastName: aspirante.Apellido,
            email: aspirante.Email,
            phone: aspirante.Telefono,
            linkedin: aspirante.LinkedinURL,
            birthdate: aspirante.FechaNacimiento,
            gender: aspirante.Sexo,
            avatar: `http://localhost:3001/img/${aspirante.Imagen}`,
            profesion: aspirante.profesion.Nombre,
            estado: aspirante.estado.Descripcion
        };
        res.json(result);
      }).catch(function (error) {
        console.error('Error al obtener el aspirante:', error);
        res.status(500).json({ error: 'Error al obtener el aspirante' });
    });
  },

  renderRegister : (req, res) => {
    const { Nombre, Apellido, Dni, Email, Telefono, LinkedinURL, FechaNacimiento, Sexo, ProfesionID, EstadoID, Password } = req.body;
    const dni = parseInt(Dni, 10);
    const profesionID = parseInt(ProfesionID, 10);
    const estadoID = parseInt(EstadoID, 10);
    const rutImagenExt= req.file.filename

    //     const existAspirante = await db.Aspirante.findOne({ where: { Dni: dni } });
    //     if (existAspirante) {
    //       return res.status(400).json({ error: 'DNI ya registrado' });
    //     }

    db.Aspirante.create({
      Nombre,
      Apellido,
      Dni: dni,
      Email,
      Telefono,
      LinkedinURL,
      FechaNacimiento,
      Sexo,
      ProfesionID: profesionID,
      EstadoID: estadoID,
      Password,
      Imagen: rutImagenExt
    })

    .then(aspirante => {
      const result = {
        dni: aspirante.Dni,
        firstName: aspirante.Nombre,
        lastName: aspirante.Apellido,
        email: aspirante.Email,
        phone: aspirante.Telefono,
        linkedin: aspirante.LinkedinURL,
        birthdate: aspirante.FechaNacimiento,
        gender: aspirante.Sexo,
        avatar: `http://localhost:3001/img/${aspirante.Imagen}`,
        profesion: aspirante.ProfesionID,
        estado: aspirante.EstadoID
      };
      res.json(result);
    })
    .catch(error => {
      console.error('Error al crear el aspirante:', error);
      res.status(500).json({ error: 'Error al crear el aspirante' });
    });
  },

  renderLogin: (req, res) => {
    const { Email, Dni } = req.body;
    const dni = parseInt(Dni, 10);

    db.Aspirante.findOne({
        where: { Email: "test1@example.us" }
    })
    .then(function (aspirante) {
        if (!aspirante) {
            return res.status(404).json({ error: 'Aspirante no encontrado' });
        }
        if (aspirante.Dni !== dni) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }
        console.log(`Inicio de sesión exitoso para el aspirante con email: ${aspirante.Email}`);
        const response = {
            dni: aspirante.Dni,
            firstName: aspirante.Nombre,
            lastName: aspirante.Apellido,
            email: aspirante.Email
        };

        res.status(200).json(response);
    })
    .catch(function (error) {
        console.error('Error al obtener el aspirante:', error);
        res.status(500).json({ error: 'Error al obtener el aspirante' });
    });
}

}

module.exports = controller;

