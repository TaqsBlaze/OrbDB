const fs = require('fs').promises;
const path = require('path');
const BaseAdapter = require('./baseAdapter');

class JSONAdapter extends BaseAdapter {
  constructor(dbpath) {
    super();
    this.dbPath = dbpath;
  }

  async get() {
    try {
      const dbData = await fs.readFile(this.dbPath, 'utf8');
      const jsonData = JSON.parse(dbData);
      return jsonData.data || [];
    } catch (err) {
      console.error('Error reading data:', err);
      throw err;
    }
  }

  async insert(newData) {
    try {
      const dbData = await fs.readFile(this.dbPath, 'utf8');
      const jsonData = JSON.parse(dbData);
      jsonData.data = jsonData.data || [];

      if(!jsonData.data.length <= 0){
          newData.id = jsonData.data[jsonData.data.length - 1].id + 1 //Auto increment id
      }else{
          newData.id = 1 //Set default id
      }
      jsonData.data.push(newData);
      await fs.writeFile(this.dbPath, JSON.stringify(jsonData, null, 2));
    } catch (err) {
      console.error('Error writing data:', err);
      throw err;
    }
  }

  async update(id, updatedData) {
    try {
      const dbData = await fs.readFile(this.dbPath, 'utf8');
      const jsonData = JSON.parse(dbData);
      jsonData.data = (jsonData.data || []).map(item =>
        item.id === id ? { ...item, ...updatedData } : item
      );
      await fs.writeFile(this.dbPath, JSON.stringify(jsonData, null, 2));
    } catch (err) {
      console.error('Error updating data:', err);
      throw err;
    }
  }

  async delete(id) {
    try {
      const dbData = await fs.readFile(this.dbPath, 'utf8');
      const jsonData = JSON.parse(dbData);
      jsonData.data = (jsonData.data || []).filter(item => item.id !== id);
      await fs.writeFile(this.dbPath, JSON.stringify(jsonData, null, 2));
    } catch (err) {
      console.error('Error deleting data:', err);
      throw err;
    }
  }

  async createSchema(schema) {
    try {
      const formattedSchema = {
        properties: schema.properties || {},
        [schema.name]: []
      };
      await fs.writeFile(this.dbPath, JSON.stringify({ schema: formattedSchema, data: [] }, null, 2));
      console.log('Schema created successfully.');
    } catch (err) {
      console.error('Error creating schema:', err);
      throw err;
    }
  }
}

module.exports = JSONAdapter;
