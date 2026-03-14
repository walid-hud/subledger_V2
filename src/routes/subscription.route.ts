import { Router } from "express";
import {authenticate , authorize , requireToken} from "../middleware/auth.js"
import {validate} from "../middleware/validate.js"
import {SubscriptionIdParamsSchema , PatchSubscriptionsSchema , PostSubscriptionsSchema ,} from "../schemas/index.js"
import { placeholder } from "../utils/response.js";

const router = Router()
router.use(requireToken, authenticate , authorize(["user"]))

router.get("/" , placeholder)
router.get("/:subscriptionId" , placeholder );
router.post("/:subscriptionId", placeholder);
router.delete("/:subscriptionId", placeholder);
router.put("/:subscriptionId", placeholder);


export default router


