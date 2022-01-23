const basePath = process.cwd();
const fs = require("fs");

const getAttributes = (index) => {
    let rawData = fs.readFileSync(`${basePath}/build/json/${index}.json`);
    let data = JSON.parse(rawData);
    return data.attributes;
}

const isSameAttributes = (attr1, attr2) => {
      return attr1.every((trait) => attr2.some((t) => shallowEqual(t, trait)))
  };

const shallowEqual = (object1, object2) => {
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);
    if (keys1.length !== keys2.length) {
      return false;
    }
    for (let key of keys1) {
      if (object1[key] !== object2[key]) {
        return false;
      }
    }
    return true;
  };

const main = () => {
    // let attr1 = getAttributes(1);
    // let attr2 = getAttributes(2);

    // console.log(isSameAttributes(attr1, attr2))

    // 1.get no. of files
    let files = fs.readdirSync(`${basePath}/build/json`).filter((file) => file !== '_metadata.json');
    let noOfFiles = files.length

    console.log(`${noOfFiles} json files found`);

    // 2. read json file
    let attributes = [];
    for (let i = 0; i < noOfFiles; i++) {
        console.log(`reading attributes ${i}/${noOfFiles}`);
        attributes.push({id: i, attributes: getAttributes(i)});
    }

    // 3. loop for check
    let repeatPairs = []; // example: [[1,2], [3,4]]
    while (attributes.length > 0) {
        var attr1 = attributes.shift();
        console.log(`Checking repeat for ${attr1.id}/${noOfFiles}`);
        attributes.forEach((attr2) => {
            if (isSameAttributes(attr1.attributes, attr2.attributes)) {
                repeatPairs.push([attr1.id, attr2.id]);
            }
        })
    }

    // 4. print result
    console.log(`No. of repeat attributes pairs: ${repeatPairs.length}`);
    if (repeatPairs.length > 0) {
        console.log(`Repeat attributes pairs:`, repeatPairs);
    }
}

main();

// // read json data
// let rawdata = fs.readFileSync(`${basePath}/build/json/_metadata.json`);
// let data = JSON.parse(rawdata);

// data.forEach((item) => {
//   if (network == NETWORK.sol) {
//     item.name = `${namePrefix} #${item.edition}`;
//     item.description = description;
//     item.creators = solanaMetadata.creators;
//   } else {
//     item.name = `${namePrefix} #${item.edition}`;
//     item.description = description;
//     item.image = `${baseUri}/${item.edition}.png`;
//   }
//   fs.writeFileSync(
//     `${basePath}/build/json/${item.edition}.json`,
//     JSON.stringify(item, null, 2)
//   );
// });

// fs.writeFileSync(
//   `${basePath}/build/json/_metadata.json`,
//   JSON.stringify(data, null, 2)
// );

// if (network == NETWORK.sol) {
//   console.log(`Updated description for images to ===> ${description}`);
//   console.log(`Updated name prefix for images to ===> ${namePrefix}`);
//   console.log(
//     `Updated creators for images to ===> ${JSON.stringify(
//       solanaMetadata.creators
//     )}`
//   );
// } else {
//   console.log(`Updated baseUri for images to ===> ${baseUri}`);
//   console.log(`Updated description for images to ===> ${description}`);
//   console.log(`Updated name prefix for images to ===> ${namePrefix}`);
// }
