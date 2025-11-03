// Bloque les actions POST / PUT / DELETE pour les utilisateurs demo
export const checkDemo = (req, res, next) => {
  if (req.user && req.user.role === 'demo') {
    return res.status(403).json({ msg: 'Action interdite pour l’utilisateur demo' });
  }
  next();
};
