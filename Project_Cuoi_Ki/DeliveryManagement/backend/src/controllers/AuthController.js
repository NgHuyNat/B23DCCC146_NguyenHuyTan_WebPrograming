const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');


// Tạo token JWT
const generateToken = (id) => {
  console.log('ID used to generate token:', id);
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// Đăng ký người dùng
exports.registerUser = (req, res) => {
  const { full_name, email, phone_number, password } = req.body;

  // Kiểm tra email đã tồn tại
  User.findByEmail(email, async (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Lỗi cơ sở dữ liệu', error: err });
    }

    if (results.length > 0) {
      return res.status(400).json({ message: 'Email đã tồn tại!' });
    }

    // Kiểm tra số điện thoại đã tồn tại
    User.findByPhone(phone_number, async (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Lỗi cơ sở dữ liệu', error: err });
      }

      if (results.length > 0) {
        return res.status(400).json({ message: 'Số điện thoại đã tồn tại!' });
      }

      // Mã hóa mật khẩu
      const hashedPassword = await bcrypt.hash(password, 10);

      // Tạo người dùng mới
      User.create({ full_name, email, phone_number, password: hashedPassword }, (err, result) => {
        if (err) {
          return res.status(500).json({ message: 'Lỗi cơ sở dữ liệu', error: err });
        }
        console.log('Result after user creation:', result);
        const token = generateToken(result.insertId);

        return res.status(201).json({
          id: result.insertId,
          full_name,
          email,
          phone_number,
          token,
        });
      });
    });
  });
};


// Đăng nhập người dùng
exports.loginUser = (req, res) => {
  const { email, password } = req.body;

  // Tìm người dùng qua email
  User.findByEmail(email, async (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Lỗi cơ sở dữ liệu', error: err });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: 'Thông tin đăng nhập không chính xác!' });
    }

    const user = results[0];

    // Kiểm tra mật khẩu
    console.log('User retrieved during login:', user); // Log thông tin người dùng
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Thông tin đăng nhập không chính xác!' });
    }

    // Tạo token và trả về thông tin người dùng
    const token = generateToken(user.user_id);
    
    res.json({
      id: user.id,
      email: user.email,
      token,
    });
  });
};

exports.getUserProfile = (req, res) => {
  console.log('User ID from token:', req.user.id);
  const userId = req.user.id; // Lấy ID từ token đã giải mã

  User.findById(userId, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Lỗi cơ sở dữ liệu', error: err });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Người dùng không tồn tại!' });
    }

    res.status(200).json(results[0]); // Trả về thông tin người dùng
  });
};

exports.updateUserProfile = (req, res) => {
  const userId = req.user.id; // Lấy ID từ token đã giải mã
  const { full_name, phone_number, address, ward, district, province } = req.body; // Lấy dữ liệu từ request body

  // Chuẩn bị dữ liệu
  const data = {
    user_id: userId,
    full_name,
    phone_number,
    address,
    ward,
    district,
    province,
  };

  // Gọi hàm cập nhật
  User.update(data, (err, results) => {
    if (err) {
      console.error('Lỗi khi cập nhật thông tin người dùng:', err);
      return res.status(500).json({ message: 'Lỗi cơ sở dữ liệu', error: err });
    }

    res.status(200).json({ message: 'Cập nhật thông tin thành công!' });
  });
};


