const express = require('express');
const { registerUser, loginUser, logout, forgotPassword, resetPassword, getUserDetails, updatePassword, getAllUsers, getSingleUser, updateUserRole, deleteUser } = require('../controllers/userController');
const { authorizeRoles, isAuthenticatedUser } = require("../middleware/auth")
const router = express.Router();

router
    .route("/register")
    .post(registerUser);
router
    .route("/login")
    .post(loginUser);
router
    .route("/password/forgot")
    .post(forgotPassword);
router
    .route("/password/reset/:token")
    .put(resetPassword);
router
    .route("/me")
    .get(isAuthenticatedUser, getUserDetails);
router
    .route("/logout")
    .post(logout);
router
    .route("/password/update")
    .put(isAuthenticatedUser, updatePassword);
router
    .route("/admin/users")
    .get(isAuthenticatedUser, authorizeRoles("admin"), getAllUsers);
router
    .route("/admin/user/:id")
    .get(isAuthenticatedUser, authorizeRoles("admin"), getSingleUser)
    .put(isAuthenticatedUser, authorizeRoles("admin"), updateUserRole)
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser);

module.exports = router;