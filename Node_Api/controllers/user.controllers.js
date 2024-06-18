import User from "../models/user.models.js";

export const getAllusers = async (req, res) => {
    const users = await User.find({});
  
    res.json({
      success: true,
      users,
    });
}

export const getUser = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
  
    res.json({
      success: true,
      user,
    });
}

export const UpdateUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);

  res.json({
    success: true,
    message: 'Updated user',
  });
}

export const DeleteUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);

  res.json({
    success: true,
    message: 'Delete user',
  });
}

export const register = async (req, res) => {
    const { name, email, password } = req.body;
    await User.create({
      name,
      email,
      password,
    });
  
    res.status(201).cookie("temp", "lol").json({
      success: true,
      message: "Registerd successfully!",
    });
}