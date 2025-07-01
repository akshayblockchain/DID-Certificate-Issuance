//Contract address Polygon_Amoy_testnet
const CONTRACT_ADDRESS = "0xa37d6e5ee869292A0e66F408531Bd65Be8Db9bA7";
// ABI
// const CONTRACT_ABI = [{
//       "inputs": [],
//       "stateMutability": "nonpayable",
//       "type": "constructor"
//     },
//     {
//       "inputs": [],
//       "name": "DIDCertificate_Root_Already_Submitted",
//       "type": "error"
//     },
//     {
//       "inputs": [],
//       "name": "DIDCertificate_only_Issuer_allowed",
//       "type": "error"
//     },
//     {
//       "anonymous": false,
//       "inputs": [
//         {
//           "indexed": true,
//           "internalType": "bytes32",
//           "name": "root",
//           "type": "bytes32"
//         },
//         {
//           "indexed": false,
//           "internalType": "string",
//           "name": "batchName",
//           "type": "string"
//         }
//       ],
//       "name": "MerkleRootSubmitted",
//       "type": "event"
//     },
//     {
//       "anonymous": false,
//       "inputs": [
//         {
//           "indexed": true,
//           "internalType": "address",
//           "name": "user",
//           "type": "address"
//         },
//         {
//           "indexed": false,
//           "internalType": "string",
//           "name": "did",
//           "type": "string"
//         },
//         {
//           "indexed": false,
//           "internalType": "string",
//           "name": "courseName",
//           "type": "string"
//         }
//       ],
//       "name": "issuedCertificate",
//       "type": "event"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "address",
//           "name": "user",
//           "type": "address"
//         }
//       ],
//       "name": "getCertificates",
//       "outputs": [
//         {
//           "components": [
//             {
//               "internalType": "string",
//               "name": "did",
//               "type": "string"
//             },
//             {
//               "internalType": "string",
//               "name": "course",
//               "type": "string"
//             },
//             {
//               "internalType": "uint256",
//               "name": "timestamp",
//               "type": "uint256"
//             }
//           ],
//           "internalType": "struct DIDCertificate.cert[]",
//           "name": "",
//           "type": "tuple[]"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "address",
//           "name": "user",
//           "type": "address"
//         },
//         {
//           "internalType": "string",
//           "name": "did",
//           "type": "string"
//         },
//         {
//           "internalType": "string",
//           "name": "courseName",
//           "type": "string"
//         }
//       ],
//       "name": "issueCertificate",
//       "outputs": [],
//       "stateMutability": "nonpayable",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "address",
//           "name": "",
//           "type": "address"
//         },
//         {
//           "internalType": "uint256",
//           "name": "",
//           "type": "uint256"
//         }
//       ],
//       "name": "issueCerts",
//       "outputs": [
//         {
//           "internalType": "string",
//           "name": "did",
//           "type": "string"
//         },
//         {
//           "internalType": "string",
//           "name": "course",
//           "type": "string"
//         },
//         {
//           "internalType": "uint256",
//           "name": "timestamp",
//           "type": "uint256"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [],
//       "name": "issuer",
//       "outputs": [
//         {
//           "internalType": "address",
//           "name": "",
//           "type": "address"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "bytes32",
//           "name": "",
//           "type": "bytes32"
//         }
//       ],
//       "name": "merkleRoots",
//       "outputs": [
//         {
//           "internalType": "string",
//           "name": "",
//           "type": "string"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "bytes32",
//           "name": "root",
//           "type": "bytes32"
//         },
//         {
//           "internalType": "string",
//           "name": "batchName",
//           "type": "string"
//         }
//       ],
//       "name": "submitMerkleRoot",
//       "outputs": [],
//       "stateMutability": "nonpayable",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "bytes32",
//           "name": "leaf",
//           "type": "bytes32"
//         },
//         {
//           "internalType": "bytes32[]",
//           "name": "proof",
//           "type": "bytes32[]"
//         },
//         {
//           "internalType": "bytes32",
//           "name": "root",
//           "type": "bytes32"
//         }
//       ],
//       "name": "verifyMerkleProof",
//       "outputs": [
//         {
//           "internalType": "bool",
//           "name": "",
//           "type": "bool"
//         }
//       ],
//       "stateMutability": "pure",
//       "type": "function"
//     }];

let provider,contractInstance,address;
let generated_did;
//Connceting to Metamask Wallet and Display frontend as Issuer or Receipent
let connectWallet = async ()=>{
    if(window.ethereum){
        address= await window.ethereum.request({ method: "eth_requestAccounts" });
        provider = new ethers.BrowserProvider(window.ethereum);
        let signer = await provider.getSigner();
        document.getElementById("walletAddress").innerText = `Wallet: ${address[0]}`;
        console.log(address[0]);
        let contract_abi_json = await fetch("../artifacts/contracts/DIDCertificate.sol/DIDCertificate.json");
        let contractABI_abi = await contract_abi_json.json();
        const CONTRACT_ABI = contractABI_abi["abi"];     //Contract ABI from json file.
        contractInstance =new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
        // console.log(contractInstance);
        let issuer = (await contractInstance.issuer()).toLowerCase();
        console.log(issuer);
        if(address[0]===issuer){                          // Issuer
          document.getElementById("issuerHidden").hidden=false;
          document.getElementById("receptionHidden").hidden=true;
        }else{                                           //Receipent
          generated_did = `did:ethr:${address[0]}`;      //Create the DID
          console.log(generated_did);
          generateQRCode(generated_did);
          document.getElementById("generated_did").hidden=false;
          document.getElementById("qrcode").hidden=false;
          document.getElementById("generated_did").innerText=`DID: ${generated_did}`;
          document.getElementById("receptionHidden").hidden=false;
          document.getElementById("issuerHidden").hidden=true;
        }
    }else {
    alert("Please Install MetaMask!");
  }
} 

// Issue the Certificate using DID and Course Name.
async function issueCertificate() {
  const did = document.getElementById("did").value;
  const course = document.getElementById("course").value;
  if (!did || !course) {
    alert("Please enter DID and Course Name.");
    return;
  }
  try{
    const recipientAddress = did.split(":")[2]; //extract address from did
    document.getElementById("status").innerText = "Issuing certificate...";
    const tx = await contractInstance.issueCertificate(recipientAddress, did, course);
    await tx.wait();
    document.getElementById("status").innerText = "Certificate issued!";
    alert("Certificate Issued!");
  } catch (err) {
    console.error(err);
    document.getElementById("status").innerText = "Error issuing certificate.";
  }
}

// Submit the Merkel Root from batch upload and created from merkel_generate.js 
async function submitRoot(root, batchName) {
  fetch("../data/proofs.json").then(res=>res.json()).then(data=>console.log(data.root));
  try {
    const tx = await contractInstance.submitMerkleRoot(root, batchName);
    await tx.wait();
    alert("Merkle root submitted!");
  } catch (err) {
    console.error(err);
    alert("Failed to submit root");
  }
}

// function to vie the isuued Certificate of the receipent
async function viewMyCertificates() {
  const certs = await contractInstance.getCertificates(address[0]);
  const certList = document.getElementById("certList");
  certList.innerHTML = "";

  if (certs.length === 0) {
    certList.innerHTML = "<li>No certificates found</li>";
  }
  certs.forEach((cert,i) => {
    const li = document.createElement("li");
    li.textContent = `${i+1}.DID: ${cert.did},
                      CourseName: ${cert.course},
                      Date: ${new Date(Number(cert.timestamp) * 1000).toLocaleString()}`;
    certList.appendChild(li);
  });

}

//to verify the certificate
async function verifyCertificate() {
  const did = document.getElementById("verifyDid").value;
  const course = document.getElementById("verifyCourse").value;
  const root = document.getElementById("verifyRoot").value;
  const proof = JSON.parse(document.getElementById("verifyProof").value);

  if (!did || !course || !root || !proof) {
    alert("Fill all fields!");
    return;
  }

  console.log(did+course);
  // console.log(course);
  const leaf = ethers.keccak256(ethers.toUtf8Bytes(did + course));
  // console.log(leaf.toString("hex"));
  // console.log(proof);

  try {
    const valid = await contractInstance.verifyMerkleProof(leaf, proof, root);
    console.log(valid)
    document.getElementById("verifyResult").innerText = valid ? " Valid Certificate!" : "Invalid Proof";
  } catch (err) {
    console.error(err);
    document.getElementById("verifyResult").innerText = "Error verifying proof";
  }
}


function generateQRCode(did) {
  //clear old QR
  document.getElementById("qrcode").innerHTML = "";

  // new QRCode
  new QRCode(document.getElementById("qrcode"), {
    text: did,
    width: 110,
    height: 110,
    colorDark : "#000000",
    colorLight : "#ffffff",
    correctLevel : QRCode.CorrectLevel.H
  });
}
