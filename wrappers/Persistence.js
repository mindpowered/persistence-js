/**
 * Copyright Mind Powered Corporation 2020
 * 
 * https://mindpowered.dev/
 */

const maglev = require('@mindpowered/maglev');
const persistence = require('@mindpowered/persistence');

/**
 * Provides a way of storing data for mindpowered packages.
 * When mindpowered packages need to persist data, they will use Get and Mutate, which in turn will call the Mutators and Getters you have set up.
 * You can set up the Mutators and Getters however you like whether to access a database such as MySQL or MongoDB, or simply write and read from text files.
 */
class PersistenceWrapper {
	constructor() {
		let bus = maglev.maglev.MagLev.getInstance('default');
		let lib = new persistence.persistence.Persistence(bus);
	}

	/**
	 * Set up a Mutator to change stored data
	 * @param recordType type of record being changed (eg. databsae table name)
	 * @param operationName action being performed on the record (eg. insert, update)
	 * @param strategyMethod method to call to actually perform the mutation
	 * @param updateMapper method to call on recordData before calling strategyMethod with the results
	*/
	AddMutator(recordType, operationName, strategyMethod, updateMapper) {
		let bus = maglev.maglev.MagLev.getInstance('default');
		let args = [recordType, operationName, strategyMethod, updateMapper];
		bus.call('Persistence.AddMutator', args);
	}

	/**
	 * Set up a Getter to retrieve data
	 * @param recordType type of record being retrieved (eg. databsae table name)
	 * @param operationName query being performed for the record type (eg. findById, findByName, findActive, getInsertedId)
	 * @param strategyMethod method to call to actually perform the data retrieval
	 * @param queryMapper method to call on queryValues before calling strategyMethod with the results
	 * @param resultMapper method to call on data returned from the strategyMethod before returning the results
	*/
	AddGetter(recordType, operationName, strategyMethod, queryMapper, resultMapper) {
		let bus = maglev.maglev.MagLev.getInstance('default');
		let args = [recordType, operationName, strategyMethod, queryMapper, resultMapper];
		bus.call('Persistence.AddGetter', args);
	}

	/**
	 * Use a Mutator to change stored data
	 * @param recordType type of record being changed (eg. databsae table name)
	 * @param operationName action being performed on the record (eg. insert, update)
	 * @param recordData data being updated or saved by passing through updateMapper and then strategyMethod
	*/
	Mutate(recordType, operationName, recordData) {
		let bus = maglev.maglev.MagLev.getInstance('default');
		let args = [recordType, operationName, recordData];
		bus.call('Persistence.Mutate', args);
	}

	/**
	 * Use a Getter to retrieve data
	 * @param recordType type of record being retrieved (eg. databsae table name)
	 * @param operationName query being performed for the record type (eg. findById, findByName, findActive, getInsertedId)
	 * @param queryValues values that will be passed through queryMapper and then strategyMethod to perform the query
	 * @return {mixed} result from the getter after being passed through resultMapper
	*/
	Get(recordType, operationName, queryValues) {
		let bus = maglev.maglev.MagLev.getInstance('default');
		let args = [recordType, operationName, queryValues];
		let ret = bus.call('Persistence.Get', args);
		return ret;
	}

}

