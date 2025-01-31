const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const cols = {
        Dni: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true
        },
        Nombre: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        Apellido: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        Email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true
        },
        Telefono: {
            type: DataTypes.STRING(15),
            allowNull: true
        },
        LinkedinURL: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        FechaNacimiento: {
            type: DataTypes.DATE,
            allowNull: true
        },
        Sexo: {
            type: DataTypes.ENUM('M', 'F', 'Otro'),
            allowNull: true
        },
        Imagen: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        ProfesionID: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'profesiones',
                key: 'ProfesionID'
            }
        },
        EstadoID: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'estado',
                key: 'EstadoID'
            }
        }
    };

    const config = {
        tableName: 'aspirantes',
        timestamps: false,
    };

    const Aspirante = sequelize.define("Aspirante", cols, config);

    // Definimos las relaciones
    Aspirante.associate = function (models) {
        // Relación muchos a uno con profesiones
        Aspirante.belongsTo(models.Profesion, {
            as: "profesion",
            foreignKey: "ProfesionID"
        });

        // Relación muchos a uno con estado
        Aspirante.belongsTo(models.Estado, {
            as: "estado",
            foreignKey: "EstadoID"
        });
    };

    return Aspirante;
};