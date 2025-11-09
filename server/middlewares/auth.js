import { clerkClient, getAuth } from "@clerk/express";

export const auth = async (req, res, next) => {
  try {
    // Get authentication info from request
    const { userId, has } = getAuth(req);

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: No user found",
      });
    }

    // Check plan
    const hasPremiumPlan = has({ plan: "subscription" });

    // Fetch user
    const user = await clerkClient.users.getUser(userId);

    if (!hasPremiumPlan && user.privateMetadata?.free_usage) {
      req.free_usage = user.privateMetadata.free_usage;
    } else {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
          free_usage: 0,
        },
      });
      req.free_usage = 0;
    }

    // Attach plan info to request
    req.plan = hasPremiumPlan ? "subscription" : "free";

    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
