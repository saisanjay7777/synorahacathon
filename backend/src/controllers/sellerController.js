import sellerService from '../services/sellerService.js';

/**
 * Get aggregated dashboard statistics and auctions for the authenticated seller
 */
export const getDashboard = async (req, res, next) => {
  try {
    const sellerId = req.user.id;
    const stats = await sellerService.getSellerDashboard(sellerId);
    res.status(200).json({
      success: true,
      ...stats,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get recent activity feed for the authenticated seller
 */
export const getActivity = async (req, res, next) => {
  try {
    const sellerId = req.user.id;
    const activity = await sellerService.getSellerActivity(sellerId);
    res.status(200).json({
      success: true,
      count: activity.length,
      activity,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  getDashboard,
  getActivity,
};
