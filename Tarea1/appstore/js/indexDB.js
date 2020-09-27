// In the following line, you should include the prefixes of implementations you want to test.
window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
// DON'T use "var indexedDB = ..." if you're not in a function.
// Moreover, you may need references to some window.IDB* objects:
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction || {READ_WRITE: "readwrite"}; // This line should only be needed if it is needed to support the object's constants for older browsers
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
// (Mozilla has never prefixed these objects, so we don't need window.mozIDB*)
if (!window.indexedDB) {
	alert("¡IndexedDB no es compatible!");
}
var request = window.indexedDB.open('AmnzAppStore', 1);
// This event is only implemented in recent browsers   
request.onupgradeneeded = function(event) {
	const db = event.target.result;
	const objectStore = db.createObjectStore('Usuario', { keyPath: 'id', autoIncrement: true });
    
    // Create an index to search customers by name. We may have duplicates
    // so we can't use a unique index.
	objectStore.createIndex('Nickname', 'Nickname', { unique: false });

    // Create an index to search customers by email. We want to ensure that
    // no two customers have the same email, so use a unique index.
    objectStore.createIndex('email', 'email', { unique: true });
};
request.onerror = function(event) {
    console.log("Why didn't you allow my web app to use IndexedDB?!");
};
request.onsuccess = function(event) {
    const objectStore = event.target.result;
	const transaction = objectStore.transaction('Usuario', 'readwrite');
	const store = transaction.objectStore('Usuario');
	const data = [
		{Nickname: 'Rapaz123', email: 'rapaz@example.com'},
		{Nickname: 'Dino2', email: 'dino@example.com'}
	];
	data.forEach((el) => store.add(el));
	transaction.onerror = (event) => {
		console.error('¡Se ha producido un error!', event.target.error.message);
	};
	transaction.oncomplete = (event) => {
		console.log('¡Los datos se han añadido con éxito!');
		const store = objectStore.transaction('Usuario', 'readonly').objectStore('Usuario');
		//const query = store.get(1); // Einzel-Query
		const query = store.openCursor()
		query.onerror = (event) => {
			console.error('¡Solicitud fallida!', event.target.error.message);
		};
		/*
		// Procesamiento de la consulta individual
		query.onsuccess = event => {
			if (query.result) {
				console.log(Registro 1', query.result.Nickname, query.result.email);
			} else {
				console.warn('¡Ningún registro disponible!');
			}
		};
		*/
		query.onsuccess = (event) => {
			const cursor = event.target.result;
			if (cursor) {
				console.log(cursor.key, cursor.value.Nickname, cursor.value.email);
				cursor.continue();
			} else {
				console.log('¡No hay más registros disponibles!');
			}
		};
    };
    response = store.get(1);
    response.onerror = function(event) {
        console.log("¡Solicitud fallida!");
    }
    response.onsuccess = function(event) {
        if (response.result) {
            console.log(response.result.Nickname);
            console.log(response.result.email);
        } else {
            console.log("¡Ningún registro disponible!");
        }
    };

    store.openCursor().onsuccess = function(event) {
        const cursor = event.target.result;
        if (cursor) {
            console.log(cursor.key);
            console.log(cursor.value.Nickname);
            console.log(cursor.value.email);
            cursor.continue();
        } else {
            console.log("¡No hay más registros disponibles!");
        }
    };

    // const index = store.index("Alias");
    // index.get("Raptor123").onsuccess = function(event) {
    //     console.log(event.target.result.email);
    // };


    const drop = store.delete(1);
    drop.onsuccess = function(event) {
        console.log("¡Registro borrado con éxito!");
    };
};