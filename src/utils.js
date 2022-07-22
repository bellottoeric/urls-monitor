const wait = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

exports.wait = wait

const getDate = () => {
    let formattedDate = new Date()
    formattedDate = formattedDate.getFullYear() + "-" + ("0" + (formattedDate.getMonth() + 1)).slice(-2) + "-" + ("0" + formattedDate.getDate()).slice(-2) + " " + ("0" + formattedDate.getHours()).slice(-2) + ":" + ("0" + formattedDate.getMinutes()).slice(-2)
    return (formattedDate)
}

exports.getDate = getDate