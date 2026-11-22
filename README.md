
# Weather App — Open-Meteo

## Présentation

Application météo mise à jour dans le cadre du test de positionnement Simplon.

Ce projet est basé sur l'application Weather App de madzadev. L'objectif est de la modifier pour afficher les informations météo sur des écrans destinés aux usagers des transports en commun.

## Modifications réalisées

- Remplacement de l'API OpenWeatherMap par Open-Meteo.
- Création d'un fichier config.json pour définir la ville et ses coordonnées.
- Suppression du moteur de recherche de villes.
- Modification du traitement des données JSON pour conserver les composants existants.
- Actualisation automatique des données météo toutes les heures.
- Gestion des erreurs avec try/catch.
- Désactivation du cache de l'API interne avec Cache-Control: no-store.

## Fonctionnalités

- Affichage de la météo de la ville configurée.
- Température et température ressentie.
- Humidité.
- Vitesse et direction du vent.
- Visibilité.
- Heures de lever et de coucher du soleil.
- Conversion entre les unités métriques et impériales.

## Configuration

Le fichier config.json permet de définir la ville dont on souhaite afficher la météo.

Exemple pour Paris :

```json
{
  "city": "Paris",
  "latitude": 48.8566,
  "longitude": 2.3522
}
```

Pour changer de ville, il suffit de modifier son nom, sa latitude et sa longitude dans ce fichier.

## Technologies utilisées

- HTML et CSS
- JavaScript
- React
- Next.js
- API Open-Meteo
- JSON
- Git et GitHub

## Installation et lancement

1. Récupérer le projet depuis GitHub.
2. Ouvrir le dossier du projet dans le Terminal.
3. Installer les dépendances avec `npm install`.
4. Démarrer l'application avec la commande :

```bash
NODE_OPTIONS=--openssl-legacy-provider npm run dev
```

5. Ouvrir http://localhost:3000 dans un navigateur.

L'option de compatibilité Node.js est utilisée temporairement pour faire fonctionner cette ancienne version de Next.js.

## Tests effectués

- Vérification de l'affichage de la météo de Paris dans Firefox.
- Vérification des réponses API dans l'onglet Réseau.
- Test du rafraîchissement automatique avec un intervalle temporaire de 10 secondes.
- Remise de l'intervalle à une heure après le test.
- Vérification de la suppression de la recherche de ville.
- Vérification de la conversion des unités.
- Vérification du cache avec Cache-Control: no-store.
- Vérification des modifications avec Git.
- Compilation du projet avec `npm run build`.

## Projet d'origine

Application initiale créée par madzadev :

https://github.com/madzadev/weather-app

Mise à jour de l'application météo avec Open-Meteo dans le cadre du test de positionnement Simplon.

Le projet d'origine est distribué sous licence MIT.
