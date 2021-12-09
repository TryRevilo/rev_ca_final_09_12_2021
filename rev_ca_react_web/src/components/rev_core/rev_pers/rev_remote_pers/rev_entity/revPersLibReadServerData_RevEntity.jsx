var revGetServerData_JSON = (revURL, callback) => {
    const revHeaders = new Headers();

    fetch(revURL, {
        method: 'GET',
        headers: revHeaders,
        mode: 'cors',
        cache: 'default',
        credentials: 'omit',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(res => {
            if (!res.ok) {
                throw new Error('Network response was not ok!');
            }
            return res.json();
        })
        .then(data => {
            callback(data);
        })
        .catch(err => console.log(err));
};

var revGetServerData_Async = async (revURL) => {
    let response
    try {
        response = await fetch(revURL);
    } catch (err) {
        console.log('fet err')
    }

    return response;

};

var revGetServerData_JSON_Async = async (revURL) => {
    let response = await revGetServerData_Async(revURL);
    let data = await response.json();
    return data;

};

var revGetServerData_Text_Async = async (revURL) => {
    let response;

    try {
        response = await revGetServerData_Async(revURL);
    } catch (error) {
        console.log(error);
        return 'err';
    }

    if (!response) return 'err';

    let data = await response.text();

    return data;

};

export { revGetServerData_JSON, revGetServerData_Async, revGetServerData_JSON_Async, revGetServerData_Text_Async };