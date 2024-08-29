import UserModel, {UserDocument, UserInput}  from "../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class UserService {

       // Función para generar el token JWT
       public generateToken(user: UserDocument): string {
        const payload = {
            id: user._id,
            email: user.email,
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET || "secret", {
            expiresIn: "1h", // El token expira en 1 hora
        });

        return token;
    }

    public async create(userInput: UserInput): Promise<UserDocument> {
        try {
            const userExists: UserDocument | null = await this.findByEmail(userInput.email);
            if(userExists)
                throw new ReferenceError("User already exists");

            userInput.password = await bcrypt.hash(userInput.password, 10);

            const user = await UserModel.create(userInput);
            return user;
        } catch (error) {
            throw error;
        }
    }

    public async login(userInput: UserInput): Promise<{ token: string }> {
        try {
            const user: UserDocument | null = await this.findByEmail(userInput.email);
            if (!user) {
                throw new ReferenceError("User not exists");
            }

            const isMatch: boolean = await bcrypt.compare(userInput.password, user.password);
            if (!isMatch) {
                throw new ReferenceError("Not authorized");
            }

            // Generar token JWT
            const token = this.generateToken(user);

            return { token };
        } catch (error) {
            throw error;
        }
    }

    public async findByEmail(email: string): Promise<UserDocument | null > {
        try {
            const  user = await  UserModel.findOne({email});
            return user;
        } catch (error) {
           throw error; 
        }
    }

    public async findAll(): Promise<UserDocument[] > {
        try {
            const  users = await  UserModel.find();
            return users;
        } catch (error) {
           throw error; 
        }
    }    

    public async findById(id: string): Promise<UserDocument | null > {
        try {
            const  user = await  UserModel.findById(id);
            return user;
        } catch (error) {
           throw error; 
        }
    }

    public async update(id: string, userInput: UserInput): Promise<UserDocument | null> {
        try {
            const  user: UserDocument | null = await  UserModel.findOneAndUpdate({_id: id}, userInput, {returnOriginal: false});
            return user;            
        } catch (error) {
           throw error; 
        }
    }

    public async delete(id: string): Promise<UserDocument | null> {
        try {
            const  user: UserDocument | null = await  UserModel.findByIdAndDelete(id);
            return user;            
        } catch (error) {
           throw error; 
        }
    }    
}

export default new UserService();