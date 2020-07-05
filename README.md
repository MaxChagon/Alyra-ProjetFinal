# Alyra-ProjetFinal

Projet Final pour la formation développeur blockchain à l'école Alyra (janvier 2020 - mai 2020)
portant sur l'utilisation d'Ethereum pour voter (l'Assemblée Nationale est prise en exemple).

Langages utilisés :
- Solidity
- Javascript


Fichiers :
- voteAssemblee.sol
- index.html
- application.js


Installation :
- Installer Node : https://nodejs.org/en/ 
- Dans votre répertoire de travail: npm install live-server --save-dev 
- Lancer le serveur : npx live-server
- index.html est alors accessible depuis http://127.0.0.1:8080

Le contrat AssembleeNationale a été déployé à l'adresse 0x7720e657b146ec5179b31e29e88448180b825d67 sur Kovan.

Utilisation :

Une proposition de vote est représentée par 9 valeurs, dans l'ordre : l'identifiant (uint); le nom (string); le type de vote (uint); le nombre de votes Pour (uint);
le nombre de vote Contre (uint); le nombre d'abstention (uint); le statut (1 ouvert au vote, 2 fermée au vote); le résultat (1 adoptée, 2 rejetée, 3 non votée, 0 en cours de vote); l'identifiant de l'assemblée au moment du vote (uint)

Fonctions :

Ajouter un député, Député à enlever => entrez une adresse

Créer une proposition => 1er champ : nom de la propostion , 2eme champ : type de vote (1 vote à majorité absolue, 2 vote à majorité des  trois cinquièmes, 3 vote à majorité simple)

Activer une proposition de vote, Désactiver une proposition de vote => entrer l'identifiant d'une proposition

Voter pour une proposition de vote activée => 1er champ : identifiant de la proposition, 2eme champ : vote (1 pour oui, 2 pour non, 3 pour s'abstenir)

Décompte des votes d'une proposition, Verdict pour une proposition => entrez l'identifiant d'une proposition

Afficher le vote  d'un député => 1er champ : identifiant de la proposition, 2eme champ : identifiant du député

Afficher les votes pour une proposition => entrez l'identifiant de la proposition

Afficher les députés d'une Assemblée => entrez l'identifiant d'une assemblée

Afficher les députés et les votes => entrez l'identifiant de la proposition
