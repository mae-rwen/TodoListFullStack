import { Sequelize, DataTypes } from 'sequelize';

// Option 1: Passing a connection URI
const sequelize = new Sequelize(process.env.CONNECTION_STRING) // Example for postgres

try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

export const Todos = sequelize.define("Todos", {
    value: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM,
        values: ['pending', 'done', 'overdue'],
        defaultValue: 'pending',
        validate: {
            isIn: [['pending', 'done', 'overdue']]
        }
    },
    deadline: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    priority: {
        type: DataTypes.ENUM,
        values: ['high', 'average', 'low'],
        defaultValue: 'average',
        validate: {
            isIn: [['high', 'average', 'low']]
        }
    }
});

await sequelize.query(`UPDATE "Todos" SET status='overdue' WHERE now()>deadline AND status='pending';`);
await Todos.sync();

export default sequelize;
