# Créer un nouveau projet Express.js

Ce guide résume comment installer **Express.js** pour un **nouveau projet** avec routing et gestion d'état.

---

## 1. Initialiser le projet Node.js

```bash
mkdir my-express-app
cd my-express-app
npm init -y
```

## 2. Installer Express et les dépendances essentielles

```bash
npm install express
npm install --save-dev nodemon typescript @types/node @types/express
```

**Dépendances utiles supplémentaires :**

```bash
npm install dotenv cors helmet morgan
npm install --save-dev @types/cors
```

## 3. Configuration TypeScript (optionnel mais recommandé)

```bash
npx tsc --init
```

Modifier le fichier `tsconfig.json` :

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "rootDir": "./src",
    "outDir": "./dist",
    "esModuleInterop": true,
    "strict": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

## 4. Structure du projet

```
my-express-app/
├── src/
│   ├── config/
│   │   └── database.ts
│   ├── controllers/
│   │   ├── userController.ts
│   │   └── productController.ts
│   ├── middleware/
│   │   ├── errorHandler.ts
│   │   └── authMiddleware.ts
│   ├── models/
│   │   └── userModel.ts
│   ├── routes/
│   │   ├── userRoutes.ts
│   │   └── productRoutes.ts
│   ├── services/
│   │   └── userService.ts
│   ├── utils/
│   │   └── logger.ts
│   └── app.ts
│   └── server.ts
├── .env
├── .gitignore
├── package.json
└── tsconfig.json
```

## 5. Créer le fichier serveur principal

```typescript
// src/app.ts
import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';

import userRoutes from './routes/userRoutes';
import productRoutes from './routes/productRoutes';
import { errorHandler } from './middleware/errorHandler';

dotenv.config();

const app: Application = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Bienvenue sur l\'API Express' });
});

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

// Gestion des erreurs 404
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Route non trouvée' });
});

// Middleware de gestion des erreurs
app.use(errorHandler);

export default app;
```

```typescript
// src/server.ts
import app from './app';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
```

## 6. Configuration du routing

```typescript
// src/routes/userRoutes.ts
import { Router } from 'express';
import { 
  getUsers, 
  getUserById, 
  createUser, 
  updateUser, 
  deleteUser 
} from '../controllers/userController';

const router = Router();

router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
```

## 7. Créer les controllers

```typescript
// src/controllers/userController.ts
import { Request, Response, NextFunction } from 'express';

export const getUsers = async (
  req: Request, 
  res: Response, 
  next: NextFunction
) => {
  try {
    // Logique pour récupérer tous les utilisateurs
    res.json({ message: 'Liste des utilisateurs' });
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (
  req: Request, 
  res: Response, 
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    res.json({ message: `Utilisateur ${id}` });
  } catch (error) {
    next(error);
  }
};

export const createUser = async (
  req: Request, 
  res: Response, 
  next: NextFunction
) => {
  try {
    const userData = req.body;
    res.status(201).json({ message: 'Utilisateur créé', data: userData });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (
  req: Request, 
  res: Response, 
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const userData = req.body;
    res.json({ message: `Utilisateur ${id} mis à jour`, data: userData });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (
  req: Request, 
  res: Response, 
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    res.json({ message: `Utilisateur ${id} supprimé` });
  } catch (error) {
    next(error);
  }
};
```

## 8. Middleware de gestion des erreurs

```typescript
// src/middleware/errorHandler.ts
import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.stack);

  res.status(500).json({
    error: {
      message: err.message || 'Erreur serveur interne',
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    }
  });
};
```

## 9. Configuration des variables d'environnement

```bash
# .env
PORT=3000
NODE_ENV=development
DATABASE_URL=mongodb://localhost:27017/myapp
JWT_SECRET=votre_secret_jwt
```

```bash
# .gitignore
node_modules/
dist/
.env
*.log
```

## 10. Scripts NPM

Modifier le fichier `package.json` :

```json
{
  "scripts": {
    "dev": "nodemon --exec ts-node src/server.ts",
    "build": "tsc",
    "start": "node dist/server.js",
    "watch": "tsc --watch"
  }
}
```

## 11. Intégration avec une base de données (exemple MongoDB)

```bash
npm install mongoose
npm install --save-dev @types/mongoose
```

```typescript
// src/config/database.ts
import mongoose from 'mongoose';

export const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL!);
    console.log('✅ Base de données connectée');
  } catch (error) {
    console.error('❌ Erreur de connexion à la base de données:', error);
    process.exit(1);
  }
};
```

```typescript
// src/models/userModel.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IUser>('User', userSchema);
```

Mettre à jour `src/server.ts` :

```typescript
import app from './app';
import { connectDatabase } from './config/database';

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  await connectDatabase();
  
  app.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
  });
};

startServer();
```

## 12. Middleware d'authentification (exemple JWT)

```bash
npm install jsonwebtoken bcryptjs
npm install --save-dev @types/jsonwebtoken @types/bcryptjs
```

```typescript
// src/middleware/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface AuthRequest extends Request {
  user?: any;
}

export const authenticateToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token manquant' });
  }

  jwt.verify(token, process.env.JWT_SECRET!, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Token invalide' });
    }
    req.user = user;
    next();
  });
};
```

## 13. Lancer l'application

```bash
# Mode développement
npm run dev

# Build et production
npm run build
npm start
```

L'application sera accessible sur `http://localhost:3000`

## Liens utiles

- [Express.js (officiel)](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Mongoose](https://mongoosejs.com/)
- [JWT](https://jwt.io/)
- [Helmet.js](https://helmetjs.github.io/)
- [Cors](https://www.npmjs.com/package/cors)