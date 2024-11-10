// AUTH ROUTES DOCUMENTATION


/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Register a new user
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: name
 *         type: string
 *         required: true
 *         description: User's full name
 *       - in: formData
 *         name: email
 *         type: string
 *         required: true
 *         description: User's email (@student.sust.edu domain)
 *       - in: formData
 *         name: phone
 *         type: string
 *         required: true
 *         description: User's phone number
 *       - in: formData
 *         name: regNo
 *         type: string
 *         required: true
 *         description: User's registration number
 *       - in: formData
 *         name: department
 *         type: string
 *         required: true
 *         description: User's department
 *       - in: formData
 *         name: password
 *         type: string
 *         required: true
 *         description: User's password
 *       - in: formData
 *         name: confirmPassword
 *         type: string
 *         required: true
 *         description: Confirm password
 *       - in: formData
 *         name: userPicUrl
 *         type: file
 *         description: User's profile picture
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Invalid input or user already exists
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Authenticate user and get token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Logout user
 *     responses:
 *       200:
 *         description: Logged out successfully
 */