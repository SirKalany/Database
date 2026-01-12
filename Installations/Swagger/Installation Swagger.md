# 📘 Installation de Swagger (OpenAPI) dans un projet Node.js

Ce guide vous montre comment intégrer **Swagger UI** dans une API Express pour documenter automatiquement vos routes.

---

## ✅ Pré-requis

Assurez-vous d'avoir un projet Node.js avec Express déjà installé.

```bash
npm init -y
npm install express
```

---

## 📦 Installation de Swagger

```bash
npm install swagger-ui-express swagger-jsdoc
```

---

## 📁 Structure recommandée

```
mon-projet/
├── index.js
├── swagger.js
└── swagger.json (optionnel)
```

---

## 🧠 Configuration de Swagger – `swagger.js`

```js
const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Demo",
      version: "1.0.0",
      description: "Documentation Swagger de l'API Demo",
    },
  },
  apis: ["./index.js"], // fichiers contenant les annotations OpenAPI
};

module.exports = swaggerJsdoc(options);
```

---

## 🚀 Intégration dans Express – `index.js`

```js
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

const app = express();
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Exemple de route documentée
/**
 * @swagger
 * /hello:
 *   get:
 *     summary: Retourne un message de bienvenue
 *     responses:
 *       200:
 *         description: Succès
 */
app.get("/hello", (req, res) => {
  res.status(200).json({ message: "Bienvenue dans l'API !" });
});

app.listen(3000, () => {
  console.log("✅ Serveur lancé sur http://localhost:3000");
  console.log("📚 Swagger dispo sur http://localhost:3000/api-docs");
});
```

---

## 🧪 Tester la documentation

Lancer le serveur :

```bash
node index.js
```

Puis ouvrir :  
👉 [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

---

## 📚 Liens utiles

- [Swagger UI Express (npm)](https://www.npmjs.com/package/swagger-ui-express)
- [OpenAPI Specification](https://swagger.io/specification/)
- [Swagger Editor en ligne](https://editor.swagger.io/)
