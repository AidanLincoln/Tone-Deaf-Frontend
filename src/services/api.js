const API_ROOT = "https://tone-deaf.herokuapp.com/api/v1"

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

const getUsersChords = (id) => {
    return fetch(`${API_ROOT}/profile/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: token()
        }
    }).then(res => {return res.json()})
    
}

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
        Accept: "application/json",
        Authorization: token()
        },
        body: JSON.stringify(obj)
    }).then(res => {
        return res.json()
    })
}
const destroyChord = (id) => {
    return fetch(`${API_ROOT}/collections/${id}`, {
        method: "DELETE",
        headers: {      
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: token()
        }
    }).then(res => {
        return res.json()
    })
}

const addChordToProgression = (id, progressionNum) => {
    return fetch(`${API_ROOT}/collections/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: token()
        },
        body: JSON.stringify({
            chord_progression: progressionNum
        })
        // .then(res => {
        //     return res.json()
        // })
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
        postNewChord,
        getUsersChords,
        destroyChord,
        addChordToProgression
    }
}

