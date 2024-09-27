import User from "../models/User.js";
import Address from "../models/Address.js"; // Import the Address model

class UserService {
    async updateProfile(id, updates) {
        // Find the user by ID

        console.log("UPDATES ARE-________>",updates)
        const user = await User.findById(id);
        if (!user) throw new Error("User not Found!..");

        // If an address is included in updates
        if (updates.address) {
            const addressData = updates.address;

            console.log("UPDATES ARE2-________>",addressData)

            // Check if the user already has an address
            if (user.address) {
                // Update the existing address
                const updatedAddress = await Address.findByIdAndUpdate(user.address, {
                    ...addressData, // Update the address fields
                }, {
                    new: true, // Return the updated address document
                    runValidators: true, // Ensure that validators are run during update
                });

                if (!updatedAddress) throw new Error("Address not found");
                
                // Assign the ObjectId of the updated address to user
                user.address = updatedAddress._id; 
            } else {

                // Create a new address if the user does not have one
                const newAddress = await Address.create({
                    ...addressData,
                    ownerId: user._id, // Reference to the user ObjectId
                    ownerModel: 'User' // Specify that this address belongs to a User
                });

                console.log("UPDATES ARE3-________>",newAddress)

                // Assign the ObjectId of the new address to user
                user.address = newAddress._id; 
                console.log("UPDATES ARE4-________>",user)
            }
        }

        

        // Save the updated user document
        await user.save();

        // Return the updated user object
        return user;
    }

    async deleteUser(id) {
        const deleteUser = await User.findByIdAndDelete(id);
        if (!deleteUser) throw new Error("User not found!..");
        return deleteUser;
    }
}

export default new UserService();
