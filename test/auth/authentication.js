import axios from "axios";
async function generateBasicToken(username, password) {
	try {
		return Buffer.from(`${username}:${password}`).toString("base64");
	} catch (error) {
		// console.error(error);
		return error.response;
	}
}

async function authCheck(username, password, token) {
    var headers = {
		"authorization": "Basic " + token,
		"Content-Type": "application/json",
        "accept": "application/json"
	};
	var payload = {
        "userName": username,
  		"password": password
    };

    try {
		var value = await axios.post(process.env.BASE_URL+'Account/v1/Authorized', payload, { headers: headers });
		return value;
	} catch (error) {
		// console.log(error);
		return error.response;
	}
}

async function generateAuthToken(username, password, token) {
    var headers = {
		"authorization": "Basic " + token,
		"Content-Type": "application/json",
        "accept": "application/json"
	};
	var payload = {
        "userName": username,
  		"password": password
    };

    try {
		return await axios.post(process.env.BASE_URL+'Account/v1/GenerateToken', payload, { headers: headers });
	} catch (error) {
		// console.log(error);
		return error.response;
	}
}

async function getUser(username, password, token, bearer_token, user_id) {
	
    var headers = {
		"authorization": "Basic " + token,
		"Authorization": "Bearer " + bearer_token,
		"Content-Type": "application/json",
        "accept": "application/json",
		"Accept-Encoding": "gzip, deflate, br",
		"Connection": "keep-alive",
		"Cache-Control": "no-cache"
	};
	var payload = {
        "userName": username,
  		"password": password
    };

	var path_get_user = "Account/v1/User/" + user_id;
    try {
		return await axios.get(process.env.BASE_URL+path_get_user, { headers: headers });
	} catch (error) {
		// console.log(error);
		return error.response;
	}
}

module.exports = {
    generateBasicToken: generateBasicToken,
    authCheck: authCheck,
	generateAuthToken: generateAuthToken,
	getUser: getUser
}