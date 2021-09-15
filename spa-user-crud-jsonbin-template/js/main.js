// ========== GLOBAL VARIABLES ==========

const _baseUrl = "https://api.jsonbin.io/v3/b/YOUR-BIN-ID";
const _headers = {
  "X-Master-Key": "YOUR-JSONBIN-X-MASTER-KEY",
  "Content-Type": "application/json"
};

// ========== READ ==========

/**
 * Fetchs person data from jsonbin
 */
async function loadUsers() {
  const url = _baseUrl + "/latest"; // make sure to get the latest version
  const response = await fetch(url, { headers: _headers });
  // todo ...
}



// ========== CREATE ==========

// todo

// ========== UPDATE ==========

// todo

// ========== DELETE ==========

// todo

// ========== Services ==========
/**
 * Updates the data source on jsonbin with a given users arrays
 * @param {Array} users 
 */
async function updateJSONBIN(users) {
  // put users array to jsonbin
  const response = await fetch(_baseUrl, {
    method: "PUT",
    headers: _headers,
    body: JSON.stringify(users)
  });

  // todo ...
}

// ========== Loader ==========

// todo