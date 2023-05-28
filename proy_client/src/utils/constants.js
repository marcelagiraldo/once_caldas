const SERVER_IP = 'localhost';
const API_VERSION = 'v1';

export const ENV = {
    BASE_PATH: `http://${SERVER_IP}/api/{API_VERSION}`,
    API_ROUTES: {
        REGISTER: 'auth/register',
        LOGIN: 'auth/login',
    },
};