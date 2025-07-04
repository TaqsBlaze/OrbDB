import OrbDB from '../orb.js'; // Consider removing if using dependency injection

class OrbDBSchema {
    constructor(flameDBInstance) {
        this.OrbDB = flameDBInstance;
        this.models = [];
    }

    addModel(model) {
        this.models.push(model);
    }

    async createSchema() {
        this.models.forEach(async (model) => {
            const schema = {
                $schema: 'http://json-schema.org/draft-07/schema#',
                type: 'object',
                properties: {},
                required: []
            };

            Object.keys(model.fields).forEach((field) => {
                const fieldType = model.fields[field].type;
                const fieldSchema = {};

                if (fieldType === 'string') {
                    fieldSchema.type = 'string';
                } else if (fieldType === 'number') {
                    fieldSchema.type = 'number';
                } else if (fieldType === 'boolean') {
                    fieldSchema.type = 'boolean';
                }

                schema.properties[field] = fieldSchema;

                if (model.fields?.[field]?.required) {
                    if (!schema.required.includes(field)) {
                        schema.required.push(field);
                    }
                }
            });

            await this.OrbDB.createSchema({ tableName: model.name, ...schema });
        });
    }

    validate(data) {
        for (const model of this.models) {
            for (const fieldName in model.fields) {
                const field = model.fields[fieldName];
                if (field.required && !(fieldName in data)) {
                    throw new Error(`Missing required field: ${fieldName}`);
                }
                if (field.type && typeof data[fieldName] !== field.type) {
                    throw new Error(`Invalid type for field ${fieldName}: expected ${field.type}`);
                }
            }
        }
    }
}

export default OrbDBSchema;
