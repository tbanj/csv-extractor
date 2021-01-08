const express = require('express');
const app = express();
const request = require('request');
const { downloadCSV } = require('./download');
const { extractCsv } = require('./remoteDownload');
app.use(express.json());

app.use(express.urlencoded({ extended: false }));




app.use('/', express.static('public'));
app.use('/test', async (req, res) => {
    try {
        // request.get('https://docs.google.com/spreadsheets/d/1Mpw_UrPE_aqMZwt8iMgNvWTkDoOhepaQF14IouJRR4M/edit#gid=770766486', function (error, response, body) {
        //     if (!error && res.statusCode == 200) {
        //         var csv = body;
        //         console.log('csv', csv);

        //         // Continue with your processing here.
        //     }
        // });
        downloadCSV('https://docs.google.com/spreadsheets/d/1Mpw_UrPE_aqMZwt8iMgNvWTkDoOhepaQF14IouJRR4M/edit#gid=770766486');
        return;
        request.get('https://docs.google.com/spreadsheets/d/1Mpw_UrPE_aqMZwt8iMgNvWTkDoOhepaQF14IouJRR4M/edit#gid=770766486', function (error, response, body) {
            if (!error && res.statusCode == 200) {
                var csv = body;
                console.log('csv', csv);

                // Continue with your processing here.
            }
        });
    } catch (error) {

    }
});

app.use('/remote', extractCsv)
const PORT = process.env.PORT || 6004;

app.listen(PORT, () => console.log(`App listening at port ${PORT}`));