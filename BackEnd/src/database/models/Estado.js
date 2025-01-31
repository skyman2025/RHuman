const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const cols = {
        EstadoID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Descripcion: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true
        }
    };

    const config = {
        tableName: 'estado',
        timestamps: false,
    };

    const Estado = sequelize.define("Estado", cols, config);

    // Definimos las relaciones
    Estado.associate = function (models) {
        // Relación uno a muchos con aspirantes
        Estado.hasMany(models.Aspirante, {
            as: "aspirantes",
            foreignKey: "EstadoID"
        });
    };

    return Estado;
};