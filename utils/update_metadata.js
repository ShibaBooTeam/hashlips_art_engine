const basePath = process.cwd();
const fs = require("fs");
const {
    solanaMetadata,
  } = require(`${basePath}/src/config.js`);

const getData = (index) => {
    let rawData = fs.readFileSync(`${basePath}/build/json/${index}.json`);
    let data = JSON.parse(rawData);
    return data;
}

const writeData = (index, data) => {
    fs.writeFileSync(
        `${basePath}/build/json/${index}.json`,
        JSON.stringify(data, null, 2)
      );
}

const main = () => {

    // 1.get no. of files
    let files = fs.readdirSync(`${basePath}/build/json`).filter((file) => file !== '_metadata.json');
    let noOfFiles = files.length

    console.log(`${noOfFiles} json files found`);

    // 2. read json file
    for (let i = 0; i < noOfFiles; i++) {
        console.log(`reading attributes ${i}/${noOfFiles}`);
        const data = getData(i);
        data.seller_fee_basis_points = solanaMetadata.seller_fee_basis_points;
        data.properties.creators = solanaMetadata.creators
        writeData(i, data);
    }
}

main();
