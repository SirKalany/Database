# 🚀 Installation de Next.js

Ce guide résume comment installer **Next.js** pour un **nouveau projet** ou pour l'intégrer dans un **projet existant** (migration).

---

## ✅ Pour un nouveau projet

### 1. Créer un projet avec Next.js

```bash
npx create-next-app@latest
```

> 🛠️ Vous pouvez aussi ajouter l'option `--typescript` pour un projet TypeScript :
>
> ```bash
> npx create-next-app@latest --typescript
> ```

### 2. Accéder au dossier du projet

```bash
cd nom-du-projet
```

### 3. Lancer le serveur de développement

```bash
npm run dev
```

Visitez [http://localhost:3000](http://localhost:3000) pour voir votre application.

---

## 🔄 Pour un projet existant (migration vers Next.js)

### 1. Initialiser npm (si ce n’est pas fait)

```bash
npm init -y
```

### 2. Installer les dépendances nécessaires

```bash
npm install next react react-dom
```

### 3. Ajouter les scripts dans `package.json`

```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start"
}
```

### 4. Créer la structure minimale

Créez les dossiers suivants :

```
/pages
  └── index.js (ou .tsx)
/public
```

Exemple de contenu pour `pages/index.js` :

```js
export default function Home() {
  return <h1>Hello from Next.js!</h1>;
}
```

### 5. (Optionnel) Ajouter un fichier de configuration

```bash
touch next.config.js
```

```js
// next.config.js
module.exports = {
  reactStrictMode: true,
};
```

---

## 📦 Build et déploiement

Pour créer un build de production :

```bash
npm run build
npm start
```

---

## 📚 Liens utiles

- [Documentation officielle de Next.js](https://nextjs.org/docs)
- [Configuration avancée](https://nextjs.org/docs/api-reference/next.config.js/introduction)
- [Déploiement sur Vercel](https://vercel.com/docs)
