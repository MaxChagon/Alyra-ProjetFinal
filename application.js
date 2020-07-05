async function createMetaMaskDapp() {
 try {
   // Demande à MetaMask l'autorisation de se connecter
   const addresses = await ethereum.enable();
   const address = addresses[0]
   // Connection au noeud fourni par l'objet web3
   const provider = new ethers.providers.Web3Provider(ethereum);
   dapp = { address, provider };
   console.log(dapp)
 } catch(err) {
   // Gestion des erreurs
   console.error(err);
 }
}

async function balance(){
   if (typeof dapp === "undefined") { await createMetaMaskDapp(); }
 dapp.provider.getBalance(dapp.address).then((balance) => {
   let etherString = ethers.utils.formatEther(balance);
   console.log("Balance: " + etherString);
 });
}

async function numeroBloc(){
   if (typeof dapp === "undefined") { await createMetaMaskDapp(); }
 dapp.provider.getBlockNumber().then((blockNumber) => {
   let numero = ethers.utils.formatEther(blockNumber);
   console.log("Numero du dernier bloc : " + numero);
   document.getElementById("numBloc").innerHTML = blockNumber;
   return numero;
 });
}

async function gazPrice(){
   if (typeof dapp === "undefined") { await createMetaMaskDapp(); }
 dapp.provider.getGasPrice().then((gasPrice) => {
   let prix = ethers.utils.formatEther(gasPrice);
   console.log("prix du gaz : " + prix);
   document.getElementById("prix").innerHTML = prix;
   return prix;
 });
}

const abi = [
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      }
    ],
    "name": "activerProp",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "address",
        "name": "depute",
        "type": "address"
      }
    ],
    "name": "addDepute",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "string",
        "name": "nom",
        "type": "string"
      },
      {
        "internalType": "uint8",
        "name": "typeVote",
        "type": "uint8"
      }
    ],
    "name": "createProposition",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "nom",
            "type": "string"
          },
          {
            "internalType": "uint8",
            "name": "typeVote",
            "type": "uint8"
          },
          {
            "internalType": "uint256",
            "name": "nombrePour",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "nombreContre",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "abstentions",
            "type": "uint256"
          },
          {
            "internalType": "uint8",
            "name": "statut",
            "type": "uint8"
          },
          {
            "internalType": "uint8",
            "name": "resultat",
            "type": "uint8"
          },
          {
            "internalType": "uint256",
            "name": "idActualAssemblee",
            "type": "uint256"
          }
        ],
        "internalType": "struct AssembleeNationale.PropositionDeVote",
        "name": "",
        "type": "tuple"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      }
    ],
    "name": "decompte",
    "outputs": [
      {
        "internalType": "uint256[3]",
        "name": "retour",
        "type": "uint256[3]"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "deleteAVote",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      }
    ],
    "name": "desactiverProp",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "removeAllDeputes",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "address",
        "name": "depute",
        "type": "address"
      }
    ],
    "name": "removeDepute",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "saveInfoDep",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_nombreDeputes",
        "type": "uint256"
      }
    ],
    "name": "setNombreDeputes",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      }
    ],
    "name": "verdict",
    "outputs": [
      {
        "internalType": "bool",
        "name": "adoptee",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "internalType": "uint8",
        "name": "vote",
        "type": "uint8"
      }
    ],
    "name": "voter",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "depute",
        "type": "address"
      }
    ],
    "name": "afficherVote",
    "outputs": [
      {
        "internalType": "uint8",
        "name": "retour",
        "type": "uint8"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      }
    ],
    "name": "allVotes",
    "outputs": [
      {
        "internalType": "uint8[]",
        "name": "retour",
        "type": "uint8[]"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_idAssemblee",
        "type": "uint256"
      }
    ],
    "name": "deputesByIdAss",
    "outputs": [
      {
        "internalType": "address[]",
        "name": "",
        "type": "address[]"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "totalDeputes",
    "outputs": [
      {
        "internalType": "address[]",
        "name": "",
        "type": "address[]"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      }
    ],
    "name": "votesAndDeputes",
    "outputs": [
      {
        "internalType": "uint8[]",
        "name": "retour1",
        "type": "uint8[]"
      },
      {
        "internalType": "address[]",
        "name": "retour2",
        "type": "address[]"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
];

async function instantiateAssembleeNationale() {
  if (typeof dapp === "undefined") { await createMetaMaskDapp(); }
  let contractAddress = document.getElementById("contractAddress").value;
  if (contractAddress.substr(0, 2) == "0x") { contractAddress = contractAddress.substr(2) }
  let re = /[0-9A-Fa-f]{40}/g;
  if (!re.test(contractAddress)) { console.error("Format de l'adresse du contrat invalide: " + contractAddress); return; }

  contratAssembleeNationale = new ethers.Contract("0x" + contractAddress, abi, dapp.provider.getSigner());
}

async function addDepute() {
  let depute = document.getElementById("addDepute").value;
  let ajout = await contratAssembleeNationale.addDepute(depute);
  console.log("députe : " + depute);
  console.log("Le députe " + depute + " a été ajouté");
}

async function totalDeputes() {
  let deputes = await contratAssembleeNationale.totalDeputes();
  document.getElementById("totalDeputes").value = deputes;
  console.log("députés : " + deputes);
}

async function removeAllDeputes() {
  await contratAssembleeNationale.removeAllDeputes();
  console.log("députés éffacés");
}

async function removeDepute() {
  let depute = document.getElementById("removeDepute").value;
  await contratAssembleeNationale.removeDepute(depute);
  console.log("député : " + depute + " éffacé");
}

async function setNombreDeputes() {
  let nombreDeputes = document.getElementById("setNombreDeputes").value;
  await contratAssembleeNationale.setNombreDeputes(nombreDeputes);
  console.log("Nombre de députés : " + nombreDeputes);
}

async function createProposition() {
  let propName = document.getElementById("createPropositionName").value;
  let proptype = document.getElementById("createPropositionType").value;
  await contratAssembleeNationale.createProposition(propName, proptype);
  console.log("Proposition : " + propName + " créée");
}

async function activerProp() {
  let prop = document.getElementById("activateProp").value;
  await contratAssembleeNationale.activerProp(prop);
  console.log("Proposition numéro : " + prop + " activée");
}

async function desactiverProp() {
  let prop = document.getElementById("desactivateProp").value;
  await contratAssembleeNationale.desactiverProp(prop);
  console.log("Proposition numéro : " + prop + " désactivée");
}

async function voter() {
  let propId = document.getElementById("idProp").value;
  let vote = document.getElementById("vote").value;
  await contratAssembleeNationale.voter(propId, vote);
  console.log("A la proposition : " + propId + " vous avez voté " + vote);
}

async function deleteAVote() {
  await contratAssembleeNationale.deleteAVote();
  console.log("Possibilité de voter réinitialisée");
}

async function decompte() {
  let decompteId = document.getElementById("decompte").value;
  let resultats = await contratAssembleeNationale.decompte(decompteId);
  console.log("Décompte des votes [pour, contre, abstention] pour la proposition " + decompteId + " " + resultats);
}

async function verdict() {
  let verdictId = document.getElementById("verdict").value;
  let resultat = await contratAssembleeNationale.verdict(verdictId);
  console.log("Verdict pour la proposition " + verdictId + "" + resultat +" (true = adoptée, false = rejetée)");
}

async function saveInfoDep() {
  await contratAssembleeNationale.saveInfoDep();
  console.log("Députés sauvegardés");
}

async function afficherVote() {
  let propId = document.getElementById("idPropDep").value;
  let depId = document.getElementById("dpId").value;
  let resultat = await contratAssembleeNationale.afficherVote(propId, depId);
  console.log("Vote du députés " + depId + " : " + resultat);
}

async function allVotes() {
  let propId = document.getElementById("dpIdAll").value;
  let resultats = await contratAssembleeNationale.allVotes(propId);
  console.log("Vote pour la proposition " + propId + " : " + resultats);
}

async function deputesByIdAss() {
  let assId = document.getElementById("assId").value;
  let resultats = await contratAssembleeNationale.deputesByIdAss(assId);
  console.log("Députés de l'Assemblée " + assId + " : " + resultats);
}

async function votesAndDeputes() {
  let propId = document.getElementById("IdpropVotes").value;
  let resultats = await contratAssembleeNationale.votesAndDeputes(propId);
  console.log("Députés et votes pour la proposition  " + propId + " : " + resultats);
}


