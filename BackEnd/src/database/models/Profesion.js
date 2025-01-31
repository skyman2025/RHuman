const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const cols = {
        ProfesionID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Nombre: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true
        },
        Imagen: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        Descripcion: {
            type: DataTypes.STRING(1000),
            allowNull: true
        }
    };

    const config = {
        tableName: 'profesiones',
        timestamps: false,
    };

    const Profesion = sequelize.define("Profesion", cols, config);

    // Definimos las relaciones
    Profesion.associate = function (models) {
        // Relación uno a muchos con aspirantes
        Profesion.hasMany(models.Aspirante, {
            as: "aspirantes",
            foreignKey: "ProfesionID"
        });
    };

    return Profesion;
};