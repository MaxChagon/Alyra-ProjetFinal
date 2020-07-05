pragma solidity ^0.5.12;
pragma experimental ABIEncoderV2;

import "./safemath.sol";

 /**
 * @title AssembleeNationale
 * @dev permet aux députés de voter
 */
contract AssembleeNationale{
    
    address owner; //addresse de l'Assemblée
    uint nombreDeputes;
    address[] Deputes;
    mapping (address => bool) estDepute;
    mapping (address => bool) aVote;
    mapping (uint => Votes) totalVotes; //1 = pour, 2 = contre, 3 = abstention
    PropositionDeVote[] propositions;
    uint idAssemblee;
    address[][] sauvegardeDep;
    
    struct Votes{
        mapping (address=>uint8) voteParDepute;
    }
    
    struct PropositionDeVote{
        uint id;
        string nom;
        uint8 typeVote; //1 = majorité absolue, 2 = majorité des trois cinquièmes, 3 = majorité simple
        uint nombrePour;
        uint nombreContre;
        uint abstentions;
        uint8 statut; //1 = ouvert, on peut voter, 2 = fermé, on ne peut pas voter
        uint8 resultat; //1="Adoptee", 2="rejetee", 3="nonVotee" au début, 0="en cours"
        uint idActualAssemblee;
    }
    
    constructor() public{
        owner = msg.sender;
    }
    
   /**
   * @dev Seule l'addresse de l'Assemblée est permise
   */
    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }
    
    /**
   * @dev Seule l'addresse d'un député est permise
   */
    modifier onlyDepute() {
        require(estDepute[msg.sender]);
        _;
    }
    
    
   /**
   * @dev Pour changer le nombre de députés après une élection
   */
    function setNombreDeputes(uint _nombreDeputes) public onlyOwner{
        nombreDeputes = _nombreDeputes;
    }
    
   /**
   * @dev Pour ajouter l'adresse d'un député
   */
   function addDepute(address depute) public onlyOwner{
       Deputes.push(depute);
       estDepute[depute] = true;
   }
   
   /**
   * @dev Pour désactiver l'adresse d'un député (démission par exemple)
   */
   function removeDepute(address depute) public onlyOwner{
       estDepute[depute] = false;
   }
   
   
   /**
   * @dev Pour enlever tous les députés
   */
   function removeAllDeputes() public onlyOwner{
       for(uint i=Deputes.length; i!=0 ; i--){
           estDepute[Deputes[i-1]] = false;
           Deputes.pop();
       }
       //delete Deputes;
   }
   
   /**
   * @dev Pour connaître tous les députés
   */
   function totalDeputes() public view returns(address[] memory){
        return(Deputes);
    }
   
   
   /**
   * @dev Pour créer une proposition de vote
   */
   function createProposition(string memory nom, uint8 typeVote) public onlyOwner returns(PropositionDeVote memory){
       uint id = propositions.length;
       PropositionDeVote memory newProposition = PropositionDeVote(id,nom,typeVote,0,0,0,2,3,idAssemblee);
       propositions.push(newProposition);
       return(newProposition);
   }
   
   /**
   * @dev Pour activer le vote d'une proposition
   */
   function activerProp(uint id) public onlyOwner{
       require(propositions[id].resultat == 3); //Pour ne pas pouvoir réactiver une proposition déjà votée
       propositions[id].statut = 1;
   }
   
   /**
   * @dev Pour désactiver le vote d'une proposition
   */
   function desactiverProp(uint id) public onlyOwner{
       require(propositions[id].resultat != 3); //Pour désactiver seulement les propositions déjà votées
       propositions[id].statut = 2;
   }
   
   /**
   * @dev Pour voter
   */
   function voter(uint id, uint8 vote) public onlyDepute{
       require(propositions[id].statut == 1);
       require(aVote[msg.sender] == false);
        if(vote == 1){ // Pour
             propositions[id].nombrePour++;
        }
        else if(vote == 2){ //Contre
             propositions[id].nombreContre++;
        }
        else if(vote == 3){ // Abstention
             propositions[id].abstentions++;
        }
        totalVotes[id].voteParDepute[msg.sender] = vote;
        aVote[msg.sender] = true;
   }
   
   /**
   * @dev Pour réinitialiser aVote
   */
   function deleteAVote() public onlyOwner{
       for(uint i=0; i<Deputes.length; i++){
           aVote[Deputes[i]] = false;
       }
   }
   
   
   /**
   * @dev Pour faire le décompte des voix
   */
   function decompte(uint id) public onlyOwner returns(uint[3] memory retour){
       propositions[id].resultat = 0;
       retour = [propositions[id].nombrePour, propositions[id].nombreContre, propositions[id].abstentions];
       desactiverProp(id);
       deleteAVote();
       return(retour);
   }
   
   /**
   * @dev Pour statuer en fonction du type de vote
   */
   function verdict(uint id) public returns(bool adoptee){
       adoptee = false;
       if(propositions[id].typeVote == 1){
           if(propositions[id].nombrePour > propositions[id].nombreContre+propositions[id].abstentions){
               adoptee = true;
           }
       }
       else if(propositions[id].typeVote == 2){
           if(propositions[id].nombrePour >= 3*(propositions[id].nombreContre+propositions[id].abstentions)/2){
               adoptee = true;
           }
       }
       else if(propositions[id].typeVote == 3){
           if(propositions[id].nombrePour > propositions[id].nombreContre){
               adoptee = true;
           }
       }
       
       if(adoptee){
           propositions[id].resultat = 1;
       }
       else{
           propositions[id].resultat = 2;
       }
       
       propositions[id].idActualAssemblee = idAssemblee;
       return(adoptee);
   }
   
   /**
   * @dev Pour sauvegarder tous les députés du moment
   */
   function saveInfoDep() public onlyOwner{
       sauvegardeDep.push(Deputes);
       idAssemblee++;
   }
   
   /**
   * @dev Pour connaître le vote d'un député sur une proposition de vote
   */
   function afficherVote(uint id, address depute) public view returns(uint8 retour){
       retour = totalVotes[id].voteParDepute[depute];
       return(retour);
   }
   
   /**
   * @dev Pour connaître tous les votes d'une proposition de vote
   */
   function allVotes(uint id) public view returns(uint8[] memory retour){
       retour = new uint8[](sauvegardeDep[propositions[id].idActualAssemblee].length);
       for(uint i=0; i<sauvegardeDep[propositions[id].idActualAssemblee].length; i++){
            retour[i] = afficherVote(id,sauvegardeDep[propositions[id].idActualAssemblee][i]);
       }
       return(retour);
   }
   
   /**
   * @dev Pour connaître tous les députés d'un moment
   */
   function deputesByIdAss(uint _idAssemblee) public view returns(address[] memory){
        return(sauvegardeDep[_idAssemblee]);
    }
    
   /**
   * @dev Pour connaître tous les votes d'une proposition de vote + tous les députés de l'Assemblée à ce moment là
   */
   function votesAndDeputes(uint id)public view returns(uint8[] memory retour1,address[] memory retour2){
       retour1 = allVotes(id);
       retour2 = deputesByIdAss(propositions[id].idActualAssemblee);
       return(retour1,retour2);
   }
   
}