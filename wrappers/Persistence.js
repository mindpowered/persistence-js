/**
 * Copyright Mind Powered Corporation 2020
 * 
 * https://mindpowered.dev/
 */

const maglev = require('@mindpowered/maglev');
const persistence = require('../lib/persistence.js');

/**
 * Provides a way of storing data for mindpowered packages.
 * When mindpowered packages need to persist data, they will use Get and Mutate, which in turn will call the Mutators and Getters you have set up.
 * You can set up the Mutators and Getters however you like whether to access a database such as MySQL or MongoDB, or simply write and read from text files.
 * Note: when using a mapping (updateMapper, queryMapper, resultMapper), the data will be passed in as the first argument to the mapping function.
 */
class Persistence {
	constructor() {
		let bus = maglev.maglev.MagLev.getInstance('persistence');
		let lib = new persistence.persistence.Persistence(bus);
	}

	/**
	 * Set up a Mutator to change stored data
	 * @param {string} recordType type of record being changed (eg. databsae table name)
	 * @param {string} operationName action being performed on the record (eg. insert, update)
	 * @param {mixed} strategyMethod method to call to actually perform the mutation
	 * @param {mixed} updateMapper method to call on recordData before calling strategyMethod with the results
	 * @param {boolean} useRecordDataAsParams if set to true, the recordData will be passed as the arguments to strategyMethod, rather than as the first argument
	*/
	AddMutator(recordType, operationName, strategyMethod, updateMapper, useRecordDataAsParams) {
		let jsbus = maglev.maglev.MagLevJs.getInstance('persistence');
		let args = [recordType, operationName, strategyMethod, updateMapper, useRecordDataAsParams];
		jsbus.call('Persistence.AddMutator', args);
	}

	/**
	 * Set up a Getter to retrieve data
	 * @param {string} recordType type of record being retrieved (eg. databsae table name)
	 * @param {string} operationName query being performed for the record type (eg. findById, findByName, findActive, getInsertedId)
	 * @param {mixed} strategyMethod method to call to actually perform the data retrieval
	 * @param {mixed} queryMapper method to call on queryValues before calling strategyMethod with the results
	 * @param {mixed} resultMapper method to call on data returned from the strategyMethod before returning the results
	 * @param {boolean} useQueryValuesAsParams if set to true, the queryValues will be passed as the arguments to strategyMethod, rather than as the first argument
	*/
	AddGetter(recordType, operationName, strategyMethod, queryMapper, resultMapper, useQueryValuesAsParams) {
		let jsbus = maglev.maglev.MagLevJs.getInstance('persistence');
		let args = [recordType, operationName, strategyMethod, queryMapper, resultMapper, useQueryValuesAsParams];
		jsbus.call('Persistence.AddGetter', args);
	}

	/**
	 * Use a Mutator to change stored data
	 * @param {string} recordType type of record being changed (eg. databsae table name)
	 * @param {string} operationName action being performed on the record (eg. insert, update)
	 * @param {mixed} recordData data being updated or saved by passing through updateMapper and then strategyMethod
	*/
	Mutate(recordType, operationName, recordData) {
		let jsbus = maglev.maglev.MagLevJs.getInstance('persistence');
		let args = [recordType, operationName, recordData];
		jsbus.call('Persistence.Mutate', args);
	}

	/**
	 * Use a Getter to retrieve data
	 * @param {string} recordType type of record being retrieved (eg. databsae table name)
	 * @param {string} operationName query being performed for the record type (eg. findById, findByName, findActive, getInsertedId)
	 * @param {mixed} queryValues values that will be passed through queryMapper and then strategyMethod to perform the query
	 * @return {Promise} result from the getter after being passed through resultMapper Promise will resolve to type mixed.
	*/
	Get(recordType, operationName, queryValues) {
		let jsbus = maglev.maglev.MagLevJs.getInstance('persistence');
		let args = [recordType, operationName, queryValues];
		let ret = jsbus.call('Persistence.Get', args);
		return ret;
	}

}
module.exports = Persistence;

