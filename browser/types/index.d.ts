interface Mp {
	events: EventMpPool;
	
	trigger (name: string, ...args: any[]): void;
	invoke (name: string, ...args: any[]): void;
}


interface EventMpPool {
	/**
	* This function calls registered Remote Prodecure Call (RPC) from browser to client-side and expects a callback.
	*
	* @param eventName Client name event you want to call.
	* @param args Data you want to send to client.
	* @returns Returns a promise
	*
	* @example
	* ```js
	* await mp.events.callProc('test_proc', 'test');
	* ```
	*
	*
	*/
	callProc (procName: string, ...args: any[]): Promise<any>;

	call (name: string, ...args: any[]): void;
	/**
	* Adds browser event that can be called from client side
	* @param name Event name
	* @param args Event arguments
	*/
	add (name: string, ...args: any[]): void;
	add (names: { [name: string]: (...args: any[]) => void }): void;

	addProc (procName: string, callback: (...args: any[]) => void): void;
}

interface Window {
	mp: Mp;
}

declare var mp: Mp;
