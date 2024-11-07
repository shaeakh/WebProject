/**
 * @swagger
 * tags:
 *   name: Tournament Management
 *   description: API endpoints for tournament management
 */



// home page routes
/**
 * @swagger
 * /api/home/update-user:
 *   post:
 *     summary: Update user profile information
 *     tags: [Tournament Management]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 required: true
 *               password:
 *                 type: string
 *                 required: true
 *               name:
 *                 type: string
 *               phone:
 *                 type: string
 *               newPassword:
 *                 type: string
 *                 minLength: 6
 *               userPicUrl:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User updated successfully
 *       401:
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid email or password
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: object
 */

/**
 * @swagger
 * /api/home/participated-tournaments:
 *   get:
 *     summary: Get list of tournaments user has participated in
 *     tags: [Tournament Management]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of participated tournaments or empty message
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - type: object
 *                   properties:
 *                     tournaments:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Tournament'
 *                 - type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: No participated tournaments found
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: object
 */

/**
 * @swagger
 * /api/home/user-details:
 *   get:
 *     summary: Get current user's profile details
 *     tags: [Tournament Management]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: User details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserDetails'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User not found
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: object
 */

// create tournament routes
/**
 * @swagger
 * /api/home/create-tournament:
 *   post:
 *     summary: Create a new tournament
 *     tags: [Tournament Management]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - tournamentName
 *               - sportType
 *               - tournamentDate
 *               - playerBaseCoin
 *               - perTeamCoin
 *               - num_of_player
 *             properties:
 *               tournamentName:
 *                 type: string
 *                 example: "IPL 2024"
 *               sportType:
 *                 type: string
 *                 example: "Cricket"
 *               tournamentDate:
 *                 type: string
 *                 format: date
 *                 example: "2024-03-15"
 *               playerBaseCoin:
 *                 type: number
 *                 example: 1000
 *               perTeamCoin:
 *                 type: number
 *                 example: 10000
 *               num_of_player:
 *                 type: integer
 *                 example: 11
 *               logoPicUrl:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Tournament created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Tournament created successfully
 *                 tournamentId:
 *                   type: integer
 *                   example: 1
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: object
 */

//start-auction
/**
 * @swagger
 * /api/home/start-auction:
 *   post:
 *     summary: Start auction for a tournament
 *     tags: [Tournament Management]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - tournament_id
 *             properties:
 *               tournament_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Auction started successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Auction started successfully
 *                 result:
 *                   type: object
 *       500:
 *         description: Server error
 */

// update tournament routes
/**
 * @swagger
 * /api/home/update-tournament/{tournamentId}:
 *   put:
 *     summary: Update tournament details
 *     tags: [Tournament Management]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: tournamentId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the tournament to update
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               tournamentName:
 *                 type: string
 *               sportType:
 *                 type: string
 *               tournamentDate:
 *                 type: string
 *                 format: date
 *               playerBaseCoin:
 *                 type: number
 *               perTeamCoin:
 *                 type: number
 *               num_of_player:
 *                 type: integer
 *               logoPicUrl:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Tournament updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Tournament updated successfully
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/home/tournament-details/{tournamentId}:
 *   get:
 *     summary: Get details of a specific tournament
 *     tags: [Tournament Management]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: tournamentId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the tournament to fetch
 *     responses:
 *       200:
 *         description: Tournament details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Current tournament details
 *                 tournament:
 *                   $ref: '#/components/schemas/Tournament'
 *       404:
 *         description: Tournament not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: No current tournament found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/home/join-tournament:
 *   post:
 *     tags:
 *       - Tournament Management
 *     summary: Join a tournament
 *     security:
 *       - BearerAuth: []
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: joinCode
 *         type: string
 *         required: true
 *         description: Code to join a specific tournament
 *       - in: formData
 *         name: role
 *         type: string
 *         required: true
 *         description: Role of the user in the tournament
 *         enum: [player, manager]
 *       - in: formData
 *         name: position
 *         type: string
 *         description: Player's position if the role is 'player'
 *       - in: formData
 *         name: teamName
 *         type: string
 *         description: Team name if the role is 'manager'
 *       - in: formData
 *         name: teamLogo
 *         type: file
 *         description: Logo for the team if the role is 'manager'
 *     responses:
 *       201:
 *         description: Request to join tournament submitted successfully
 *       400:
 *         description: Invalid join code
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/home/tournament-role:
 *   post:
 *     tags:
 *       - Tournament Management
 *     summary: Get user's role in a tournament
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: body
 *         name: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             tournament_id:
 *               type: integer
 *               description: ID of the tournament
 *     responses:
 *       200:
 *         description: Role retrieved successfully
 *         schema:
 *           type: object
 *       400:
 *         description: tournament_id and regNo are required
 *       404:
 *         description: Unauthorized role
 *       500:
 *         description: Error fetching tournament role
 */

/**
 * @swagger
 * /api/home/member-requests/{tournamentId}:
 *   get:
 *     tags:
 *       - Tournament Management
 *     summary: Get member requests for a tournament
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: tournamentId
 *         required: true
 *         type: integer
 *         description: ID of the tournament
 *     responses:
 *       200:
 *         description: Member requests retrieved successfully
 *       500:
 *         description: Error fetching member requests
 */

/**
 * @swagger
 * /api/home/member-requests/{tournamentId}/{requestId}/accept:
 *   post:
 *     tags:
 *       - Tournament Management
 *     summary: Accept a member request
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: tournamentId
 *         required: true
 *         type: integer
 *         description: ID of the tournament
 *       - in: path
 *         name: requestId
 *         required: true
 *         type: integer
 *         description: ID of the request to accept
 *     responses:
 *       201:
 *         description: Request accepted and team/player added successfully
 *       404:
 *         description: Request not found
 *       500:
 *         description: Error processing member request
 */

/**
 * @swagger
 * /api/home/member-requests/{requestId}/reject:
 *   delete:
 *     tags:
 *       - Tournament Management
 *     summary: Reject a member request
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: requestId
 *         required: true
 *         type: integer
 *         description: ID of the request to reject
 *     responses:
 *       200:
 *         description: Request rejected successfully
 *       500:
 *         description: Error deleting member request
 */

/**
 * @swagger
 * /api/home/players/{tournamentId}:
 *   get:
 *     tags:
 *       - Tournament Management
 *     summary: Get players by tournament ID
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: tournamentId
 *         required: true
 *         type: integer
 *         description: ID of the tournament
 *     responses:
 *       200:
 *         description: Players retrieved successfully
 *       500:
 *         description: Error fetching players
 */

/**
 * @swagger
 * /api/home/players/categories:
 *   post:
 *     tags:
 *       - Tournament Management
 *     summary: Update player categories
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               players:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     playerId:
 *                       type: integer
 *                     category:
 *                       type: string
 *                 example: [{ "playerId": 1, "category": "A" }]
 *     responses:
 *       200:
 *         description: Player categories updated successfully
 *       500:
 *         description: Error updating player categories
 */

/**
 * @swagger
 * /api/home/team-details-managerview:
 *   post:
 *     tags:
 *       - Tournament Management
 *     summary: Get team details by manager
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tournament_id:
 *                 type: integer
 *                 description: ID of the tournament
 *     responses:
 *       200:
 *         description: Team details retrieved successfully
 *       400:
 *         description: tournament_id and regNo are required
 *       500:
 *         description: Error fetching team details
 */

/**
 * @swagger
 * /api/home/team-details-playerview:
 *   post:
 *     tags:
 *       - Tournament Management
 *     summary: Get team details by player
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tournament_id:
 *                 type: integer
 *                 description: ID of the tournament
 *     responses:
 *       200:
 *         description: Team details retrieved successfully
 *       400:
 *         description: tournament_id and regNo are required
 *       500:
 *         description: Error fetching team details
 */

/**
 * @swagger
 * /api/home/team-players-playerview:
 *   post:
 *     tags:
 *       - Tournament Management
 *     summary: Get team players by player
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tournament_id:
 *                 type: integer
 *                 description: ID of the tournament
 *     responses:
 *       200:
 *         description: Team players retrieved successfully
 *       400:
 *         description: tournament_id and regNo are required
 *       500:
 *         description: Error fetching team players
 */

/**
 * @swagger
 * /api/home/team-players-managerview:
 *   post:
 *     tags:
 *       - Tournament Management
 *     summary: Get players in a specific team by manager view
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tournament_id:
 *                 type: integer
 *                 description: ID of the tournament
 *               team_id:
 *                 type: integer
 *                 description: ID of the team
 *     responses:
 *       200:
 *         description: Team players retrieved successfully
 *       500:
 *         description: Error fetching team players
 */

/**
 * @swagger
 * /api/home/tournament-info:
 *   post:
 *     tags:
 *       - Tournament Management
 *     summary: Get tournament information
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tournament_id:
 *                 type: integer
 *                 description: ID of the tournament
 *     responses:
 *       200:
 *         description: Tournament information retrieved successfully
 *       500:
 *         description: Error fetching tournament info
 */

/**
 * @swagger
 * /api/home/tournament-teams:
 *   post:
 *     tags:
 *       - Tournament Management
 *     summary: Get teams in a tournament
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tournament_id:
 *                 type: integer
 *                 description: ID of the tournament
 *     responses:
 *       200:
 *         description: Teams retrieved successfully
 *       500:
 *         description: Error fetching teams
 */