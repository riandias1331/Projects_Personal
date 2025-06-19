const User = require("../models/UserModel.js");
const bcrypt = require("bcrypt");

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.register = async (req, res) => {
  try {
    const { email, password } = req.body

    const salt = await bcrypt.genSalt(10); 
    const hashPassword = await bcrypt.hash(password, salt); 

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email já está em uso' });
    }

    const user = await User.create({
      email,
      password: hashPassword
    })
    console.log(user)
    // res.status(201).json(user)
    res.status(201).json({ message: 'Usuário criado com sucesso!' });
  } catch (error) {
    res.status(400).json({ messaege: error.messaege })
  }
};


exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;

      
  
      const user = await User.findOne({ email });
      if (!user) {
        console.log('email inválido')
        return res.status(400).json({ error: 'Usuário não encontrado' });
      }
  
      
      const isPasswordValid = await bcrypt.compare(password, user.password);
 
      if (!isPasswordValid) {
        console.log('Senha inválida')
        return res.status(400).json({ error: 'Senha inválida' });
      }
  
      console.log('Login bem-sucedido:', user);
      res.status(200).json({ message: 'Login bem-sucedido', user }); 
    } catch (error) {
      res.status(500).json({ message: error.message });
    }

};
