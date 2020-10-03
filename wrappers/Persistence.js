/**
 * Copyright Mind Powered Corporation 2020
 * 
 * https://mindpowered.dev/
 */

const maglev = require('@mindpowered/maglev');
const persistence = require('@mindpowered/persistence');

/**
 * Persistence
 */
class PersistenceWrapper {
	constructor() {
		let bus = maglev.maglev.MagLev.getInstance('default');
		let lib = new persistence.persistence.Persistence(bus);
	}

	/**
	 * TBD
	*/
	AddMutator() {
		let bus = maglev.maglev.MagLev.getInstance('default');
		let args = [];
		bus.call('Persistence.AddMutator', args);
	}

	/**
	 * TBD
	*/
	AddGetter() {
		let bus = maglev.maglev.MagLev.getInstance('default');
		let args = [];
		bus.call('Persistence.AddGetter', args);
	}

	/**
	 * TBD
	*/
	Mutate() {
		let bus = maglev.maglev.MagLev.getInstance('default');
		let args = [];
		bus.call('Persistence.Mutate', args);
	}

	/**
	 * TBD
	*/
	Get() {
		let bus = maglev.maglev.MagLev.getInstance('default');
		let args = [];
		bus.call('Persistence.Get', args);
	}

}

