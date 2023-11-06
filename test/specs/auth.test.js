// import axios from "axios";
// const auth = require('../auth/authentication');

// describe('Bookstore Swagger', function() {
//     describe('Auth', function() {
//         let basicToken;
//         let userId;
//         let username = process.env.USERNAMEBOOKSTORE;
//         let pass = process.env.PASSWORD;
//         let bearer_token = "";

//         before(async function() {
//             // basicToken = await auth.generateBasicToken(process.env.USERNAMEBOOKSTORE, process.env.PASSWORD);
//             // console.log(basicToken + ' auth ');
//             // userId = process.env.UUID;
//         });

//         it.skip("Check Authorization", async () => {
//             // console.log(basicToken);
//             // const res = await auth.authCheck(username, pass, basicToken);
//             var headers = {
//                 "authorization": "Basic " + basicToken,
//                 "Content-Type": "application/json",
//                 "accept": "application/json"
//             };
//             var payload = {
//                 "userName": username,
//                   "password": pass
//             };
// 			var value = await axios.post(process.env.BASE_URL+'Account/v1/Authorized', payload, { headers: headers });
//             expect(value.status).to.equal(200);
//         });

//         it.skip("Get token Authorization", async () => {
//             const res = await auth.generateAuthToken(username, pass, basicToken);
//             expect(res.status).to.equal(200);
//             bearer_token = res.data.token;
//         });

//         it.skip("Get User", async () => {
//             const res = await auth.getUser(username, pass, basicToken, bearer_token, userId);
//             expect(res.status).to.equal(200);
//         });


//     })
// })

