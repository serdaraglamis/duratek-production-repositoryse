/*! Built with http://stenciljs.com */
const { h } = window.App;

var TypeKeys;
(function (TypeKeys) {
    // Won't match anything
    TypeKeys["NULL"] = "NULL";
    TypeKeys["ERROR"] = "ERROR";
    TypeKeys["APP_SET_NAME"] = "APP_SET_NAME";
    TypeKeys["APP_SET_LOGIN_STATUS"] = "APP_SET_LOGIN_STATUS";
    TypeKeys["SET_PAGE_DATA"] = "SET_PAGE_DATA";
})(TypeKeys || (TypeKeys = {}));

const apiUrl = 'http://anamorfozapi.serdaraglamis.com/api/';
window['apiBase'] = 'http://anamorfozapi.serdaraglamis.com/';
const appSetLogin = (status) => async (dispatch, _getState) => {
    return dispatch({
        type: TypeKeys.APP_SET_LOGIN_STATUS,
        loggedIn: status
    });
};
const getFromPath = async (path) => {
    const request = await fetch(`${apiUrl}${path}`);
    if (request.status === 200) {
        const responseData = await request.json();
        return responseData;
    }
    else {
        return null;
    }
};
const deleteFromPath = async (path) => {
    const request = await fetch(`${apiUrl}${path}`, {
        method: 'DELETE',
    });
    if (!request.ok) {
        throw new Error('error');
    }
    return request;
};
const updateFromPath = async (path, data) => {
    const request = await fetch(`${apiUrl}${path}`, {
        body: JSON.stringify(data),
        method: 'PUT',
        headers: {
            'content-type': 'application/json'
        },
    });
    return request;
};
const postDataFromPath = async (path, data) => {
    const request = await fetch(`${apiUrl}${path}`, {
        body: JSON.stringify(data),
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
    });
    return request;
};

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

export { postDataFromPath as a, getFromPath as b, updateFromPath as c, deleteFromPath as d, appSetLogin as e, TypeKeys as f, commonjsGlobal as g, unwrapExports as h, createCommonjsModule as i };
