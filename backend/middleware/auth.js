import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  try {
    // Get token from Authorization header OR token header
    const authHeader = req.headers["authorization"] || req.headers["token"];
    if (!authHeader) {
      return res.status(401).json({ success: false, message: "Token missing" });
    }

    // Extract token if header is "Bearer <token>"
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : authHeader;

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach userId to request object
    req.userId = decoded.id;
    next();
  } catch (error) {
    console.error("Auth error:", error.message);
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};

export default authMiddleware;
