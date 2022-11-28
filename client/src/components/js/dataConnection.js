
// export const baseUri = "http://localhost:8080/";
export const baseUri = "http://casadiale.noip.me:62950/";
// export const baseUri = "http://192.168.0.2:8080/";

export var username;
export var token;

export function setToken(newToken) {
    token = newToken;
}

export function getToken() {
    return token;
}

export function setUsername(newUsername) {
    username = newUsername;
}

export function getUsername() {
    return username;
}

export function removeToken() {
    token = null;
}

export function poisFormat(singlePoi) {
    return {
        "type": "Feature",
        "properties": {
            "id": singlePoi.id,
            "name": singlePoi.name,
            "category": singlePoi.category,
            "rank": singlePoi.rank
        },
        "geometry": {
            "type": "Point",
            "coordinates": [singlePoi.coord.longitude, singlePoi.coord.latitude]
        }
    }
}

export function userFormat(singlePoi) {
    return {
        "type": "Feature",
        "properties": {
            "category": singlePoi.category,
            "minRank": singlePoi.minRank,
            "timestamp": new Date(singlePoi.timestamp).toLocaleString()
        },
        "geometry": {
            "type": "Point",
            "coordinates": [singlePoi.coord.longitude, singlePoi.coord.latitude]
        }
    }
}