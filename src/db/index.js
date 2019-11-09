import Sequelize from 'sequelize';
import Random from 'meteor-random';
import pg from 'pg';
import constants, { isTest, isDev } from '../config/constants';


pg.defaults.parseInt8 = true;

const sequelize = new Sequelize(constants.DB_NAME, constants.DB_USER, constants.DB_PASS, {
  host: constants.DB_HOSTNAME,
  dialect: 'postgres',
  operatorsAliases: false,

  pool: {
    max: 16,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  define: {
    freezeTableName: true,
    hooks: {
      beforeCreate: (model) => {
        model.id = Random.id();
      },
    },
  },
  logging: isDev(),
  // logging: true,
});


Sequelize.postgres.DECIMAL.parse = value => parseFloat(value);


sequelize.authenticate()
  .then(() => {
    if (!isTest()) { console.log('Connection has been established successfully.'); }
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });


export default sequelize;
