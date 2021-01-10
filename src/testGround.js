let result = [[
    'First Name',
    'Last Name',
    'Sex',
    'Age',
    'Height (in)',
    'Weight (lbs)'
],
['Alex', 'Dlex', "M", 41, 74, 170],
['Bert', 'Lert', "M", 42, 68, 166]];

// let select_fields = ['First Name', 'Last Name', 'Age'];
let select_fields = [];

let selectObj = {};
let countObj = 0;

let resultReq = [];
if (select_fields.length > 0 || select_fields !== undefined) {
    for (let i in select_fields) {
        // console.log('validation.value.csv.select_fields', validation.value.csv.select_fields[i]);
        if (selectObj.hasOwnProperty(select_fields[i]) === false && result[0].indexOf(select_fields[i]) !== -1) {

            selectObj[select_fields[i]] = result[0].indexOf(select_fields[i]);
            countObj++;
        }
    }
}
console.log('selectObj', selectObj);

for (let i in result) {
    if (i > 0) {
        if (countObj > 0) {
            let eachObj = {};
            console.log(result[i]);
            for (let j in selectObj) {

                console.log('selectObj[j] === result[i].indexOf(selectObj[j]', selectObj[j], result[i].indexOf(result[i][selectObj[j]]));
                if (selectObj[j] === result[i].indexOf(result[i][selectObj[j]])) {
                    console.log('eachObj[Object.keys(selectObj)[Object.keys(selectObj).indexOf(result[0][selectObj[j]])]] ', eachObj[Object.keys(selectObj)[Object.keys(selectObj).indexOf(result[0][selectObj[j]])]]);
                    eachObj[Object.keys(selectObj)[Object.keys(selectObj).indexOf(result[0][selectObj[j]])]] = result[i][selectObj[j]];
                }
            }
            resultReq.push(eachObj);
        } else {
            let eachObj = {};
            for (let j in result[i]) {

                eachObj[result[0][j]] = result[i][j]
                console.log('eachObj[result[i][j]]', eachObj[result[0][j]]);

            }
            resultReq.push(eachObj);
        }

    }
    console.log('resultReq', resultReq);
}