const { Sequelize } = require('sequelize');

const n580440_Line = new Sequelize('n580440_Line', 'sa', '2410', {
    host: 'localhost',
    dialect: 'mssql',
    port: 1433,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
});
const n580440__CallCenter = new Sequelize('n580440__CallCenter', 'sa', '2410', {
    host: 'localhost',
    dialect: 'mssql',
    port: 1433,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
});


module.exports = {
    LineBotPushMsgBank: n580440_Line.define('LineBot_PushMsg_Bank', {
        AutoCounter: {
            type: Sequelize.STRING,
            primaryKey: true,
        },
        ToUserId: {
            type: Sequelize.STRING,
        },
        Result: {
            type: Sequelize.STRING,
        },
        MsgContent: {
            type: Sequelize.STRING,
        }
    }, { timestamps: false, freezeTableName: true }),
    UsersLineInfo: n580440_Line.define('UsersLineInfo', {
        UserId: {
            type: Sequelize.STRING,
            primaryKey: true,
        },
        token: {
            type: Sequelize.STRING,
        },
        nonce: {
            type: Sequelize.STRING,
        },
        lineUserId: {
            type: Sequelize.STRING,
        },
    }, { timestamps: false, freezeTableName: true }),
    Users: n580440__CallCenter.define('Users', {
        UserId: {
            type: Sequelize.STRING,
            primaryKey: true,
        },
        Password: {
            type: Sequelize.STRING,
        },
        Status: {
            type: Sequelize.STRING,
        }
    }, { timestamps: false, freezeTableName: true })

}