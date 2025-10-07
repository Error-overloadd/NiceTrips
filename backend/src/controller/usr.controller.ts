import { Request, Response } from "express";
import { User } from "../models/user.model";
// Data type for creating a new user
type CreateUserDTO = {
  Username: string;
  Email_Address: string;
  Postal_Address?: string;
  Mobile_Number?: string;
  password: string;
};
// Data type for updating a user (all fields optional)
type UpdateUserDTO = Partial<CreateUserDTO>;
//only pick fields we allow to update
const pickUpdate = (body: any): UpdateUserDTO => {
  const dto: UpdateUserDTO = {};
  ["Username", "Email_Address", "Postal_Address", "Mobile_Number", "password"].forEach((k) => {
    if (body?.[k] !== undefined) (dto as any)[k] = body[k];
  });
  return dto;
};
// 
//  Create a new user.
//  1. Get data from request body.
//  2. Check required fields.
//  3. Save to database.
//  4. Return the created user (without passwordHash)
export async function createUser(req: Request, res: Response) {
  try {
    const { Username, Email_Address, Postal_Address, Mobile_Number, password } = req.body as CreateUserDTO;
    if (!Username || !Email_Address || !password) {
      return res.status(400).json({ message: "Need : Username、Email_Address、password" });
    }
    const user = await User.create({ Username, Email_Address, Postal_Address, Mobile_Number, password } as any);
    const json = user.toJSON() as any;
    delete json.passwordHash;
    res.status(201).json({ message: "Create current user", data: json });
  } catch (err: any) {
    res.status(500).json({ message: "Cant create current user ", error: err?.message || err });
  }
}
 //Get a list of all users.
export async function listUsers(_req: Request, res: Response) {
  try {
    const users = await User.findAll({ attributes: { exclude: ["passwordHash"] }, order: [["User_ID", "ASC"]] });
    res.json({ message: "Get user list : successful", data: users });
  } catch (err: any) {
    res.status(500).json({ message: "Get user list: fail", error: err?.message || err });
  }
}
//Get a single user by ID.
export async function getUser(req: Request, res: Response) {
  try {
    const user = await User.findByPk(req.params.id, { attributes: { exclude: ["passwordHash"] } });
    if (!user) return res.status(404).json({ message: "User doesnt exists" });
    res.json({ message: "Get current user : successful", data: user });
  } catch (err: any) {
    res.status(500).json({ message: "Get current user : fail", error: err?.message || err });
  }
}
// Update user by ID.
//    1. Find the user by primary key.
//    2. If user exists, update fields from request body.
//    3. Return the updated user.
// 
export async function updateUser(req: Request, res: Response) {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: "User doesnt exists" });
   
    const dto = pickUpdate(req.body);
    await user.update(dto as any);          
    const json = user.toJSON() as any;
    delete json.passwordHash;
    res.json({ message: "Update user : successful", data: json });
  } catch (err: any) {
    res.status(500).json({ message: "Update user : fail", error: err?.message || err });
  }
}

//  Delete a user by ID.
//  1. Find the user by ID.
//  2. If found, delete from database.
export async function deleteUser(req: Request, res: Response) {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: "User doesnt exists" });
    await user.destroy();
    res.json({ message: "Delete current user: successful" });
  } catch (err: any) {
    res.status(500).json({ message: "Delete current user : fail", error: err?.message || err });
  }
}