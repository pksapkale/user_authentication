import { Router } from "express";
import authHelperService from "../services/authHelperService.mjs";

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
        const { body } = req,
            response = await authHelperService.signup(body);
        res.send(response);
    } catch (err) {
        console.log("Error in {/signup} in {authHelper.mjs}, ERROR ----->>>>> \n \n", err);
        res.status(400).json({ status: false, message: "Error in process" });
    }
});

/*

    @ Pushpendra
    API Path - "/auth/signup"
    Desc - Created api for user signup
    Params - { 
                user_email: string, 
                password: string,
              }
    Date - 05/10/23

*/

router.post("/login", async (req, res) => {
    try {
        const { body } = req,
            response = await authHelperService.login(body);
        res.send(response);
    } catch (err) {
        console.log("Error in {/login} in {authHelper.mjs}, ERROR ----->>>>> \n \n", err);
        res.status(400).json({ status: false, message: "Error in process" });
    }
});

/*

    @ Pushpendra
    API Path - "/auth/re_gen_token"
    Desc - Created api for user signup
    Params - { 
                refresh_token: string
              }
    Date - 05/10/23

*/

router.post("/re_gen_token", async (req, res) => {
    try {
        const { body } = req,
            response = await authHelperService.re_gen_token(body);
        res.send(response);
    } catch (err) {
        console.log("Error in {/re_gen_token} in {authHelper.mjs}, ERROR ----->>>>> \n \n", err);
        res.status(400).json({ status: false, message: "Error in process" });
    }
});

export default router;