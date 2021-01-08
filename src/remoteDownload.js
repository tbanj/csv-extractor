const express = require('express');
const { StringStream } = require("scramjet");
const request = require("request");
const axios = require('axios');

// const extractCsv = async (req, res) => {
//     try {


//         request.get("https://people.sc.fsu.edu/~jburkardt/data/csv/biostats.csv")   // fetch csv
//             .pipe(new StringStream())                       // pass to stream
// .CSVParse()                                   // parse into objects
// .consume(object => console.log("Row:", object))  // do whatever you like with the objects
// .then(() => console.log("all done"))
//     } catch (error) {
//         console.log('error', error);
//     }
// }

const get = async (url) => await axios.get(url);


// const extractCsv = async (req, res) => {
//     const streamCSV = new StringStream();
//     let result = null;
//     try {
//         const response = await axios({
//             url: 'https://people.sc.fsu.edu/~jburkardt/data/csv/biostats.csv',
//             method: 'GET',
//             responseType: 'stream'
//         })
//         console.log('downloaded');
//         if (response.data) {
//             let all;
//             let testData = await new Promise((resolve, reject) => {
//                 resolve(response.data.pipe(streamCSV)
//                     .CSVParse()                                   // parse into objects
//                     .consume((object) => {

//                         all = object;
//                         console.log(all);
//                         return all;
//                     })
//                     .then() => console.log('finished', )))

//             });
//             console.log('all', testData);
//         }
//     } catch (error) {
//         console.log('error', error);
//     }
// }


const extractCsv = async (req, res) => {
    const streamCSV = new StringStream();
    let result = null;
    let testResult = []
    try {
        const response = await axios({
            url: 'https://people.sc.fsu.edu/~jburkardt/data/csv/biostats.csv',
            method: 'GET',
            responseType: 'stream'
        })
        console.log('downloaded');
        if (response.data) {
            let all;
            let testData = await new Promise((resolve, reject) => {
                resolve(response.data.pipe(streamCSV)
                    .CSVParse()                     // parse the stream as CSV
                    .setOptions({ maxParallel: 4 })  // set maximum parallel operations
                    .map((x, i) => {                     // map every object
                        const y = x;

                        // const y = manipulate(x);
                        // console.log(x, i)
                        all = y;
                        return y;
                    })
                    .consume((y) => testResult.push(y))
                    .then(() => console.log('done')))

            });
            console.log('all', testResult);
            res.status(200).send({ data: testResult });
        }
    } catch (error) {
        console.log('error', error);
    }
}

module.exports = { extractCsv }