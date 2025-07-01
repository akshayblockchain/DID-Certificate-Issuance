const fs = require("fs");
const path = require("path");
const keccak256 = require("keccak256");
const { MerkleTree } = require("merkletreejs");
const csv = require("csv-parser");

const leaves = [];
const records = [];
const filePath = path.join(__dirname, "../data/sample_batch.csv");

fs.createReadStream(filePath)
  .pipe(csv())
  .on("data", (row) => {
    const did = row.did;
    const course = row.courseName;
    // console.log(did+course);
    const hash = keccak256(did + course);
    leaves.push(hash);
    // console.log(hash.toString("hex"));
    records.push({ did, course, hash: "0x" + hash.toString("hex") });
  })
  .on("end", () => {
    const merkleTree = new MerkleTree(leaves, keccak256, { sortPairs: true });
    // const root = merkleTree.getHexRoot();
    const root = merkleTree.getRoot().toString("hex"); //get Merkel Root
    console.log("MerkelRoot:",root);

    //Generate Proof
    records.forEach((record) => {
        const did = record.did;
        const course = record.course;
        const leaf = keccak256(did + course);
        const proof = merkleTree.getHexProof(leaf);
        record.proof = proof;
    });

    const outputPath = path.join(__dirname, "../data/proofs.json");
    fs.writeFileSync(outputPath, JSON.stringify({ root, records }, null, 2));
    console.log(`Proofs saved to: ${outputPath}`);
  });
