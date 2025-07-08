// middleware/requireShift.js
const StaffShift = require("../models/staffShift.model");

module.exports = async (req, res, next) => {
  const userId = req.user.id;
  const now = new Date();
  const today = now.toISOString().split("T")[0];

  const shift = await StaffShift.findOne({ staffId: userId, date: today });
  if (!shift) return res.status(403).json({ message: "No shift assigned today" });

  const start = new Date(`${today}T${shift.startTime}:00`);
  const end = new Date(`${today}T${shift.endTime}:00`);

  if (now < start || now > end) {
    return res.status(403).json({ message: "Access denied: outside shift hours" });
  }

  next();
};
