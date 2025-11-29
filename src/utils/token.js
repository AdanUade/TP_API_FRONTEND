let accessToken = null;

export const saveToken = (token) => {
    accessToken = token;
};

export const getToken = () => {
    return accessToken;
};

export const removeToken = () => {
    accessToken = null;
};

export const isAuthenticated = () => {
    return accessToken !== null;
};
