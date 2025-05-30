# orbDB
[![OrbDB Test CI](https://github.com/TaqsBlaze/OrbDB/actions/workflows/node.js.yml/badge.svg)](https://github.com/TaqsBlaze/OrbDB/actions/workflows/node.js.yml)

![alt text](https://raw.githubusercontent.com/TaqsBlaze/BlazeDB/refs/heads/main/image/orb.webp)

## Installation
`npm i orbdb@latest`

----

## Usage

### JSON Adapter Example

```javascript
const OrbDB = require('orbdb');
const OrbDBSchema = require('orbdb/schema');
const adapter = require('orbdb/adapters/jsonAdapter');
const path = require('path');

// Initialize JSON Adapter
const dbPath = path.join(__dirname, 'db.json');
const jsonAdapter = new adapter(dbPath);
const orbDB = new OrbDB.Json(jsonAdapter);
const schemaInstance = new OrbDBSchema(orbDB);

// Define a model
const userModel = {
    name: 'users',
    fields: {
        id: { type: 'number', required: true },
        name: { type: 'string', required: true },
        age: { type: 'number' }
    }
};

async function initialize() {
    // Add the model and create the schema
    schemaInstance.addModel(userModel);
    await schemaInstance.createSchema();

    // Insert data
    const newUser = { name: 'John Doe', age: 30 };
    await orbDB.insert(userModel.name, newUser);

    // Retrieve data
    const users = await orbDB.get(userModel.name);
    console.log('Users:', users);

    // Update data
    const updatedUser = { age: 31 };
    await orbDB.update(userModel.name, 1, updatedUser);

    // Retrieve updated data
    const updatedUsers = await orbDB.get(userModel.name);
    console.log('Updated Users:', updatedUsers);

    // Delete data
    await orbDB.delete(userModel.name, 1);

    // Retrieve data after deletion
    const remainingUsers = await orbDB.get(userModel.name);
    console.log('Remaining Users:', remainingUsers);
}

initialize();
```


## json Adapter

### How to us

```javascript
const OrbDB = require('orbdb'); 
const OrbDBSchema = require('orbdb/schema');
const path = require('path');

// Define JSON Adapter
const adapter = require('orbdb/adapters/jsonAdapter');
const dbPath = path.join(__dirname, './db.json');

let orbDB;

orbDB = new OrbDB.Json(new adapter(dbPath));
const schemaInstance = new OrbDBSchema(orbDB);

// Define your model here
const userModel = {
  name: 'User',
  fields: {
  id: { type: 'number', required: true },
  name: { type: 'string', required: true },
  age: { type: 'number', required: false }
  }
};


let init = ( async () => {
    // initialize database
    schemaInstance.addModel(userModel);
    await schemaInstance.createSchema();
})

init();
 

// Example usage: Add a user
const newUser = { id: 1, name: 'John Doe', age: 30 };
orbDB.insert(userModel.name, newUser);

// Fetch all users from the database
const users = await orbDB.get(userModel.name);
console.log('Users:', users);

// Example usage: Update a user
const updatedUser = { name: 'Blaze' };
orbDB.update(userModel.name, 1, updatedUser);

// Fetch updated users from the database
const updatedUsers = await orbDB.get(userModel.name);
console.log('Updated Users:', updatedUsers);

// Example usage: Delete a user
orbDB.delete(userModel.name, 1);
```

# Hashing data
### how to use:
```javascript
const HashUtility = require("orbdb/utils/hash");

const sampleData = "Data to be hashed";
const hash = HashUtility.hash(sampleData);
const isMatch = HashUtility.verify(sampleData, hash);

if(isMatch){
   console.log("Hash match");

}
```

# Sanitizing Data

```
Added data sanitization. Special characters from input data will now be stripped, and only clean data is stored in the database,
making sure your system is secure and data integrity is intact.
```

### How to use:

Data sanitization is automatically applied when you insert or update data in the database. You don't need to call any specific function. The system automatically cleans the data before storing it.

Example:

```javascript
const OrbDB = require('orbdb');
const OrbDBSchema = require('orbdb/schema');
const adapter = require('orbdb/adapters/jsonAdapter');
const path = require('path');

// Initialize JSON Adapter
const dbPath = path.join(__dirname, 'db.json');
const jsonAdapter = new adapter(dbPath);
const orbDB = new OrbDB.Json(jsonAdapter);
const schemaInstance = new OrbDBSchema(orbDB);

// Define a model
const userModel = {
    name: 'users',
    fields: {
        id: { type: 'number', required: true },
        name: { type: 'string', required: true },
        age: { type: 'number' }
    }
};

async function initialize() {
    // Add the model and create the schema
    schemaInstance.addModel(userModel);
    await schemaInstance.createSchema();

    // Insert data with special characters
    const newUser = { name: 'John!@#$ Doe', age: 30 };
    await orbDB.insert(userModel.name, newUser);

    // Retrieve data
    const users = await orbDB.get(userModel.name);
    console.log('Users:', users); // The name will be stored as "John Doe" without special characters
}

initialize();
```

### Adaptors:
```
Now json adapter is fully functional and ready for use
```
# Why OrbDB?

Here are the advantages of using **OrbDB**, based on its features and design principles:

### 1. **JSON Adapter Support**  
   OrbDB uses lightweight JSON-based storage, offering flexibility for various project requirements.

### 2. **Dynamic Schema Management**  
   - OrbDB provides dynamic schema creation, making it easier to define and manage models directly within your application.  
   - Developers can work with multiple models simultaneously without additional setup.

### 3. **Custom Session Management**  
   - With its session class, OrbDB introduces commit and rollback functionality, making it easier to manage transactions and ensure data integrity.

### 4. **Simplified Development**  
   - By abstracting away database operations, OrbDB lets developers focus on writing application logic rather than low-level database queries.

### 5. **Auto Incrementing IDs**  
   - Automatically assigns and increments IDs for entries in tables, reducing the overhead of managing primary keys.

### 6. **Error Handling and Validation**  
   - Ensures schema compliance by validating data types and properties at runtime.  
   - Provides meaningful error messages, helping developers debug effectively.

### 7. **Cross Platform Compatibility**  
   - Designed to work seamlessly across operating systems, including Linux, Windows, and MacOS.

### 8. **Lightweight and Scalable**  
   - OrbDB is ideal for small to medium-sized applications and can scale effectively.

### 9. **Easy Integration**  
   - With a modular design, OrbDB can be integrated into existing applications with minimal effort.  
   - Future-proofed for additional adapters or features, making it a long-term investment.

### 10. **Developer Friendly APIs**  
   - Intuitive and concise APIs make it easier for developers to perform operations like inserts, updates, and schema management without a steep learning curve.

### 11. **Open Source and Community Driven**  
   - The project being open source fosters community contributions, ensuring continuous improvement and access to a wider knowledge base.

These advantages position OrbDB as a versatile ORM that caters to both beginner and experienced developers, promoting productivity and efficiency. It is particularly appealing for projects requiring lightweight and flexible data management solutions.

## Contributing

We welcome contributions to the project! Here’s how you can help:

### How to Contribute

1. **Fork the Repository**: Click on the fork button at the top-right corner of this page. This will create a copy of the repository under your GitHub account.

2. **Clone Your Fork**: Clone your forked repository to your local machine:
    ```bash
    git clone https://github.com/taqsblaze/OrbDB
    cd OrbDB
    ```

3. **Create a New Branch**: It’s important to create a new branch for your changes:
    ```bash
    git checkout -b feature-branch-name
    ```
    (Use a descriptive name for your branch to indicate the feature or fix you are working on.)

4. **Make Your Changes**: Open the project in your favorite code editor and make your changes.

5. **Write Tests**: If you are adding new features or making changes, please ensure that your code is tested. Place your tests in the `test` directory.

6. **Run Tests**: Make sure all tests pass. (Adjust this command based on your testing framework.)
    ```bash
    npm test
    ```

7. **Commit Your Changes**: Once you are satisfied with your changes, commit them with a descriptive message:
    ```bash
    git add .
    git commit -m "Add a brief description of your changes"
    ```

8. **Push Your Changes**: Push your changes to your forked repository:
    ```bash
    git push origin feature-branch-name
    ```

9. **Create a Pull Request**: Go to the original repository where you want to propose your changes. Click on the "Pull Requests" tab, and then click on "New Pull Request". Select your branch and submit your pull request.


For more detailed instructions, please see [CONTRIBUTING.md](CONTRIBUTING.md).
<hr>

### Code of Conduct

Please adhere to this project's [Code of Conduct](CODE_OF_CONDUCT.md) in all interactions.

### Issues

If you encounter any problems, feel free to open an issue in the issues tab. Please provide as much detail as possible.

### Discussion

For any major changes, please create an issue first to discuss it. This helps maintainers and collaborators understand your intentions.
---
new featers soon
Thank you for your interest in contributing!
