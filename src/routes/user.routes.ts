import {Router} from "express";
import {authenticate, hasToken} from "../middleware/auth.js";
import subscriptionController from "../controllers/subscription.controller.js";
import {
	PatchSubscriptionsSchema,
	PostSubscriptionsSchema,
	SubscriptionIdParamsSchema,
} from "../schemas/index.js";
import {validate} from "../middleware/validate.js";

const router = Router();

router.use(hasToken, authenticate);
router.get("/profile", subscriptionController.getProfile);

router.post(
	"/",
	validate(PostSubscriptionsSchema),
	subscriptionController.createSubscription,
);

router.get("/", subscriptionController.listSubscriptions);

router.get(
	"/:subscriptionId",
	validate(SubscriptionIdParamsSchema),
	subscriptionController.getSubscription,
);

router.patch(
	"/:subscriptionId",
	validate(SubscriptionIdParamsSchema),
	validate(PatchSubscriptionsSchema),
	subscriptionController.updateSubscription,
);

router.delete(
	"/:subscriptionId",
	validate(SubscriptionIdParamsSchema),
	subscriptionController.removeSubscription,
);

export default router;