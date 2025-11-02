import ratelimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
    try {
        const { success } = await ratelimit.limit("my-limit-key"); // per user/IP based rate limiting can be implemented by using req.ip or req.user.id instead of a static string

        if (!success) {
            return res.status(429).json({ message: "Too many requests. Please try again later." });
        }

        next();

    } catch (error) {
        console.error("Rate Limiter Error:", error);
        
        next(error);
    }
    
};

export default rateLimiter;