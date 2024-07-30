class TokenManager {
	static get() {
		const tkn = localStorage.getItem('__ustkn');

		if (tkn !== undefined && tkn !== 'undefined' && tkn !== null) {
			const data = JSON.parse(tkn);
			return data;
		}
		return 'Invalid_Token';
	}

	static set(val) {
		localStorage.setItem('__ustkn', JSON.stringify(val));
	}

	static remove() {
		localStorage.removeItem('__ustkn');
		console.log('Token removed');
	}

	static clear() {
		localStorage.clear();
	}
}

export default TokenManager;
