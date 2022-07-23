const axios = require('axios').default

async function request(param) {
    return (new Promise(async (resolve, reject) => {
        try {
            const instance = axios.create(param.axiosConfiguration)
            await instance.request().then(function (response) {
                if (param.expectedResponseStatusCode !== response.status) {
                    reject("Got " + response.status + " - Expected " + param.expectedResponseStatusCode)
                } else
                    resolve()
            }).catch(function (response) {
                if (response?.response?.status && param.expectedResponseStatusCode === response.response.status)
                    resolve()
                else
                    reject(response.message)
            })
        } catch (e) {
            reject(('Error in function ' + arguments.callee.name + " " + e).toString())
        }
    }))
}

exports.request = request
