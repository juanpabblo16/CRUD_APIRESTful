import { userInfo } from "os";
import UserModel, {UserDocument, UserInput} from "../models/user.model";

class UserService {
    public async create(UserInput: UserInput): Promise<UserDocument>  {

        try {
            const user = await UserModel.create(UserInput);
            return user;
        }catch (error){
            throw error;
        }
    }

    public async findByEmail(email: string): Promise<UserDocument | null> {
        try {
            const user = await UserModel.findOne({email});
            return user;
        } catch (error) {
            throw error;
        }
    }

    public async findAll(): Promise<UserDocument[]> {
        try {
            const users = await UserModel.find();
            return users;
        } catch (error) {
            throw error;
        }
    }

    public async findById(id: String): Promise<UserDocument | null> {
        try {
            const user = await UserModel.findById(id);
            return user;
        } catch (error) {
            throw error;
        }
    }

    public async update(id: String, userInput: UserInput): Promise<UserDocument | null> {
        try {
            const user = await UserModel.findOneAndUpdate({_id: id}, userInput, {returnOriginal: false});;
            return user;
        } catch (error) {
            throw error;
        }
    }

}

export default new UserService();