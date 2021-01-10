const express = require('express');
const router = express.Router();
const app = express();
const { StringStream } = require("scramjet");
const Axios = require('axios');
const Joi = require('@hapi/joi');

const extractCsv = async (req, res) => {
    const csvSchema = Joi.object({
        csv: Joi.object({
            url: Joi.string().required().pattern(new RegExp(/\.csv$/)),
            select_fields: Joi.array().items(Joi.string()).optional().default([])
        })
    });

    const validation = csvSchema.validate(req.body);
    // if inputted data is not valid throw an error
    if (validation.error) {
        res.status(400).send({ error: { message: validation.error.message } });
        return;
    }


    const streamCSV = new StringStream();
    let result = null;
    let testResult = [];
    try {
        const response = await Axios({
            url: validation.value.csv.url,
            method: 'GET',
            responseType: 'stream'
        })
        if (response.data) {
            let all;
            let testData = await new Promise((resolve, reject) => {
                resolve(response.data.pipe(streamCSV)
                    .CSVParse({ delimiter: "," })                     // parse the stream as CSV
                    .setOptions({ maxParallel: 10 })  // set maximum parallel operations
                    .map((y, i) => y)
                    // .consume((y) => testResult.push(y))
                    .consume((y) => {
                        testResult.push(y);
                    })
                    .then(() => console.log('csv read completed')))

            });

            let selectObj = {};
            let countObj = 0;
            let resultReq = [];
            if (validation.value.csv.select_fields.length > 0 || validation.value.csv.select_fields !== undefined) {
                for (let i in validation.value.csv.select_fields) {
                    if (selectObj.hasOwnProperty(validation.value.csv.select_fields[i]) === false && testResult[0].indexOf(validation.value.csv.select_fields[i]) !== -1) {
                        selectObj[validation.value.csv.select_fields[i].replace(/[ \t"\']+/g, '')] = testResult[0].indexOf(validation.value.csv.select_fields[i]);

                        countObj++;
                    }
                }
            }

            for (let i in testResult) {
                if (i > 0 && testResult[i][0].length > 0) {
                    if (countObj > 0) {
                        let eachObj = {};
                        for (let j in selectObj) {
                            if (selectObj[j] === testResult[i].indexOf(testResult[i][selectObj[j]])) {
                                eachObj[j] = testResult[i][selectObj[j]].replace(/[ \t"\']+/g, '');
                            }
                        }
                        resultReq.push(eachObj);
                    } else {
                        let eachObj = {};
                        for (let j in testResult[i]) eachObj[testResult[0][j].replace(/[ \t"\']+/g, '')] = testResult[i][j].replace(/[ \t"\']+/g, '');
                        resultReq.push(eachObj);
                    }
                }
            }


            res.status(200).send({ data: resultReq });
        }
    } catch (error) {
        console.log('error', error);
    }
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', express.static('public'));

app.use('/remote', router.post('/', extractCsv));
const PORT = process.env.PORT || 6004;

app.listen(PORT, () => console.log(`App listening at port ${PORT}`));