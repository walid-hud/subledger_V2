import {Router} from "express";
import {authenticate, authorize, requireToken} from "../middleware/auth.js";
import subscriptionController from "../controllers/subscription.controller.js";
import {
	PatchSubscriptionsSchema,
	PostSubscriptionsSchema,
	SubscriptionIdParamsSchema,
} from "../schemas/index.js";
import {validate} from "../middleware/validate.js";

const router = Router();

router.use(requireToken, authenticate , authorize(['user']));
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