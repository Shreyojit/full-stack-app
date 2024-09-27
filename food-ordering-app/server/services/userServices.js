import User from "../models/User.js";


class UserService{

    async updateProfile(id, updates) {
        const updatedUser = await User.findByIdAndUpdate(id, { $set: updates }, {
            new: true,
            runValidators: true
        });
        if (!updatedUser) throw new Error("User not Found!..");
        return updatedUser;
    }

    async deleteUser(id){
        const deleteUser = await User.findByIdAndDelete(id)
        if(!deleteUser) throw new Error("User not found!..")
            return deleteUser;
    }

}

export default new UserService()