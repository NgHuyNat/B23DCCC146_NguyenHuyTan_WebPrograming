const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    // Kiểm tra nếu không có header Authorization
    if (!authHeader) {
        return res.status(401).json({ message: 'Bạn cần đăng nhập!' });
    }

    const token = authHeader.split(' ')[1]; // Lấy token sau "Bearer "

    // Giải mã token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Giải mã token
        console.log('Decoded token payload:', decoded);
        req.user = decoded; // Lưu thông tin giải mã vào req
        next(); // Tiếp tục xử lý
    } catch (err) {
        return res.status(403).json({ message: 'Token không hợp lệ!' });
    }
};

module.exports = authenticateToken;
