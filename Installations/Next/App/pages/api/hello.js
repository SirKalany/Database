// Exemple d'API route (GET http://localhost:3000/api/hello)

export default function handler(req, res) {
  res.status(200).json({ message: "Hello depuis l'API Next.js !" });
}
