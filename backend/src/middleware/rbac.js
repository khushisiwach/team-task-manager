const requireRole = (role) => {
  return (req, res, next) => {
    // This assumes your existing auth middleware attaches the user to req.user
    if (req.user && req.user.role === role) {
      next();
    } else {
      res.status(403).json({ message: "Access denied: Insufficient permissions." });
    }
  };
};

module.exports = { requireRole };
