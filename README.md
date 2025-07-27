# Portfolio de Brice Yakim AsBlast (asblast.space)

![Aperçu du Portfolio AsBlast](https://asblast.space/og-image.jpg)

Bienvenue dans le code source de mon portfolio personnel. Ce projet n'est pas seulement une vitrine de mes travaux, c'est une démonstration tangible de ma philosophie : **"Créer l'excellence numérique"**. En tant que développeur autodidacte, chaque ligne de code de ce site a été une opportunité d'apprendre, d'expérimenter et de repousser les limites de ce qu'un portfolio peut être.

[![Voir le site en direct](https://img.shields.io/badge/Voir%20le%20site-asblast.space-blue?style=for-the-badge&logo=netlify)](https://asblast.space)

## ✨ Fonctionnalités Clés

Ce portfolio va au-delà d'une simple page statique. Il intègre plusieurs fonctionnalités complexes pour créer une expérience utilisateur unique :

*   **🤖 Majordome IA Personnel :** Un agent conversationnel intelligent, propulsé par **Groq** et le **Vercel AI SDK**, capable de répondre aux questions sur mon parcours, mes compétences et mes projets en se basant sur un "Manuel du Majordome" détaillé.
*   **🌌 Fond Animé en Canvas :** Une animation de particules entièrement codée en JavaScript natif pour créer une atmosphère immersive et dynamique, sans impacter lourdement les performances.
*   **⚡️ Performance Exceptionnelle :** Le site a été méticuleusement optimisé pour atteindre des scores Lighthouse impressionnants, avec **94+ sur Bureau** et **78+ sur Mobile**, malgré la complexité des animations.
*   **🛍️ Système de Blog & Boutique :** Une architecture complète pour partager des articles techniques (via MDX) et vendre des produits numériques, faisant de ce site une véritable plateforme de contenu.
*   **🎨 Design System cohérant :** Une interface utilisateur moderne et élégante construite avec **Tailwind CSS** et **shadcn-ui**, et animée avec fluidité grâce à **Framer Motion**.

## 🚀 Stack Technique

Ce projet a été construit avec un ensemble de technologies modernes et performantes :

| Catégorie      | Technologies                                                                   |
| -------------- | ------------------------------------------------------------------------------ |
| **Framework**  | [React](https://react.dev/) via [Vite](https://vitejs.dev/)                      |
| **Langage**    | [TypeScript](https://www.typescriptlang.org/)                                  |
| **Styling**    | [Tailwind CSS](https://tailwindcss.com/), [shadcn-ui](https://ui.shadcn.com/)   |
| **Animation**  | [Framer Motion](https://www.framer.com/motion/)                                |
| **Blog**       | [MDX](https://mdxjs.com/) (Markdown avec des composants JSX)                     |
| **Backend IA** | [Netlify Functions](https://www.netlify.com/products/functions/), [Vercel AI SDK](https://sdk.vercel.ai/docs), [Groq API](https://groq.com/) |
| **Déploiement**| [Netlify](https://www.netlify.com/)                                              |

## 🔧 Lancer le projet localement

Si vous souhaitez explorer le code, le tester ou voir comment il est structuré, suivez ces étapes :

### Prérequis

*   [Node.js](https://nodejs.org/) (version 18 ou supérieure recommandée)
*   [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

### 1. Cloner le Dépôt

```sh
git clone https://github.com/AsBlast/Porfolio.git
cd Porfolio
```

### 2. Installer les Dépendances

```sh
npm install
```

### 3. Configurer les Variables d'Environnement

L'assistant IA a besoin d'une clé API pour fonctionner.

1.  À la racine du projet, créez un fichier nommé `.env.local`.
2.  Copiez le contenu du fichier `.env.example` (s'il existe) ou ajoutez la ligne suivante :

    ```env
    GROQ_API_KEY="votre_clé_api_groq_ici"
    ```
    *Vous pouvez obtenir une clé API gratuite sur le site de [GroqCloud](https://console.groq.com/keys).*

### 4. Démarrer le Serveur de Développement

```sh
npm run dev
```

Votre projet sera maintenant accessible sur `http://localhost:8080` (ou le port indiqué dans votre terminal).

## 📜 Licence

Ce projet est sous **Licence MIT**.

Cela signifie que vous êtes libre d'utiliser, de modifier et de vous inspirer de ce code pour vos propres projets, à condition d'inclure la notice de copyright originale. Voir le fichier `LICENSE` pour plus de détails.

## 👋 Contact

*   **Portfolio :** [asblast.space](https://asblast.space)
*   **LinkedIn :** [Brice Yakim Andriamahefaromisa](https://linkedin.com/in/brice-yakim-andriamahefaromisa-6a8a2b200)


_Ce README a été conçu pour être aussi soigné que le projet qu'il décrit. N'hésitez pas à me contacter pour toute question ou opportunité._
