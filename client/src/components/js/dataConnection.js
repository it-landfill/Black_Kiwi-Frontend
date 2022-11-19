
// export const baseUri = "http://localhost:8080/";
export const baseUri = "http://casadiale.noip.me:62950/";

export var token;

export function setToken(newToken) {
    token = newToken;
}

export function getToken() {
    return token;
}