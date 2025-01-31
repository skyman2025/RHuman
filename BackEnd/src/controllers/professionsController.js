const db = require("../database/models");

const controller = {
    renderList: (req, res) => {
        db.Profesion.findAll({
            include: [{
                model: db.Aspirante,
                as: "aspirantes",
                attributes: [] // No seleccionamos atributos de aspirantes directamente
            }],
            attributes: {
                include: [
                    [db.sequelize.fn('COUNT', db.sequelize.col('aspirantes.Dni')), 'applicantsCount']
                ]
            },
            group: ['Profesion.ProfesionID', 'Profesion.Nombre', 'Profesion.Imagen', 'Profesion.Descripcion']
        })
        .then(function (profesiones) {
            const formattedProfessions = profesiones.map(profesion => ({
                id: profesion.ProfesionID,
                name: profesion.Nombre,
                img: `http://localhost:3001/img/${profesion.Imagen}`,
                descripcion: profesion.Descripcion,
                applicantsCount: profesion.get('applicantsCount')
            }));
            res.json(formattedProfessions);
        }).catch(function (error) {
            console.error('Error al obtener las profesiones:', error);
            res.status(500).json({ error: 'Error al obtener las profesiones' });
        });
    }
}
module.exports = controller;