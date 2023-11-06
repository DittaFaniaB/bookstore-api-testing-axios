import axios from 'axios';
import { expect } from "chai";
const auth = require('../auth/authentication');
const bookEndpoint = require('../endpoint/book.endpoint');

describe("Bookstore Swagger", () => {
	let basicToken;
	let userId = process.env.UUID;
	let bearerToken = "";
	let username = process.env.USERNAMEBOOKSTORE;
	let pass = process.env.PASSWORD;
	let listOfBook;

	before(async () => {
		basicToken = await auth.generateBasicToken(username, pass);
		var res = await auth.generateAuthToken(username, pass, basicToken);
		expect(res.status).to.equal(200);
		bearerToken = res.data.token;
		console.log(bearerToken);

	});

	afterEach(async () => {
		// await storeBook(basicToken, userId, await getBookList()[1]);
	});

	describe('Auth', function() {
		it("[TC001] Get User with valid api token bearer", async () => {
			var res = await auth.getUser(username, pass, basicToken, bearerToken, userId);
            // console.log(res.status);
			expect(res.status).to.equal(200);
		});

		it("[TC002] Get User with invalid api token bearer", async () => {
			var res = await auth.getUser(username, pass, basicToken, "invalid token", userId);
			expect(res.status).to.equal(401);
		});
	})

	describe('List of Book', function() {
		it("[TC003] Get list of book", async () => {
			var res = await bookEndpoint.getBookList();
			expect(res.status).to.equal(200);
		});

		it("[TC004] Get list of isbn", async () => {
			await bookEndpoint.getIsbnList();
		});
	})

	describe('Store Book', function() {
		before(async () => {
			listOfBook = await bookEndpoint.getIsbnList();
		});

		it("[TC005] Store valid ISBN book", async () => {
			var res = await bookEndpoint.storeBook(basicToken, userId, listOfBook[2], true, bearerToken);
			expect(res.status).to.equal(201);
			expect(res.data.books[0].isbn).to.equal(listOfBook[2]);
		});

		it("[TC006] Store book with ISBN that already exist", async () => {

			await bookEndpoint.storeBook(basicToken, userId, listOfBook[0], true, bearerToken);

			var res = await bookEndpoint.storeBook(basicToken, userId, listOfBook[0], false, bearerToken);

			expect(res.status).to.equal(400);
			expect(res.data.code).to.equal("1210");
			expect(res.data.message).to.equal("ISBN already present in the User's Collection!");
		});

		it("[TC007] Store books with ISBNs that are not registered in the system", async () => {
			var res = await bookEndpoint.storeBook(basicToken, userId, "0".repeat(13), false, bearerToken);

			expect(res.status).to.equal(400);
			expect(res.data.code).to.equal("1205");
			expect(res.data.message).to.equal("ISBN supplied is not available in Books Collection!");
		});

		it("[TC008] Store a book with invalid UUID", async () => {
			var res = await bookEndpoint.storeBook(basicToken, "invalid uuid", listOfBook[1], true, bearerToken );
			expect(res.status).to.equal(401);
			expect(res.data.code).to.equal("1207");
			expect(res.data.message).to.equal("User Id not correct!");
		});

		it("[TC009] Store a book with invalid bearer token", async () => {
			var res = await bookEndpoint.storeBook(basicToken, userId, listOfBook[2], true, 'bearer token invalid');

			expect(res.status).to.equal(401);
			expect(res.data.code).to.equal("1200");
			expect(res.data.message).to.equal("User not authorized!");
		});
	});
	
	// delete
	
	describe('Delete Book', function() {
		before(async () => {
			listOfBook = await bookEndpoint.getIsbnList();
		});

		afterEach(async () => {
			await bookEndpoint.storeBook(basicToken, userId, listOfBook[1], true, bearerToken);
		});

		it("[TC010] Delete valid stored book", async () => {
			var res = await bookEndpoint.deleteBookCollection(basicToken, userId, bearerToken);
			expect(res.status).to.equal(204);
		});

		it("[TC011] Delete books for users who have an empty book list", async () => {
			await bookEndpoint.deleteBookCollection(basicToken, userId, bearerToken);
			var res = await bookEndpoint.deleteBookCollection(basicToken, userId, bearerToken);
			expect(res.status).to.equal(204);
		});

		it("[TC012] Delete stored book with invalid bearer token", async () => {
			var res = await bookEndpoint.deleteBookCollection(basicToken, userId, 'invalid bearer token');

			expect(res.status).to.equal(401);
			expect(res.data.code).to.equal("1200");
			expect(res.data.message).to.equal("User not authorized!");
		});

		it("[TC013] Delete stored book of invalid/unexisting user", async () => {
			var res = await bookEndpoint.deleteBookCollection(basicToken, "invalid-user", bearerToken);

			expect(res.status).to.equal(401);
			expect(res.data.code).to.equal("1207");
			expect(res.data.message).to.equal("User Id not correct!");
		});
	});


});