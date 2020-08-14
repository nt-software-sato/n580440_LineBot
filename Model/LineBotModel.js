require('dotenv').config();
const { Sequelize } = require('sequelize');

const config = process.env;

const n580440_Line = new Sequelize('n580440_Line', config.sqlAccount, config.sqlPassWord, {
    host: config.sqlHost,
    dialect: 'mssql',
    port: 1433,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
});
const n580440__CallCenter = new Sequelize('n580440__CallCenter', config.sqlAccount, config.sqlPassWord, {
    host: config.sqlHost,
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
    PushMsgBank: n580440_Line.define('LineBot_PushMsg_Bank', {
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
        },
        ErrMsg: {
            type: Sequelize.STRING,
        }
    }, { timestamps: false, freezeTableName: true }),
    UsersLineInfo: n580440_Line.define('LineBot_UserInfo', {
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