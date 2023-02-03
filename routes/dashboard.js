const express = require("express");
const router = express.Router();
const dashboard = require('../controllers/DashboardController');

    // Get admin dashboard stats
    router.get('/admin/getDashboardStats', dashboard.getAdminDashboardStats);

module.exports = router;