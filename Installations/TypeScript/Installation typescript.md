# Guide TypeScript

Ce guide résume les concepts essentiels de **TypeScript** pour bien démarrer avec le typage statique en JavaScript.

---

## 1. Installation de TypeScript

```bash
npm install -g typescript
```

### Vérifier l'installation :

```bash
tsc --version
```

### Initialiser un projet TypeScript :

```bash
tsc --init
```

Cela crée un fichier `tsconfig.json` avec la configuration du compilateur.

## 2. Types de base

TypeScript ajoute des types statiques à JavaScript. Voici les types primitifs :

```typescript
// Types primitifs
let name: string = "John";
let age: number = 30;
let isActive: boolean = true;
let nothing: null = null;
let notDefined: undefined = undefined;

// Any (à éviter autant que possible)
let anything: any = "hello";
anything = 42; // Pas d'erreur

// Unknown (préférable à any)
let uncertain: unknown = "hello";
// uncertain.toUpperCase(); // Erreur : il faut vérifier le type d'abord
if (typeof uncertain === "string") {
  uncertain.toUpperCase(); // OK
}

// Void (pour les fonctions qui ne retournent rien)
function log(message: string): void {
  console.log(message);
}

// Never (pour les fonctions qui ne retournent jamais)
function throwError(message: string): never {
  throw new Error(message);
}
```

## 3. Tableaux et tuples

```typescript
// Tableaux
let numbers: number[] = [1, 2, 3, 4];
let strings: Array<string> = ["a", "b", "c"];

// Tuples (tableaux avec types fixes)
let person: [string, number] = ["John", 30];
let rgb: [number, number, number] = [255, 0, 0];
```

## 4. Objects et interfaces

```typescript
// Objet simple
let user: { name: string; age: number } = {
  name: "John",
  age: 30
};

// Interface
interface User {
  name: string;
  age: number;
  email?: string; // Propriété optionnelle
  readonly id: number; // Propriété en lecture seule
}

const newUser: User = {
  id: 1,
  name: "Jane",
  age: 25
};

// newUser.id = 2; // Erreur : id est readonly

// Interface avec méthodes
interface Person {
  firstName: string;
  lastName: string;
  getFullName(): string;
}

const person: Person = {
  firstName: "John",
  lastName: "Doe",
  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  }
};
```

## 5. Types personnalisés et unions

```typescript
// Type alias
type ID = string | number;
type Status = "pending" | "approved" | "rejected";

let userId: ID = "abc123";
userId = 456; // OK

let orderStatus: Status = "pending";
// orderStatus = "cancelled"; // Erreur : pas dans les valeurs autorisées

// Union types
let value: string | number;
value = "hello";
value = 42;

// Intersection types
type Admin = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};

type ElevatedEmployee = Admin & Employee;

const emp: ElevatedEmployee = {
  name: "John",
  privileges: ["create-server"],
  startDate: new Date()
};
```

## 6. Fonctions

```typescript
// Typage des paramètres et du retour
function add(a: number, b: number): number {
  return a + b;
}

// Paramètres optionnels
function greet(name: string, greeting?: string): string {
  return greeting ? `${greeting}, ${name}` : `Hello, ${name}`;
}

// Paramètres par défaut
function multiply(a: number, b: number = 1): number {
  return a * b;
}

// Rest parameters
function sum(...numbers: number[]): number {
  return numbers.reduce((total, num) => total + num, 0);
}

// Fonction fléchée
const divide = (a: number, b: number): number => a / b;

// Type de fonction
type MathOperation = (a: number, b: number) => number;

const subtract: MathOperation = (a, b) => a - b;
```

## 7. Classes

```typescript
class Animal {
  private name: string; // Accessible uniquement dans la classe
  protected age: number; // Accessible dans la classe et les sous-classes
  public species: string; // Accessible partout (par défaut)

  constructor(name: string, age: number, species: string) {
    this.name = name;
    this.age = age;
    this.species = species;
  }

  // Méthode publique
  makeSound(): void {
    console.log(`${this.name} makes a sound`);
  }

  // Getter
  get animalName(): string {
    return this.name;
  }

  // Setter
  set animalName(name: string) {
    this.name = name;
  }
}

// Héritage
class Dog extends Animal {
  constructor(name: string, age: number) {
    super(name, age, "Dog");
  }

  // Override de méthode
  makeSound(): void {
    console.log(`${this.animalName} barks`);
  }
}

const dog = new Dog("Rex", 3);
dog.makeSound(); // Rex barks

// Classe abstraite
abstract class Shape {
  abstract calculateArea(): number;

  describe(): void {
    console.log("This is a shape");
  }
}

class Circle extends Shape {
  constructor(private radius: number) {
    super();
  }

  calculateArea(): number {
    return Math.PI * this.radius ** 2;
  }
}
```

## 8. Generics

Les generics permettent de créer des composants réutilisables qui fonctionnent avec plusieurs types.

```typescript
// Fonction générique
function identity<T>(arg: T): T {
  return arg;
}

let output1 = identity<string>("hello");
let output2 = identity<number>(42);

// Interface générique
interface Box<T> {
  content: T;
}

const stringBox: Box<string> = { content: "hello" };
const numberBox: Box<number> = { content: 42 };

// Classe générique
class DataStorage<T> {
  private data: T[] = [];

  addItem(item: T): void {
    this.data.push(item);
  }

  removeItem(item: T): void {
    const index = this.data.indexOf(item);
    if (index > -1) {
      this.data.splice(index, 1);
    }
  }

  getItems(): T[] {
    return [...this.data];
  }
}

const textStorage = new DataStorage<string>();
textStorage.addItem("Hello");
textStorage.addItem("World");

// Contraintes génériques
interface Lengthwise {
  length: number;
}

function logLength<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}

logLength("hello"); // OK
logLength([1, 2, 3]); // OK
// logLength(42); // Erreur : number n'a pas de propriété length
```

## 9. Utilitaires de types

TypeScript fournit des types utilitaires pour manipuler les types existants.

```typescript
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

// Partial : rend toutes les propriétés optionnelles
type PartialTodo = Partial<Todo>;
const todo1: PartialTodo = { title: "Learn TS" }; // OK

// Required : rend toutes les propriétés obligatoires
type RequiredTodo = Required<PartialTodo>;

// Readonly : rend toutes les propriétés en lecture seule
type ReadonlyTodo = Readonly<Todo>;
const todo2: ReadonlyTodo = {
  title: "Learn TS",
  description: "Study TypeScript",
  completed: false
};
// todo2.completed = true; // Erreur

// Pick : sélectionne certaines propriétés
type TodoPreview = Pick<Todo, "title" | "completed">;
const todo3: TodoPreview = {
  title: "Learn TS",
  completed: false
};

// Omit : exclut certaines propriétés
type TodoWithoutDescription = Omit<Todo, "description">;

// Record : crée un type objet avec des clés et valeurs spécifiques
type PageInfo = Record<string, { title: string; url: string }>;
const pages: PageInfo = {
  home: { title: "Home", url: "/" },
  about: { title: "About", url: "/about" }
};
```

## 10. Compiler et exécuter

### Compiler un fichier TypeScript :

```bash
tsc myfile.ts
```

Cela génère un fichier `myfile.js`.

### Compiler et surveiller les changements :

```bash
tsc --watch
```

### Exécuter directement avec ts-node :

```bash
npm install -g ts-node
ts-node myfile.ts
```

## 📚 Liens utiles

- [TypeScript (officiel)](https://www.typescriptlang.org/)
- [TypeScript Handbook](https://www.typescriptlang.org/)