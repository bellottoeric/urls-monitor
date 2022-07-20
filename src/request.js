const axios = require('axios').default;

async function request(param) {
    return (new Promise(async (resolve, reject) => {
        try {
            const instance = axios.create(param.axiosConfiguration);
            await instance.request().then(function (response) {
                if (param.expectedResponseStatusCode !== response.status) {
                    reject("Expected " + param.expectedResponseStatusCode + " - Got " + response.status)
                } else
                    resolve()
            }).catch(function (response) {
                reject(response.message)
            })
        } catch (e) {
            reject(('Error in function ' + arguments.callee.name + " " + e).toString())
        }
    }))
}

exports.request = request
