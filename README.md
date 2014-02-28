# Devkit Documentation Service

REST Service in Node.js to be used by the devkit-documentation-connector project

## Requirements

* Node.js
* NPM
* MongoDB

## Installation

1. Start your MongoDB server
	> mongod
	
	__Note:__ The service will be expecting to work with mongo in _http://localhost:27017/restservice_. If you have a different PORT or require User and Pass, you must change the code in the service (_service.js_).

2. Go to the project folder
3. Install the packages using NPM
	> npm install

4. Start the Node.js service
	> node service.js

## Service Paths

Path | Method | Operation
--- | --- | ---
__/s1__ | | 
/metadatatypes | GET | Get MetaData Keys
/metadata | GET | Get MetaData
/query | GET | Query using JSON Queries any entity
/employee | POST | Create
/employee/{id} | GET | Retrieve
/employee/{id} | PUT | Update
/employee/{id} | DELETE | Delete
/pet | POST | Create
/pet/{id} | GET | Retrieve
/pet/{id} | PUT | Update
/pet/{id} | DELETE | Delete
