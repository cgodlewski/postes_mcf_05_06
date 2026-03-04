import { useState, useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, Legend } from "recharts";

const RAW_DATA = [{"section":"06","numero":"260006","region":"BRETAGNE","etablissement":"UNIVERSITE DE RENNES (EPE)","profil":"Participation aux jurys de recrutement, réunions pédagogiques, événements et aux suivis divers. Enseignements : GRH (français et en anglais, de la Licence 2 au Master 2). Recherche : Gestion RH et soutenabilité des politiques RH au CREM.","categorie":"RH/GRH"},{"section":"06","numero":"260007","region":"BRETAGNE","etablissement":"UNIVERSITE DE RENNES (EPE)","profil":"Management - transitions numériques - IA. Poste ouvert aux différentes spécialités des sciences de gestion (Management stratégique, CGAO, CCA, finance, GRH, marketing). Enseignement et recherche sur l'impact des transitions numériques.","categorie":"Stratégie/Management"},{"section":"05","numero":"260053","region":"ILE-DE-FRANCE","etablissement":"UNIVERSITE PARIS 8","profil":"Histoire de la pensée économique","categorie":"Histoire/Pensée économique"},{"section":"05","numero":"260100","region":"NOUVELLE-AQUITAINE","etablissement":"UNIVERSITE DE BORDEAUX","profil":"Économie territoriale et urbaine","categorie":"Économie territoriale/Urbaine"},{"section":"05","numero":"260101","region":"NOUVELLE-AQUITAINE","etablissement":"UNIVERSITE DE BORDEAUX","profil":"Économie industrielle et de l'innovation","categorie":"Économie industrielle/Innovation"},{"section":"06","numero":"260102","region":"NOUVELLE-AQUITAINE","etablissement":"UNIVERSITE DE BORDEAUX","profil":"Ressources humaines","categorie":"RH/GRH"},{"section":"05","numero":"260115","region":"GRAND-EST","etablissement":"UNIVERSITE STRASBOURG","profil":"Microéconomie, Macroéconomie","categorie":"Macroéconomie/Monétaire"},{"section":"06","numero":"260119","region":"GRAND-EST","etablissement":"UNIVERSITE STRASBOURG","profil":"Sciences de gestion","categorie":"Autre/Généraliste"},{"section":"05","numero":"260152","region":"GRAND-EST","etablissement":"UNIVERSITE LORRAINE","profil":"Macroéconomie financière","categorie":"Macroéconomie/Monétaire"},{"section":"06","numero":"260154","region":"GRAND-EST","etablissement":"UNIVERSITE LORRAINE","profil":"Comptabilité, contrôle de gestion, logistique","categorie":"Comptabilité/Contrôle"},{"section":"06","numero":"260165","region":"NOUVELLE-AQUITAINE","etablissement":"UNIVERSITE DE BORDEAUX","profil":"Sciences de gestion Comptabilité - Finance","categorie":"Finance"},{"section":"06","numero":"260174","region":"PROVENCE-ALPES-COTE-D'AZUR","etablissement":"AVIGNON UNIVERSITE","profil":"Marketing stratégique et opérationnel","categorie":"Marketing"},{"section":"06","numero":"260202","region":"CENTRE-VAL-DE-LOIRE","etablissement":"UNIVERSITE TOURS","profil":"Gestion des Ressources Humaines, Inclusion, GRH, EDI","categorie":"RH/GRH"},{"section":"06","numero":"260246","region":"CENTRE-VAL-DE-LOIRE","etablissement":"UNIVERSITE TOURS","profil":"Stratégie, RSE, Business model, Management de la transition écologique","categorie":"Stratégie/Management"},{"section":"06","numero":"260249","region":"NORMANDIE","etablissement":"UNIVERSITE LE HAVRE NORMANDIE","profil":"Sciences de gestion, marketing et/ou management international","categorie":"Marketing"},{"section":"06","numero":"260257","region":"NOUVELLE-AQUITAINE","etablissement":"UNIVERSITE POITIERS","profil":"Commerce international, logistique internationale, communication interculturelle, marketing international","categorie":"Marketing"},{"section":"06","numero":"260261","region":"NOUVELLE-AQUITAINE","etablissement":"UNIVERSITE POITIERS","profil":"Comptabilité et finance niveau master : consolidation, diagnostic financier, évaluation d'entreprises","categorie":"Finance"},{"section":"06","numero":"260262","region":"NOUVELLE-AQUITAINE","etablissement":"UNIVERSITE POITIERS","profil":"Marketing : comportement du consommateur, culture de consommation et gestion des marques","categorie":"Marketing"},{"section":"06","numero":"260296","region":"GRAND-EST","etablissement":"UNIVERSITE LORRAINE","profil":"Sciences Humaines et Sociales en activité physique","categorie":"Sport/STAPS"},{"section":"06","numero":"260305","region":"ILE-DE-FRANCE","etablissement":"UNIVERSITE PARIS CITE","profil":"Comptabilité, contrôle de gestion","categorie":"Comptabilité/Contrôle"},{"section":"06","numero":"260327","region":"NOUVELLE-AQUITAINE","etablissement":"IUT DE BORDEAUX","profil":"Sciences de gestion","categorie":"Autre/Généraliste"},{"section":"06","numero":"260330","region":"NOUVELLE-AQUITAINE","etablissement":"IUT DE BORDEAUX","profil":"Sciences de gestion; Marketing","categorie":"Marketing"},{"section":"06","numero":"260346","region":"AUVERGNE-RHONE-ALPES","etablissement":"UNIV. CLERMONT AUVERGNE (EPE)","profil":"Finance et méthodes quantitatives, niveau licence et master. Recherche en finance de marché ou d'entreprise","categorie":"Finance"},{"section":"06","numero":"260358","region":"ILE-DE-FRANCE","etablissement":"IUT SCEAUX","profil":"Marketing","categorie":"Marketing"},{"section":"06","numero":"260360","region":"ILE-DE-FRANCE","etablissement":"IUT SCEAUX","profil":"Ressources humaines, Management","categorie":"RH/GRH"},{"section":"05","numero":"260374","region":"OCCITANIE","etablissement":"UNIVERSITE DE MONTPELLIER PAUL-VALERY","profil":"Sciences Économiques – Comportements en Santé, Environnement, Culture","categorie":"Économie de l'environnement/Énergie"},{"section":"05","numero":"260391","region":"PROVENCE-ALPES-COTE-D'AZUR","etablissement":"AIX-MARSEILLE UNIVERSITE","profil":"Économie, avec une spécialisation en macroéconomie financière","categorie":"Macroéconomie/Monétaire"},{"section":"06","numero":"260395","region":"PROVENCE-ALPES-COTE-D'AZUR","etablissement":"AIX-MARSEILLE UNIVERSITE","profil":"Management des organisations de l'économie sociale et solidaire (ESS)","categorie":"Stratégie/Management"},{"section":"06","numero":"260400","region":"AUVERGNE-RHONE-ALPES","etablissement":"UNIV. CLERMONT AUVERGNE (EPE)","profil":"Marketing stratégique/opérationnel, marketing digital. Intégration thématique STeRA du CLeRMa","categorie":"Marketing"},{"section":"06","numero":"260425","region":"ILE-DE-FRANCE","etablissement":"UNIVERSITE PARIS DAUPHINE","profil":"Comptabilité, contrôle de gestion ou audit. Perspective socio-organisationnelle, historique et/ou critique.","categorie":"Comptabilité/Contrôle"},{"section":"06","numero":"260430","region":"PAYS-DE-LA-LOIRE","etablissement":"NANTES UNIVERSITE","profil":"Systèmes d'Information & organisation","categorie":"Stratégie/Management"},{"section":"05","numero":"260433","region":"PAYS-DE-LA-LOIRE","etablissement":"NANTES UNIVERSITE","profil":"Économie Appliquée","categorie":"Autre/Généraliste"},{"section":"06","numero":"260435","region":"ILE-DE-FRANCE","etablissement":"UNIVERSITE PARIS DAUPHINE","profil":"Comptabilité, contrôle de gestion ou audit. Perspective socio-organisationnelle, historique et/ou critique.","categorie":"Comptabilité/Contrôle"},{"section":"06","numero":"260455","region":"PAYS-DE-LA-LOIRE","etablissement":"NANTES UNIVERSITE","profil":"Comptabilité et RSE","categorie":"Comptabilité/Contrôle"},{"section":"06","numero":"260460","region":"HAUTS-DE-FRANCE","etablissement":"UNIVERSITE POLYTECHNIQUE HDF","profil":"Sciences de gestion — Achats internationaux et gestion durable","categorie":"Logistique/Supply Chain"},{"section":"05","numero":"260470","region":"PAYS-DE-LA-LOIRE","etablissement":"LE MANS UNIVERSITE","profil":"Économie quantitative, Évaluation, Risque, Assurance, Santé, Protection sociale","categorie":"Économie de la santé/Sociale"},{"section":"06","numero":"260507","region":"ILE-DE-FRANCE","etablissement":"UNIVERSITE PARIS CITE","profil":"Sciences de Gestion","categorie":"Autre/Généraliste"},{"section":"05","numero":"260524","region":"ILE-DE-FRANCE","etablissement":"UNIVERSITE PARIS CITE","profil":"Économie institutionnaliste. Économie des systèmes productifs","categorie":"Histoire/Pensée économique"},{"section":"05","numero":"260531","region":"ILE-DE-FRANCE","etablissement":"UNIVERSITE PARIS CITE","profil":"Économie appliquée, économie de la santé, Microéconomie, politiques publiques","categorie":"Microéconomie/Marchés"},{"section":"06","numero":"260584","region":"PAYS-DE-LA-LOIRE","etablissement":"IUT ST NAZAIRE","profil":"Logistique, Supply-chain, management, systèmes d'information","categorie":"Logistique/Supply Chain"},{"section":"06","numero":"260586","region":"CENTRE-VAL-DE-LOIRE","etablissement":"UNIVERSITE ORLEANS","profil":"Sciences de gestion et du management","categorie":"Autre/Généraliste"},{"section":"06","numero":"260589","region":"CENTRE-VAL-DE-LOIRE","etablissement":"UNIVERSITE ORLEANS","profil":"Sciences de gestion et du management","categorie":"Autre/Généraliste"},{"section":"06","numero":"260590","region":"CENTRE-VAL-DE-LOIRE","etablissement":"UNIVERSITE ORLEANS","profil":"MCF en Sciences de Gestion pour BUT Techniques de Commercialisation","categorie":"Marketing"},{"section":"06","numero":"260591","region":"PROVENCE-ALPES-COTE-D'AZUR","etablissement":"AIX-MARSEILLE UNIVERSITE","profil":"Finance/contrôle/comptabilité et supply chain management","categorie":"Finance"},{"section":"05","numero":"260593","region":"ILE-DE-FRANCE","etablissement":"UNIVERSITE PARIS DAUPHINE","profil":"Candidatures ouvertes dans tous les domaines de l'économie. Enseignement niveau licence et master.","categorie":"Autre/Généraliste"},{"section":"06","numero":"260676","region":"NOUVELLE-AQUITAINE","etablissement":"UNIVERSITE LIMOGES","profil":"Entrepreneuriat au sein des territoires durables et logistique urbaine durable","categorie":"Entrepreneuriat/Innovation"},{"section":"06","numero":"260677","region":"AUVERGNE-RHONE-ALPES","etablissement":"INST POLYTECHNIQUE GRENOBLE","profil":"Finance et transitions","categorie":"Finance"},{"section":"06","numero":"260682","region":"AUVERGNE-RHONE-ALPES","etablissement":"INST POLYTECHNIQUE GRENOBLE","profil":"Marketing et transitions","categorie":"Marketing"},{"section":"06","numero":"260704","region":"AUVERGNE-RHONE-ALPES","etablissement":"UNIVERSITE LYON 3","profil":"Sociologie des organisations","categorie":"Stratégie/Management"},{"section":"06","numero":"260705","region":"AUVERGNE-RHONE-ALPES","etablissement":"UNIVERSITE LYON 3","profil":"Management général","categorie":"Stratégie/Management"},{"section":"06","numero":"260706","region":"AUVERGNE-RHONE-ALPES","etablissement":"UNIVERSITE LYON 3","profil":"Comptabilité","categorie":"Comptabilité/Contrôle"},{"section":"06","numero":"260785","region":"ILE-DE-FRANCE","etablissement":"CNAM PARIS","profil":"Comptabilité financière, PCG, IFRS, comptabilité sociale et consolidée, audit — filières expertise-comptable DCG/DSCG","categorie":"Comptabilité/Contrôle"},{"section":"06","numero":"260788","region":"ILE-DE-FRANCE","etablissement":"CNAM PARIS","profil":"Contrôle de gestion, comptabilité analytique, mesure de performance — DCG, DSCG, Licence et Master CCA","categorie":"Comptabilité/Contrôle"},{"section":"06","numero":"260790","region":"ILE-DE-FRANCE","etablissement":"CNAM PARIS","profil":"Stratégie, prospective, innovation et développement — équipe SPID du LIRSA","categorie":"Stratégie/Management"},{"section":"06","numero":"260793","region":"BOURGOGNE-FRANCHE-COMTE","etablissement":"UNIVERSITE BOURGOGNE EUROPE","profil":"Stratégie","categorie":"Stratégie/Management"},{"section":"06","numero":"260796","region":"ILE-DE-FRANCE","etablissement":"CNAM PARIS","profil":"Marketing dans les transformations environnementale, sociétale, digitale — axe SPID du LIRSA","categorie":"Marketing"},{"section":"06","numero":"260800","region":"BOURGOGNE-FRANCHE-COMTE","etablissement":"UNIVERSITE BOURGOGNE EUROPE","profil":"Marketing BtoB","categorie":"Marketing"},{"section":"05","numero":"260806","region":"BOURGOGNE-FRANCHE-COMTE","etablissement":"UNIVERSITE BOURGOGNE EUROPE","profil":"Économie de la santé","categorie":"Économie de la santé/Sociale"},{"section":"06","numero":"260835","region":"AUVERGNE-RHONE-ALPES","etablissement":"UNIVERSITE LYON 2","profil":"Sciences de gestion — Marketing et Entrepreneuriat","categorie":"Entrepreneuriat/Innovation"},{"section":"06","numero":"260842","region":"PROVENCE-ALPES-COTE-D'AZUR","etablissement":"UNIVERSITE COTE D'AZUR","profil":"Communication responsable","categorie":"RSE/DD"},{"section":"06","numero":"260903","region":"CENTRE-VAL-DE-LOIRE","etablissement":"IUT TOURS","profil":"Communication commerciale et digitale, Marketing digital, Marketing durable et responsable","categorie":"Marketing"},{"section":"06","numero":"260921","region":"PROVENCE-ALPES-COTE-D'AZUR","etablissement":"UNIVERSITE DE TOULON","profil":"Ressources humaines, RSE. Intégration au pôle MEDD et ESMED","categorie":"RH/GRH"},{"section":"05","numero":"260947","region":"OCCITANIE","etablissement":"UNIVERSITE DE TECHNOLOGIE DE TARBES","profil":"Analyse critique de la quantification de la performance et transitions socio-écologiques. Contrôle de gestion et pilotage.","categorie":"Économie territoriale/Urbaine"},{"section":"06","numero":"260956","region":"NORMANDIE","etablissement":"UNIVERSITE LE HAVRE NORMANDIE","profil":"Innovation, entrepreneuriat et gestion de projet — NIMEC","categorie":"Entrepreneuriat/Innovation"},{"section":"05","numero":"260971","region":"OCCITANIE","etablissement":"IUT TOULOUSE 3","profil":"Économie de marché, économie financière et internationale, économie sociale et solidaire, gouvernance des territoires","categorie":"Économie territoriale/Urbaine"},{"section":"05","numero":"260973","region":"ILE-DE-FRANCE","etablissement":"UNIVERSITE PARIS 3","profil":"Économie politique, Europe, Relations internationales","categorie":"Économie internationale"},{"section":"06","numero":"260985","region":"OCCITANIE","etablissement":"IUT TOULOUSE 3","profil":"Stratégie, marketing, étude qualitative, étude quantitative","categorie":"Marketing"},{"section":"05","numero":"261018","region":"ILE-DE-FRANCE","etablissement":"UNIVERSITE PARIS NANTERRE","profil":"Histoire de la pensée économique, économie institutionnaliste et économie écologique","categorie":"Histoire/Pensée économique"},{"section":"05","numero":"261019","region":"ILE-DE-FRANCE","etablissement":"UNIVERSITE PARIS NANTERRE","profil":"Macroéconomie monétaire, finance, économétrie financière","categorie":"Macroéconomie/Monétaire"},{"section":"06","numero":"261020","region":"ILE-DE-FRANCE","etablissement":"UNIVERSITE PARIS NANTERRE","profil":"Finance, Finance d'entreprise, Gestion financière et comptable","categorie":"Finance"},{"section":"06","numero":"261022","region":"ILE-DE-FRANCE","etablissement":"UNIVERSITE PARIS NANTERRE","profil":"Système d'informations, Intelligence Artificielle, usage des outils digitaux, gestion de projets","categorie":"Numérique/SI/IA"},{"section":"06","numero":"261039","region":"AUVERGNE-RHONE-ALPES","etablissement":"UNIVERSITE CHAMBERY","profil":"Comportements organisationnels, management des organisations, responsabilité sociétale — IREGE axe IDO","categorie":"Stratégie/Management"},{"section":"06","numero":"261040","region":"AUVERGNE-RHONE-ALPES","etablissement":"UNIVERSITE CHAMBERY","profil":"Marketing digital, e-commerce BUT GACO. Marketing/stratégie digitale/Technologies numériques — IREGE","categorie":"Numérique/SI/IA"},{"section":"05","numero":"261058","region":"ILE-DE-FRANCE","etablissement":"UNIVERSITE PARIS DAUPHINE","profil":"Candidatures ouvertes dans tous les domaines de l'économie","categorie":"Autre/Généraliste"},{"section":"05","numero":"261073","region":"HAUTS-DE-FRANCE","etablissement":"UNIVERSITE DE LILLE","profil":"Socio-économie du capitalisme et de l'environnement","categorie":"Économie de l'environnement/Énergie"},{"section":"05","numero":"261171","region":"HAUTS-DE-FRANCE","etablissement":"UNIVERSITE DE LILLE","profil":"Épistémologie, Histoire de la pensée économique","categorie":"Histoire/Pensée économique"},{"section":"05","numero":"261195","region":"HAUTS-DE-FRANCE","etablissement":"UNIVERSITE DE LILLE","profil":"Économie politique institutionnaliste","categorie":"Histoire/Pensée économique"},{"section":"05","numero":"261200","region":"HAUTS-DE-FRANCE","etablissement":"UNIVERSITE DE LILLE","profil":"Économie Internationale ; Macroéconomie Internationale","categorie":"Macroéconomie/Monétaire"},{"section":"05","numero":"261204","region":"HAUTS-DE-FRANCE","etablissement":"UNIVERSITE DE LILLE","profil":"Politiques publiques","categorie":"Économie publique/Fiscalité"},{"section":"05","numero":"261209","region":"HAUTS-DE-FRANCE","etablissement":"UNIVERSITE DE LILLE","profil":"Économie internationale, Économie Bancaire et Financière","categorie":"Finance/Économie financière"},{"section":"06","numero":"261249","region":"GRAND-EST","etablissement":"IUT COLMAR","profil":"Stratégie/Entrepreneuriat","categorie":"Entrepreneuriat/Innovation"},{"section":"06","numero":"261269","region":"GRAND-EST","etablissement":"UNIVERSITE MULHOUSE","profil":"Enseignements et recherche en marketing","categorie":"Marketing"},{"section":"06","numero":"261296","region":"GRAND-EST","etablissement":"UNIVERSITE MULHOUSE","profil":"Management des organisations","categorie":"Stratégie/Management"},{"section":"05","numero":"261370","region":"BOURGOGNE-FRANCHE-COMTE","etablissement":"UNIVERSITE MARIE ET LOUIS PASTEUR","profil":"Sciences économiques / Économétrie","categorie":"Méthodes/Économétrie"},{"section":"05","numero":"261371","region":"BOURGOGNE-FRANCHE-COMTE","etablissement":"UNIVERSITE MARIE ET LOUIS PASTEUR","profil":"Choix social, choix public, économie politique (théorique et/ou appliquée)","categorie":"Histoire/Pensée économique"},{"section":"05","numero":"261372","region":"BOURGOGNE-FRANCHE-COMTE","etablissement":"UNIVERSITE MARIE ET LOUIS PASTEUR","profil":"Microéconomie bancaire et financière","categorie":"Microéconomie/Marchés"},{"section":"06","numero":"261388","region":"NORMANDIE","etablissement":"UNIVERSITE DE ROUEN NORMANDIE","profil":"Sciences de gestion / DDRS et transitions socioécologiques / care organisationnel","categorie":"Stratégie/Management"},{"section":"05","numero":"261397","region":"NORMANDIE","etablissement":"UNIVERSITE DE ROUEN NORMANDIE","profil":"Techniques Quantitatives","categorie":"Méthodes/Économétrie"},{"section":"05","numero":"261403","region":"NORMANDIE","etablissement":"UNIVERSITE DE ROUEN NORMANDIE","profil":"Économie sociale – Économie politique","categorie":"Histoire/Pensée économique"},{"section":"05","numero":"261431","region":"HAUTS-DE-FRANCE","etablissement":"IUT AMIENS","profil":"Macro-micro économie, transitions, entrepreneuriat","categorie":"Autre/Généraliste"},{"section":"05","numero":"261434","region":"BRETAGNE","etablissement":"UNIVERSITE BREST (EPE)","profil":"Économie industrielle, économie des organisations, économie d'entreprise","categorie":"Économie industrielle/Innovation"},{"section":"06","numero":"261482","region":"ILE-DE-FRANCE","etablissement":"UNIVERSITE PARIS-EST CRETEIL","profil":"Comptabilité – Contrôle – Audit","categorie":"Comptabilité/Contrôle"},{"section":"06","numero":"261488","region":"ILE-DE-FRANCE","etablissement":"UNIVERSITE PARIS-EST CRETEIL","profil":"Gestion des ressources humaines","categorie":"RH/GRH"},{"section":"06","numero":"261489","region":"ILE-DE-FRANCE","etablissement":"UNIVERSITE PARIS-EST CRETEIL","profil":"Management et santé","categorie":"Stratégie/Management"},{"section":"05","numero":"261546","region":"ILE-DE-FRANCE","etablissement":"UNIVERSITE PARIS 1","profil":"Économie","categorie":"Autre/Généraliste"},{"section":"06","numero":"261553","region":"ILE-DE-FRANCE","etablissement":"UNIVERSITE PARIS 1","profil":"Stratégie et Économie d'Entreprise","categorie":"Stratégie/Management"},{"section":"06","numero":"261580","region":"ILE-DE-FRANCE","etablissement":"CY CERGY PARIS UNIVERSITE","profil":"Management, Organisation, Stratégie, Contrôle, Comptabilité — Licence et Master","categorie":"Stratégie/Management"},{"section":"06","numero":"261594","region":"ILE-DE-FRANCE","etablissement":"CY CERGY PARIS UNIVERSITE","profil":"Sciences de gestion – Marketing","categorie":"Marketing"},{"section":"06","numero":"261597","region":"ILE-DE-FRANCE","etablissement":"CY CERGY PARIS UNIVERSITE","profil":"Logistique globale et durable, performance des entreprises, développement des territoires","categorie":"Numérique/SI/IA"},{"section":"05","numero":"261611","region":"ILE-DE-FRANCE","etablissement":"UNIVERSITE PARIS 13","profil":"Macroéconomie, modélisation stock-flux cohérente et/ou à base d'agents","categorie":"Macroéconomie/Monétaire"},{"section":"05","numero":"261612","region":"ILE-DE-FRANCE","etablissement":"UNIVERSITE PARIS 13","profil":"Économétrie ; Macroéconomie","categorie":"Macroéconomie/Monétaire"},{"section":"06","numero":"261614","region":"ILE-DE-FRANCE","etablissement":"UNIVERSITE PARIS 13","profil":"Management des organisations de services, gestion d'entreprises","categorie":"Stratégie/Management"},{"section":"06","numero":"261651","region":"OCCITANIE","etablissement":"UNIVERSITE DE MONTPELLIER","profil":"Management responsable & humain des organisations","categorie":"Stratégie/Management"},{"section":"05","numero":"261681","region":"AUVERGNE-RHONE-ALPES","etablissement":"UNIV GRENOBLE ALPES (EPE)","profil":"Économie des organisations, travail, institutions","categorie":"Économie du travail/Emploi"},{"section":"06","numero":"261697","region":"AUVERGNE-RHONE-ALPES","etablissement":"UNIV GRENOBLE ALPES (EPE)","profil":"Management de l'innovation et des Systèmes d'Information","categorie":"Stratégie/Management"},{"section":"06","numero":"261702","region":"AUVERGNE-RHONE-ALPES","etablissement":"UNIV GRENOBLE ALPES (EPE)","profil":"Management des organisations","categorie":"Stratégie/Management"},{"section":"05","numero":"261707","region":"ILE-DE-FRANCE","etablissement":"UNIVERSITE VERSAILLES ST QUENT","profil":"Économie de l'énergie / Économie de l'environnement : soutenabilité et résilience","categorie":"Économie de l'environnement/Énergie"},{"section":"06","numero":"261722","region":"ILE-DE-FRANCE","etablissement":"UNIVERSITE VERSAILLES ST QUENT","profil":"Management stratégique","categorie":"Stratégie/Management"},{"section":"06","numero":"261724","region":"ILE-DE-FRANCE","etablissement":"UNIVERSITE VERSAILLES ST QUENT","profil":"Management stratégique","categorie":"Stratégie/Management"},{"section":"06","numero":"261726","region":"OCCITANIE","etablissement":"UNIVERSITE DE MONTPELLIER","profil":"Sciences de gestion pour BUT informatique : contrôle, pilotage, organisation, système d'information","categorie":"Stratégie/Management"},{"section":"06","numero":"261738","region":"ILE-DE-FRANCE","etablissement":"UNIVERSITE VERSAILLES ST QUENT","profil":"Management stratégique","categorie":"Stratégie/Management"},{"section":"06","numero":"261747","region":"OCCITANIE","etablissement":"UNIVERSITE DE MONTPELLIER","profil":"Systèmes d'information, transformation digitale, management des innovations technologiques","categorie":"Stratégie/Management"},{"section":"06","numero":"261822","region":"BRETAGNE","etablissement":"UNIVERSITE BRETAGNE SUD","profil":"Contrôle de gestion, gestion financière et comptabilité — LEGO","categorie":"Comptabilité/Contrôle"},{"section":"05","numero":"261823","region":"BRETAGNE","etablissement":"UNIVERSITE BRETAGNE SUD","profil":"Économie territoriale et économie des réseaux — département Techniques de Commercialisation","categorie":"Autre/Généraliste"},{"section":"06","numero":"261874","region":"ILE-DE-FRANCE","etablissement":"UNIVERSITE PARIS-EST CRETEIL","profil":"Marketing et Management","categorie":"Marketing"},{"section":"06","numero":"261875","region":"NOUVELLE-AQUITAINE","etablissement":"UNIVERSITE PAU","profil":"GRH ou Comptabilité/Contrôle/Audit — LiREM, management durable des organisations","categorie":"Comptabilité/Contrôle"},{"section":"06","numero":"261892","region":"NOUVELLE-AQUITAINE","etablissement":"UNIVERSITE PAU","profil":"Stratégie, RSE et Stratégie de développement de marque — Techniques de Commercialisation","categorie":"Marketing"},{"section":"05","numero":"261908","region":"ILE-DE-FRANCE","etablissement":"UNIVERSITE EVRY","profil":"Économie industrielle et/ou économie de l'environnement — économétrie et méthodes quantitatives","categorie":"Méthodes/Économétrie"},{"section":"06","numero":"261916","region":"ILE-DE-FRANCE","etablissement":"UNIVERSITE EVRY","profil":"Marketing/communication digitale ou marketing de l'innovation — LITEM","categorie":"Marketing"},{"section":"06","numero":"261929","region":"HAUTS-DE-FRANCE","etablissement":"IUT LILLE","profil":"Sciences de gestion : finance, économie, gestion, comptabilité","categorie":"Finance"},{"section":"05","numero":"261946","region":"ILE-DE-FRANCE","etablissement":"UNIVERSITE PARIS PANTHEON ASSAS","profil":"Économie Mathématique et microéconomie appliquée","categorie":"Microéconomie/Marchés"},{"section":"06","numero":"261962","region":"AUVERGNE-RHONE-ALPES","etablissement":"UNIVERSITE LYON 1","profil":"Sciences de gestion appliquées aux organisations sportives","categorie":"Stratégie/Management"},{"section":"06","numero":"261963","region":"AUVERGNE-RHONE-ALPES","etablissement":"UNIVERSITE JEAN MONNET","profil":"Système d'information, Stratégie-Entrepreneuriat, RH & Management","categorie":"Entrepreneuriat/Innovation"},{"section":"05","numero":"261966","region":"AUVERGNE-RHONE-ALPES","etablissement":"UNIVERSITE LYON 1","profil":"Organisation industrielle et économie publique","categorie":"Économie industrielle/Innovation"},{"section":"06","numero":"261970","region":"ILE-DE-FRANCE","etablissement":"UNIVERSITE PARIS-EST CRETEIL","profil":"Marketing","categorie":"Marketing"},{"section":"06","numero":"262023","region":"AUVERGNE-RHONE-ALPES","etablissement":"IUT SAINT ETIENNE","profil":"Contrôle de gestion, Management, Ressources Humaines","categorie":"Stratégie/Management"},{"section":"06","numero":"262034","region":"HAUTS-DE-FRANCE","etablissement":"UNIVERSITE DE LILLE","profil":"Distribution","categorie":"Marketing"},{"section":"06","numero":"262037","region":"HAUTS-DE-FRANCE","etablissement":"UNIVERSITE DE LILLE","profil":"Comptabilité, Audit, Contrôle, Finance d'entreprise","categorie":"Comptabilité/Contrôle"},{"section":"06","numero":"262038","region":"HAUTS-DE-FRANCE","etablissement":"UNIVERSITE DE LILLE","profil":"Consommation, Commerce circulaire et supply chain","categorie":"Logistique/Supply Chain"},{"section":"06","numero":"262039","region":"HAUTS-DE-FRANCE","etablissement":"UNIVERSITE DE LILLE","profil":"Marketing","categorie":"Marketing"},{"section":"06","numero":"262040","region":"HAUTS-DE-FRANCE","etablissement":"UNIVERSITE DE LILLE","profil":"Finance","categorie":"Finance"}];

const C06 = "#1a3a5c";
const C05 = "#8b1a1a";
const ACCENT = "#c8a951";
const BG = "#fafaf8";

const REGION_LABELS = {
  "ILE-DE-FRANCE": "Île-de-France",
  "AUVERGNE-RHONE-ALPES": "Auvergne-Rhône-Alpes",
  "HAUTS-DE-FRANCE": "Hauts-de-France",
  "NOUVELLE-AQUITAINE": "Nouvelle-Aquitaine",
  "GRAND-EST": "Grand-Est",
  "OCCITANIE": "Occitanie",
  "CENTRE-VAL-DE-LOIRE": "Centre-Val-de-Loire",
  "BOURGOGNE-FRANCHE-COMTE": "Bourgogne-Franche-Comté",
  "BRETAGNE": "Bretagne",
  "NORMANDIE": "Normandie",
  "PAYS-DE-LA-LOIRE": "Pays-de-la-Loire",
  "PROVENCE-ALPES-COTE-D'AZUR": "PACA",
};

const PIE_COLORS_06 = ["#1a3a5c","#254f7a","#2d6496","#3575aa","#4a87bc","#6aa0cc","#8cb5d5","#aecae0","#ccdde9","#deeaf3","#edf4f8"];
const PIE_COLORS_05 = ["#8b1a1a","#a52020","#c03030","#d54545","#e06060","#ea8080","#f2a0a0","#f7c0c0","#fad8d8","#fceaea"];

function count(arr, key) {
  return arr.reduce((acc, item) => {
    acc[item[key]] = (acc[item[key]] || 0) + 1;
    return acc;
  }, {});
}

function toSortedArray(obj) {
  return Object.entries(obj).sort((a, b) => b[1] - a[1]);
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: "white", border: "1px solid #e0dbd5", padding: "8px 14px", borderRadius: 6, fontSize: 13, boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
        <p style={{ fontWeight: 700, marginBottom: 2, color: "#222" }}>{label}</p>
        {payload.map((p, i) => (
          <p key={i} style={{ color: p.fill || p.color, margin: "2px 0" }}>{p.name || "Postes"}: <strong>{p.value}</strong></p>
        ))}
      </div>
    );
  }
  return null;
};

export default function App() {
  const [section, setSection] = useState("all");
  const [region, setRegion] = useState("all");
  const [cat, setCat] = useState("all");
  const [search, setSearch] = useState("");
  const [view, setView] = useState("profils"); // profils | regions | etabs | liste
  const [sortEtab, setSortEtab] = useState("desc");

  const allRegions = useMemo(() => [...new Set(RAW_DATA.map(d => d.region))].sort(), []);
  const allCats06 = useMemo(() => [...new Set(RAW_DATA.filter(d => d.section === "06").map(d => d.categorie))].sort(), []);
  const allCats05 = useMemo(() => [...new Set(RAW_DATA.filter(d => d.section === "05").map(d => d.categorie))].sort(), []);
  const allCats = section === "06" ? allCats06 : section === "05" ? allCats05 : [...new Set(RAW_DATA.map(d => d.categorie))].sort();

  const filtered = useMemo(() => {
    return RAW_DATA.filter(d => {
      if (section !== "all" && d.section !== section) return false;
      if (region !== "all" && d.region !== region) return false;
      if (cat !== "all" && d.categorie !== cat) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        return (d.profil || "").toLowerCase().includes(q) ||
          (d.etablissement || "").toLowerCase().includes(q) ||
          (d.categorie || "").toLowerCase().includes(q);
      }
      return true;
    });
  }, [section, region, cat, search]);

  // Profile chart data
  const profileData = useMemo(() => {
    const c = count(filtered, "categorie");
    return toSortedArray(c).map(([name, value]) => ({ name, value, pct: ((value / filtered.length) * 100).toFixed(0) }));
  }, [filtered]);

  // Region chart data
  const regionData = useMemo(() => {
    const c = count(filtered, "region");
    return toSortedArray(c).slice(0, 14).map(([name, value]) => ({
      name: REGION_LABELS[name] || name,
      value,
      s06: filtered.filter(d => d.region === name && d.section === "06").length,
      s05: filtered.filter(d => d.region === name && d.section === "05").length,
    }));
  }, [filtered]);

  // Etab chart data
  const etabData = useMemo(() => {
    const c = count(filtered, "etablissement");
    let arr = toSortedArray(c).slice(0, 15).map(([name, value]) => ({
      name: name.replace("UNIVERSITE DE ", "U. ").replace("UNIVERSITE ", "U. ").replace("AIX-MARSEILLE UNIVERSITE", "U. Aix-Marseille").replace("NANTES UNIVERSITE", "U. Nantes").replace("LE MANS UNIVERSITE", "U. Le Mans").replace("AVIGNON UNIVERSITE", "U. Avignon").replace("INST POLYTECHNIQUE GRENOBLE", "INP Grenoble").replace("UNIV. CLERMONT AUVERGNE (EPE)", "U. Clermont Auvergne").replace("UNIV GRENOBLE ALPES (EPE)", "U. Grenoble Alpes"),
      fullName: name,
      value,
      s06: filtered.filter(d => d.etablissement === name && d.section === "06").length,
      s05: filtered.filter(d => d.etablissement === name && d.section === "05").length,
    }));
    if (sortEtab === "asc") arr = arr.reverse();
    return arr;
  }, [filtered, sortEtab]);

  const s06count = filtered.filter(d => d.section === "06").length;
  const s05count = filtered.filter(d => d.section === "05").length;
  const etabCount = new Set(filtered.map(d => d.etablissement)).size;

  const pieData = profileData.map((d, i) => ({ ...d, fill: section === "05" ? PIE_COLORS_05[i] || "#f0e0e0" : PIE_COLORS_06[i] || "#d0e4f0" }));

  const TABS = [
    { id: "profils", label: "Par profil" },
    { id: "regions", label: "Par région" },
    { id: "etabs", label: "Par établissement" },
    { id: "liste", label: "Liste des postes" },
  ];

  const resetFilters = () => { setSection("all"); setRegion("all"); setCat("all"); setSearch(""); };

  return (
    <div style={{ fontFamily: "'Georgia', 'Times New Roman', serif", background: BG, minHeight: "100vh", color: "#222" }}>
      {/* Header */}
      <div style={{ background: C06, color: "white", padding: "18px 28px 14px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, letterSpacing: "-0.3px" }}>
            Postes MCF 2026 — Sections 05 & 06
          </h1>
          <p style={{ margin: "4px 0 0", fontSize: 12, color: "#aaccee", fontFamily: "sans-serif" }}>
            Source : ODYSSÉE, 03/03/2026 · 131 postes
          </p>
        </div>
      </div>

      {/* Stat pills */}
      <div style={{ background: "#eeebe4", borderBottom: "1px solid #ddd" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "10px 28px", display: "flex", gap: 32, flexWrap: "wrap", alignItems: "center" }}>
          {[
            { v: filtered.length, l: "postes sélectionnés", c: "#333" },
            { v: s06count, l: "section 06", c: C06 },
            { v: s05count, l: "section 05", c: C05 },
            { v: etabCount, l: "établissements", c: ACCENT },
          ].map(({ v, l, c }) => (
            <div key={l} style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
              <span style={{ fontSize: 26, fontWeight: 700, color: c }}>{v}</span>
              <span style={{ fontSize: 12, color: "#666", fontFamily: "sans-serif" }}>{l}</span>
            </div>
          ))}
          {(section !== "all" || region !== "all" || cat !== "all" || search) && (
            <button onClick={resetFilters} style={{ marginLeft: "auto", background: "none", border: "1px solid #aaa", borderRadius: 4, padding: "4px 12px", cursor: "pointer", fontSize: 12, color: "#666", fontFamily: "sans-serif" }}>
              ↺ Réinitialiser
            </button>
          )}
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "20px 28px" }}>
        {/* Filters */}
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 22, alignItems: "flex-end" }}>
          <div>
            <label style={{ display: "block", fontSize: 11, color: "#888", marginBottom: 4, fontFamily: "sans-serif", textTransform: "uppercase", letterSpacing: "0.5px" }}>Section</label>
            <select value={section} onChange={e => { setSection(e.target.value); setCat("all"); }}
              style={{ padding: "7px 12px", border: "1px solid #ccc", borderRadius: 4, fontSize: 13, background: "white", cursor: "pointer", fontFamily: "sans-serif", minWidth: 170 }}>
              <option value="all">Toutes les sections</option>
              <option value="06">06 — Sciences de gestion</option>
              <option value="05">05 — Sciences économiques</option>
            </select>
          </div>
          <div>
            <label style={{ display: "block", fontSize: 11, color: "#888", marginBottom: 4, fontFamily: "sans-serif", textTransform: "uppercase", letterSpacing: "0.5px" }}>Région</label>
            <select value={region} onChange={e => setRegion(e.target.value)}
              style={{ padding: "7px 12px", border: "1px solid #ccc", borderRadius: 4, fontSize: 13, background: "white", cursor: "pointer", fontFamily: "sans-serif", minWidth: 190 }}>
              <option value="all">Toutes les régions</option>
              {allRegions.map(r => <option key={r} value={r}>{REGION_LABELS[r] || r}</option>)}
            </select>
          </div>
          <div>
            <label style={{ display: "block", fontSize: 11, color: "#888", marginBottom: 4, fontFamily: "sans-serif", textTransform: "uppercase", letterSpacing: "0.5px" }}>Domaine / Catégorie</label>
            <select value={cat} onChange={e => setCat(e.target.value)}
              style={{ padding: "7px 12px", border: "1px solid #ccc", borderRadius: 4, fontSize: 13, background: "white", cursor: "pointer", fontFamily: "sans-serif", minWidth: 230 }}>
              <option value="all">Tous les domaines</option>
              {allCats.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div style={{ flex: 1, minWidth: 180 }}>
            <label style={{ display: "block", fontSize: 11, color: "#888", marginBottom: 4, fontFamily: "sans-serif", textTransform: "uppercase", letterSpacing: "0.5px" }}>Recherche libre</label>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Mot-clé dans le profil, établissement…"
              style={{ padding: "7px 12px", border: "1px solid #ccc", borderRadius: 4, fontSize: 13, width: "100%", fontFamily: "sans-serif", boxSizing: "border-box" }} />
          </div>
        </div>

        {/* View tabs */}
        <div style={{ display: "flex", gap: 4, marginBottom: 20, borderBottom: "2px solid #ddd" }}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => setView(t.id)}
              style={{ padding: "8px 18px", border: "none", background: view === t.id ? C06 : "transparent", color: view === t.id ? "white" : "#666", cursor: "pointer", fontSize: 13, fontFamily: "sans-serif", borderRadius: "4px 4px 0 0", fontWeight: view === t.id ? 600 : 400, transition: "all 0.15s" }}>
              {t.label}
            </button>
          ))}
        </div>

        {/* CHART: By profile */}
        {view === "profils" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 28 }}>
            <div>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: section === "05" ? C05 : C06, marginBottom: 14, marginTop: 0 }}>
                Répartition par domaine de profil
                {filtered.length < RAW_DATA.length && <span style={{ fontWeight: 400, color: "#888", fontSize: 12, marginLeft: 8 }}>({filtered.length} postes filtrés)</span>}
              </h3>
              <ResponsiveContainer width="100%" height={Math.max(280, profileData.length * 36)}>
                <BarChart data={profileData} layout="vertical" margin={{ left: 0, right: 60, top: 4, bottom: 4 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#eee" />
                  <XAxis type="number" tick={{ fontSize: 11, fontFamily: "sans-serif", fill: "#aaa" }} axisLine={false} tickLine={false} />
                  <YAxis type="category" dataKey="name" width={210} tick={{ fontSize: 12, fontFamily: "sans-serif", fill: "#333" }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="value" radius={[0, 3, 3, 0]} label={{ position: "right", formatter: (v, entry) => `${v}  (${((v/filtered.length)*100).toFixed(0)}%)`, fontSize: 11, fontFamily: "sans-serif", fill: "#666" }}>
                    {profileData.map((entry, i) => (
                      <Cell key={i} fill={section === "05" ? PIE_COLORS_05[i] || "#f0e0e0" : PIE_COLORS_06[i] || "#d0e4f0"} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: "#555", marginBottom: 14, marginTop: 0 }}>Vue proportionnelle</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={110} innerRadius={50}>
                    {pieData.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
                  </Pie>
                  <Tooltip formatter={(v, n) => [`${v} (${((v/filtered.length)*100).toFixed(0)}%)`, n]} />
                </PieChart>
              </ResponsiveContainer>
              <div style={{ marginTop: 10 }}>
                {pieData.slice(0, 6).map((d, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5, fontSize: 12, fontFamily: "sans-serif" }}>
                    <div style={{ width: 12, height: 12, borderRadius: 2, background: d.fill, flexShrink: 0 }} />
                    <span style={{ color: "#555", flex: 1 }}>{d.name}</span>
                    <span style={{ fontWeight: 700, color: "#333" }}>{d.value}</span>
                  </div>
                ))}
                {pieData.length > 6 && <div style={{ fontSize: 11, color: "#aaa", fontFamily: "sans-serif", marginTop: 4 }}>+ {pieData.length - 6} autres catégories</div>}
              </div>
            </div>
          </div>
        )}

        {/* CHART: By region */}
        {view === "regions" && (
          <div>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: "#333", marginBottom: 14, marginTop: 0 }}>
              Répartition régionale <span style={{ fontWeight: 400, color: "#888", fontSize: 12 }}>(top 14)</span>
            </h3>
            <ResponsiveContainer width="100%" height={Math.max(300, regionData.length * 38)}>
              <BarChart data={regionData} layout="vertical" margin={{ left: 0, right: 60, top: 4, bottom: 4 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#eee" />
                <XAxis type="number" tick={{ fontSize: 11, fontFamily: "sans-serif", fill: "#aaa" }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="name" width={180} tick={{ fontSize: 12, fontFamily: "sans-serif", fill: "#333" }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="s06" name="Section 06" stackId="a" fill={C06} radius={[0,0,0,0]} />
                <Bar dataKey="s05" name="Section 05" stackId="a" fill={C05} radius={[0,3,3,0]}
                  label={{ position: "right", formatter: (v, entry, idx) => { const d = regionData[idx]; return d ? `${d.value}` : ""; }, fontSize: 11, fontFamily: "sans-serif", fill: "#666" }} />
                <Legend wrapperStyle={{ fontFamily: "sans-serif", fontSize: 12 }} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* CHART: By etab */}
        {view === "etabs" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: "#333", margin: 0 }}>
                Top 15 établissements recruteurs
              </h3>
              <button onClick={() => setSortEtab(s => s === "desc" ? "asc" : "desc")}
                style={{ background: "none", border: "1px solid #ccc", borderRadius: 4, padding: "4px 12px", cursor: "pointer", fontSize: 12, fontFamily: "sans-serif", color: "#555" }}>
                {sortEtab === "desc" ? "↓ Du plus au moins" : "↑ Du moins au plus"}
              </button>
            </div>
            <ResponsiveContainer width="100%" height={Math.max(320, etabData.length * 38)}>
              <BarChart data={etabData} layout="vertical" margin={{ left: 0, right: 50, top: 4, bottom: 4 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#eee" />
                <XAxis type="number" tick={{ fontSize: 11, fontFamily: "sans-serif", fill: "#aaa" }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="name" width={210} tick={{ fontSize: 11, fontFamily: "sans-serif", fill: "#333" }} axisLine={false} tickLine={false} />
                <Tooltip content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    const d = etabData.find(e => e.name === label);
                    return (
                      <div style={{ background: "white", border: "1px solid #e0dbd5", padding: "8px 14px", borderRadius: 6, fontSize: 13, maxWidth: 260 }}>
                        <p style={{ fontWeight: 700, marginBottom: 4, color: "#222", fontSize: 12 }}>{d?.fullName}</p>
                        <p style={{ color: C06, margin: "2px 0" }}>Section 06: <strong>{payload[0]?.value}</strong></p>
                        <p style={{ color: C05, margin: "2px 0" }}>Section 05: <strong>{payload[1]?.value}</strong></p>
                        <p style={{ margin: "4px 0 0", fontWeight: 700 }}>Total: {d?.value}</p>
                      </div>
                    );
                  }
                  return null;
                }} />
                <Bar dataKey="s06" name="Section 06" stackId="a" fill={C06} />
                <Bar dataKey="s05" name="Section 05" stackId="a" fill={C05} radius={[0,3,3,0]}
                  label={{ position: "right", formatter: (v, entry, idx) => { const d = etabData[idx]; return d ? `${d.value}` : ""; }, fontSize: 11, fontFamily: "sans-serif", fill: "#666" }} />
                <Legend wrapperStyle={{ fontFamily: "sans-serif", fontSize: 12 }} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* LIST VIEW */}
        {view === "liste" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: "#333", margin: 0 }}>
                {filtered.length} poste{filtered.length > 1 ? "s" : ""} trouvé{filtered.length > 1 ? "s" : ""}
              </h3>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {filtered.map(d => (
                <a key={d.numero} href={`https://odyssee.enseignementsup-recherche.gouv.fr/procedures/recrutement-ec/offres-poste/fiche-offre-poste/${d.numero}`}
                  target="_blank" rel="noopener noreferrer"
                  style={{ textDecoration: "none", color: "inherit" }}>
                  <div style={{ background: "white", border: "1px solid #e8e4df", borderRadius: 6, padding: "14px 18px", borderLeft: `4px solid ${d.section === "06" ? C06 : C05}`, transition: "box-shadow 0.15s", cursor: "pointer" }}
                    onMouseEnter={e => e.currentTarget.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)"}
                    onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, flexWrap: "wrap" }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 6, flexWrap: "wrap" }}>
                          <span style={{ background: d.section === "06" ? C06 : C05, color: "white", fontSize: 11, fontFamily: "sans-serif", padding: "2px 8px", borderRadius: 3, fontWeight: 600 }}>
                            Section {d.section}
                          </span>
                          <span style={{ background: "#f0ede8", color: "#666", fontSize: 11, fontFamily: "sans-serif", padding: "2px 8px", borderRadius: 3 }}>
                            {d.categorie}
                          </span>
                          <span style={{ fontSize: 11, color: "#aaa", fontFamily: "sans-serif" }}>n°{d.numero}</span>
                        </div>
                        <div style={{ fontWeight: 600, fontSize: 14, color: "#222", marginBottom: 4 }}>
                          {d.etablissement}
                        </div>
                        <div style={{ fontSize: 12, color: "#888", fontFamily: "sans-serif", marginBottom: 6 }}>
                          {REGION_LABELS[d.region] || d.region}
                        </div>
                        {d.profil && (
                          <div style={{ fontSize: 13, color: "#555", lineHeight: 1.5, fontStyle: "italic" }}>
                            {d.profil.length > 200 ? d.profil.slice(0, 200) + "…" : d.profil}
                          </div>
                        )}
                      </div>
                      <div style={{ fontSize: 11, color: "#aaa", fontFamily: "sans-serif", whiteSpace: "nowrap", paddingTop: 2 }}>
                        ↗ ODYSSÉE
                      </div>
                    </div>
                  </div>
                </a>
              ))}
              {filtered.length === 0 && (
                <div style={{ textAlign: "center", color: "#aaa", fontFamily: "sans-serif", fontSize: 14, padding: 40 }}>
                  Aucun poste ne correspond à votre sélection.
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{ borderTop: "1px solid #e8e4df", marginTop: 32, padding: "14px 28px", background: "#f5f2ee" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
          <span style={{ fontSize: 11, color: "#aaa", fontFamily: "sans-serif", fontStyle: "italic" }}>
            Note : catégorisation basée sur les mots-clés du descriptif ODYSSÉE. Cliquer sur un poste (vue Liste) ouvre la fiche sur ODYSSÉE.
          </span>
          <span style={{ fontSize: 11, color: "#aaa", fontFamily: "sans-serif" }}>
          </span>
        </div>
      </div>
    </div>
  );
}
