# 📦 Installation de Vite

Ce guide résume comment installer **Vite** pour un **nouveau projet** ou pour l'intégrer dans un **projet existant**.

---

## ✅ Pour un nouveau projet

### 1. Créer un projet avec Vite

```bash
npm create vite@latest
```

> 🔧 Vous serez invité à donner un nom au projet et à choisir un framework (React, Vue, Svelte, etc.).

### 2. Accéder au dossier du projet

```bash
cd nom-du-projet
```

### 3. Installer les dépendances

```bash
npm install
```

### 4. Lancer le serveur de développement

```bash
npm run dev
```

---

## 🔄 Pour un projet existant

### 1. Initialiser Vite

Si ce n'est pas déjà fait, initialisez `npm` :

```bash
npm init -y
```

### 2. Installer Vite en tant que dépendance

```bash
npm install --save-dev vite
```

> Pour des frameworks comme React ou Vue, installez aussi les plugins :
>
> - **React** : `npm install --save-dev @vitejs/plugin-react`
> - **Vue** : `npm install --save-dev @vitejs/plugin-vue`

### 4. Ajouter les scripts dans `package.json`

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview"
}
```

### 5. Adapter l’arborescence (optionnel)

- Déplacez les fichiers source dans un dossier `src/` si ce n’est pas déjà fait.
- Vérifiez les chemins d’import (certaines conventions peuvent changer).

---

## 🧪 Tester le serveur

```bash
npm run dev
```

Visitez [http://localhost:5173](http://localhost:5173) (port par défaut).

---

## 📚 Liens utiles

- [Documentation officielle de Vite](https://vitejs.dev/)
- [Vite + React](https://vitejs.dev/guide/#scaffolding-your-first-vite-project)
- [Migration vers Vite](https://vitejs.dev/guide/#trying-vite-online)
