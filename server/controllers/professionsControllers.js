import Professions from "../models/Professions.js"

export const getProfessions = async (req, res)=>{
    try {
        const professions = await Professions.getAllProfessions();
        res.json(professions);
      } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Server error" });
      }
}

export const getLimitedProfessions = async (req,res)=>{
    try{
        const professions = await Professions.dropdownProfessions();
        res.json(professions);
    } catch (error){
        console.log("Error fetching dropdown Professions.")
    }
}

export const getSidebarProfessions = async (req,res)=>{
    try{
        const categories = await Professions.sidebarProfessions();
        res.json(categories)
    }  catch (error){
        console.log("Error fetching sidebar Professions.")
    }
}
