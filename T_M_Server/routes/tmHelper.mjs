import { Router } from "express";
import tmhelperService from "../services/tmHelperService.mjs";

const router = Router();

/*

    @ Pushpendra
    API Path - "/auth/signup"
    Desc - Created api for user signup
    Params - { 
                user_first_name: string,  
                user_last_name: string,
                user_email: string, 
                password: string,
              }
    Date - 30/07/23

*/

router.post("/signup", async (req, res) => {
    try {
        const { body } = req;
        const userData = await tmhelperService.createTm(body);
        res.send(userData);
    } catch (err) {
        console.log("Error in {/signup} in {authHelper.mjs}, ERROR ----->>>>> \n \n", err);
        res.status(400).json({ status: false, message: "Error in process" });
    }
});

export default router;