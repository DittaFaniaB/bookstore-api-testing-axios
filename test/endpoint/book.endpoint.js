import axios from 'axios';

async function deleteBookCollection(token, userId, bearerToken) {
	var headers = {
		"authorization": "Basic " + token,
		"Authorization": "Bearer " + bearerToken,
		"Content-Type": "application/json",
        "accept": "application/json",
		"Accept-Encoding": "gzip, deflate, br",
		"Connection": "keep-alive",
		"Cache-Control": "no-cache"
	};

	const query = {
		"UserId": userId
	};

	try {
		// return await supertest(process.env.BASE_URL)
		// 	.delete(process.env.BOOKSTORE)
		// 	.set(headers)
		// 	.query(query);

		return await axios.delete(process.env.BASE_URL+process.env.BOOKSTORE, { params: query , headers: headers });
	} catch (error) {
		// console.log(error);
		return error.response;
	}
}

async function getBookList() {
	try {
		// return await supertest(process.env.BASE_URL)
		// 	.get(process.env.BOOKSTORE);
		// 	// .expect((res) => {
		// 	// 	console.log(res.body)
		// 	//    });    

			return await axios.get(process.env.BASE_URL+process.env.BOOKSTORE);
	} catch (error) {
		// console.log(error);
		return error.response;
	}
}

async function getIsbnList(){
	let isbnList = [];
	try {
		const res = await getBookList();

		for (let i = 0; i < res.data.books.length; i++) {
			const isbn = res.data.books[i].isbn;
			isbnList.push(isbn);
		}

		return isbnList;
	} catch (error) {
		// console.log(error);
		return error.response;
	}
}

async function storeBook(basicToken, userId, isbn, safeMode = false, bearerToken) {
    var headers = {
		"authorization": "Basic " + basicToken,
		"Authorization": "Bearer " + bearerToken,
		"Content-Type": "application/json",
        "accept": "application/json",
		"Accept-Encoding": "gzip, deflate, br",
		"Connection": "keep-alive",
		"Cache-Control": "no-cache"
	};

    const payload = {
        "userId": userId,
        "collectionOfIsbns": [
            {
                "isbn": isbn
            }
        ]
    };

    try {
        if (safeMode == true) {
			await deleteBookCollection(basicToken, userId, bearerToken);
		}
        // return await supertest(process.env.BASE_URL)
        //     .post(process.env.BOOKSTORE)
        //     .set(headers)
        //     .send(payload);

		return await axios.post(process.env.BASE_URL+process.env.BOOKSTORE, payload, { headers: headers });

    } catch (error) {
        // console.error(error);
		return error.response;
    }
}

module.exports = {
    deleteBookCollection: deleteBookCollection,
    getBookList: getBookList,
	getIsbnList: getIsbnList,
	storeBook: storeBook
}