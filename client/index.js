const axios = require("axios");
const niceList = require("../utils/niceList.json");
const MerkleTree = require("../utils/MerkleTree");

const serverUrl = "http://localhost:1225";

async function main() {
  // Choose a name from the nice list
  const name = "Norman Block"; // Update with the desired name

  // Create the Merkle Tree and generate proof
  const merkleTree = new MerkleTree(niceList);
  const index = niceList.findIndex((n) => n === name);
  const proof = merkleTree.getProof(index);

  // Send request to the server
  try {
    const { data: gift } = await axios.post(`${serverUrl}/gift`, {
      name,
      proof,
    });

    console.log({ gift });
  } catch (error) {
    console.error("Error:", error.response.data);
  }
}

main();
