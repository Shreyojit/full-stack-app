import userServices from "../services/userServices.js";
import { createError } from "../utils/error.js";


export const updateProfile = async(req,res,next)=>{
    try{
      const {id} = req.params;
      const updatedUser = await userServices.updateProfile(id,req.body)
      const {password: userPassword, ...otherDetails} = updatedUser._doc
      res.status(200).json({user:{...otherDetails}});
    }catch(err){
        next(createError(500, err.message));
    }

};

// Delete User
export const deleteUser = async (req, res, next) => {
    try {
      const { id } = req.params;
      await userServices.deleteUser(id);
  
      res.status(200).json({ message: "User has been deleted successfully." });
    } catch (err) {
        next(createError(500, err.message));
    }
  };