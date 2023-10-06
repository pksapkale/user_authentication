import { Router } from "express";
import tmhelperService from "../services/tmHelperService.mjs";

const router = Router();

/*

    @ Pushpendra
    API Path - "/auth/signup"
    Desc - Created api for user signup
    Params - {}
    Date - 06/10/23

*/

router.get("/get_tm_list", async (req, res) => {
    try {
        const { body } = req;
        const userData = await tmhelperService.get_tm_list(body);
        res.send(userData);
    } catch (err) {
        console.log("Error in {/signup} in {authHelper.mjs}, ERROR ----->>>>> \n \n", err);
        res.status(400).json({ status: false, message: "Error in process" });
    }
});

export default router;