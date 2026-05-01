import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

const normalizeRole = (role) => {
  return String(role || '').toLowerCase() === 'admin' ? 'Admin' : 'Member';
};

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please fill all fields' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const userCount = await User.countDocuments();
    const role = userCount === 0 ? 'Admin' : 'Member';

    const user = await User.create({ name, email, password, role });

    console.log(`User registered: ${name} (${email}) - Role: ${role}`);

    res.status(201).json({
      message: 'Signup successful. Please login now.',
    });
  } catch (error) {
    res.status(500).json({ message: 'Signup error' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Enter email and password' });
    }

    const user = await User.findOne({ email });

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const normalizedRole = normalizeRole(user.role);

    res.json({
      token: createToken(user._id),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: normalizedRole,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Login error' });
  }
};

export const getMe = async (req, res) => {
  const normalizedRole = normalizeRole(req.user.role);

  res.json({
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: normalizedRole,
    },
  });
};