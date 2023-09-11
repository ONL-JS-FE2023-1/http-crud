const DataBaseError = require('../errors/DataBaseError');

class Thing {
    static _tableName = 'things';
    static _client = null;
    static name = 'Thing';

    static _attributes = {
        body: 'string'
    }

    static async create(insertValues) {
        const insertAttr = Object.entries(this._attributes)
        .filter(([attr]) => attr in insertValues)
        .map(([attr]) => attr);
        
        const insertSchemaStr = insertAttr.map(attr => `"${attr}"`).join(',');
    
        const insertValueStr = insertAttr.map(attr => {
            const value = insertValues[attr];
            return typeof value === 'string' ? `'${value}'` : value;
        }).join(',');

        const str = `
            INSERT INTO ${this._tableName} (${insertSchemaStr}) VALUES
            (${insertValueStr})
            RETURNING *;
        `;

        const { rows } = await this._client.query(str);

        return rows;
    }

    static async findByPk(pk) {
        const { rows } = await this._client.query(`
            SELECT * FROM ${this._tableName}
            WHERE id = ${pk};
        `);

        return rows;
    }

    static async findAll() {
        const { rows } = await this._client.query(`
            SELECT * FROM ${this._tableName};
        `);

        return rows;
    }

    static async updateByPk({id, updateValues}) {
        const updateAttr = Object.entries(this._attributes)
        .filter(([attr]) => attr in updateValues)
        .map(([attr]) => attr);

        const updateValueStr = updateAttr.map(attr => {
            const value = updateValues[attr];
            return `${attr} = ${typeof value === 'string' ? `'${value}'` : value}`;
        }).join(',');

        const { rows } = await this._client.query(`
            UPDATE ${this._tableName}
            SET ${updateValueStr}
            WHERE id = ${id}
            RETURNING *;
        `);

        return rows;
    }

    static async deleteByPk(pk) {
        const { rows } = await this._client.query(`
            DELETE FROM ${this._tableName}
            WHERE id = ${pk}
            RETURNING *;
        `);

        return rows;
    }
}

module.exports = Thing;