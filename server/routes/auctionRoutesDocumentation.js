//AUCTION API DOCUMENTATION
/**
 * @swagger
 * tags:
 *   name: Auction
 *   description: API endpoints for auction management
 */


/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /api/auction/teams:
 *   post:
 *     summary: Get teams by tournament ID
 *     tags: [Auction]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tournamentId:
 *                 type: string
 *                 required: true
 *     responses:
 *       200:
 *         description: List of teams retrieved successfully
 *       500:
 *         description: Error fetching teams
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /api/auction/players:
 *   post:
 *     summary: Get players by tournament ID
 *     tags: [Auction]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tournamentId:
 *                 type: string
 *                 required: true
 *     responses:
 *       200:
 *         description: List of players retrieved successfully
 *       500:
 *         description: Error fetching players
 */

/**
 * @swagger
 * /api/auction/team_details_manager:
 *   post:
 *     summary: Get team details for a manager
 *     tags: [Auction]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tournamentId:
 *                 type: string
 *                 required: true
 *     responses:
 *       200:
 *         description: Team management information retrieved successfully
 *       500:
 *         description: Error fetching team management info
 */

/**
 * @swagger
 * /api/auction/start:
 *   post:
 *     summary: Start an auction
 *     tags: [Auction]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tournamentId:
 *                 type: string
 *                 required: true
 *     responses:
 *       200:
 *         description: Auction started successfully
 *       500:
 *         description: Error starting auction
 */

/**
 * @swagger
 * /api/auction/update_pause:
 *   post:
 *     summary: Update auction pause status
 *     tags: [Auction]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tournamentId:
 *                 type: string
 *                 required: true
 *               pause:
 *                 type: boolean
 *                 required: true
 *     responses:
 *       200:
 *         description: Pause status updated successfully
 *       500:
 *         description: Error pausing auction
 */

/**
 * @swagger
 * /api/auction/update_player_index:
 *   post:
 *     summary: Update current player index
 *     tags: [Auction]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tournamentId:
 *                 type: string
 *                 required: true
 *               current_player_index:
 *                 type: integer
 *                 required: true
 *     responses:
 *       200:
 *         description: Player index updated successfully
 *       500:
 *         description: Error shifting player index
 */

/**
 * @swagger
 * /api/auction/realtime_info:
 *   post:
 *     summary: Get real-time auction information
 *     tags: [Auction]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tournamentId:
 *                 type: string
 *                 required: true
 *     responses:
 *       200:
 *         description: Real-time information retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 team_logo:
 *                   type: string
 *                 team_name:
 *                   type: string
 *                 manager:
 *                   type: string
 *                 total_players:
 *                   type: integer
 *                 balance:
 *                   type: number
 *                 current_bid:
 *                   type: number
 *                 current_player_index:
 *                   type: integer
 *                 sold:
 *                   type: integer
 *                 start:
 *                   type: boolean
 *                 pause:
 *                   type: boolean
 *       500:
 *         description: Error loading realtime info
 */

/**
 * @swagger
 * /api/auction/last_bidding_team:
 *   post:
 *     summary: Get information about the last bidding team
 *     tags: [Auction]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tournamentId:
 *                 type: string
 *                 required: true
 *     responses:
 *       200:
 *         description: Last bidding team information retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 team_logo:
 *                   type: string
 *                 team_name:
 *                   type: string
 *                 manager:
 *                   type: string
 *                 total_players:
 *                   type: integer
 *                 balance:
 *                   type: number
 *       500:
 *         description: Error fetching last bidding team
 */