const Admin = require('../models/Admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET = "changeme123"; // Pour production => mettre en variable d'environnement

class AuthController {
  static async register(req, res) {
    try {
      const { username, password } = req.body;
      const admin = await Admin.create(username, password);
      res.json({ success: true, data: admin });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  }

  static async login(req, res) {
    try {
      const { username, password } = req.body;
      const admin = await Admin.getByUsername(username);
      if (!admin) throw new Error('Utilisateur introuvable');

      const valid = await bcrypt.compare(password, admin.password);
      if (!valid) throw new Error('Mot de passe incorrect');

      const token = jwt.sign({ id: admin.id }, SECRET, { expiresIn: '1h' });
      res.cookie('token', token, { httpOnly: true });
      res.json({ success: true, message: 'Connecté avec succès' });
    } catch (err) {
      res.status(401).json({ success: false, message: err.message });
    }
  }

  static verifyToken(req, res, next) {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ success: false, message: 'Non autorisé' });
    try {
      const decoded = jwt.verify(token, SECRET);
      req.admin = decoded;
      next();
    } catch (err) {
      res.status(401).json({ success: false, message: 'Token invalide' });
    }
  }
}

module.exports = AuthController;