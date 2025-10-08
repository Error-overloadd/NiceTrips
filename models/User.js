/*** Created by Lawrencium_X on 10/7/2025.*/

var orm = require("./index"),
    Seq = orm.Seq();

//Creating our module
module.exports = {
    model: {
        User_ID: {
            type: Seq.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Username: {
            type: Seq.STRING,
            allowNull: false
        },
        Email_Address: {
            type: Seq.STRING,
            allowNull: false
        },
        Postal_Address: {
            type: Seq.STRING,
            allowNull: false
        },
        Mobile_Number: {
            type: Seq.STRING,
            allowNull: true
        }
    },
    relations: [],
    options: {
        timestamps: true,
        createdAt: 'Created_Datetime',
        updatedAt: 'Updated_Datetime',
        tableName: 'User'
    }
}
