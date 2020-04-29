const API_ROOT = "http://localhost:3000/api/v1"

const token = () => localStorage.getItem("token");

const headers = () => {
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: token()
  };
};

const login = data => {
    return fetch(`${API_ROOT}/login`, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify( {auth: data})
    }).then(res => { 
        return res.json()
    });
};

const getCurrentUser = () => {
    return fetch(`${API_ROOT}/current_user`, {
      headers: headers()
    }).then(res => {
      return res.json();
    });
};

const createUser = (data) => {
    return fetch(`${API_ROOT}/sign_up`, {
      method: "POST",
      headers: {      
        "Content-Type": "application/json",
        Accept: "application/json"
        },
      body: JSON.stringify({user: data})
    }).then(res => { return res.json()});
};

const getScales = () => {
    return fetch(`${API_ROOT}/scales`)
    .then(res => {
        return res.json()
    })
}

const getNotesInCollection = (id) => {
    return fetch(`${API_ROOT}/collections/${id}`)
    .then(res => {
        return res.json()
    })
}

const postNewChord = (obj) => {
    return fetch(`${API_ROOT}/collections`,{
        method: "POST",
        headers: {      
        "Content-Type": "application/json",
        Accept: "application/json"
        },
        body: JSON.stringify(obj)
    }).then(res => {
        return res.json()
    })
    
}

export const api = {
    auth: {
      login,
      getCurrentUser,
      createUser
    },
    collections: {
        getScales,
        getNotesInCollection,
        postNewChord
    }
}

