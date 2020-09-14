const {Sequelize} = require('sequelize');

const n580440_Line = new Sequelize('n580440__CallCenter', g_config.dataBase.sqlAccount, g_config.dataBase.sqlPassWord, {
    host: g_config.dataBase.sqlHost,
    dialect: 'mssql',
    port: 1433,
    pool: {
        max: 100,
        min: 5,
        acquire: 30000,
        idle: 10000
    },
    logging: false
});
const n580440__CallCenter = new Sequelize('n580440__CallCenter', g_config.dataBase.sqlAccount, g_config.dataBase.sqlPassWord, {
    host: g_config.dataBase.sqlHost,
    dialect: 'mssql',
    port: 1433,
    pool: {
        max: 100,
        min: 5,
        acquire: 30000,
        idle: 10000
    },
    logging: false
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
    }, {timestamps: false, freezeTableName: true}),

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
    }, {timestamps: false, freezeTableName: true}),

    SecureToken: n580440_Line.define('LineBot_SecureToken', {
        AutoCounter: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Token: {
            type: Sequelize.STRING,
        },
        UserLineId: {
            type: Sequelize.STRING,
        },
        IssueTime: {
            type: Sequelize.DATE,
        },
        Used: {
            type: Sequelize.INTEGER,
        },
    }, {timestamps: false, freezeTableName: true}),

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
    }, {timestamps: false, freezeTableName: true}),

    BankOfLineMessages: n580440__CallCenter.define('BankOfLineMessages', {
        Id: {
            type: Sequelize.STRING,
            primaryKey: true,
        },
        LineMessage_OpenId: {
            type: Sequelize.STRING,
        },
        LineMessage_Message: {
            type: Sequelize.STRING,
        },
        Status: {
            type: Sequelize.INTEGER,
        },
        Remark: {
            type: Sequelize.STRING,
        }
    }, {timestamps: false, freezeTableName: true})

}