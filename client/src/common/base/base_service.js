class BaseService {
  constructor() {
    this.baseUrl = `http://localhost:8000`;
  }
  // phuong thức get
  get(url) {
    return fetch(url);
  }

  // phương thức put
  put(url = '', data = {}) {
    // Default options are marked with *
    const response = fetch(url, {
      method: 'PUT', // *GET, POST, PUT, DELETE, etc.
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response; // parses JSON response into native JavaScript objects
  }

  // phương thức post
  post(url = '', data = {}) {
    // Default options are marked with *
    const response = fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response; // parses JSON response into native JavaScript objects
  }
}

module.exports = BaseService;