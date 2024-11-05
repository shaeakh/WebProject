/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         reg_no:
 *           type: string
 *           description: Registration number (Primary Key).
 *         name:
 *           type: string
 *           description: Name of the user.
 *         edu_mail:
 *           type: string
 *           description: Educational email[..@student.sust.edu] (Unique).
 *         phone:
 *           type: string
 *           description: User's phone number.
 *         department:
 *           type: string
 *           description: Department name.
 *         user_pic_url:
 *           type: string
 *           description: URL for user profile picture.
 *         password:
 *           type: string
 *           description: Encrypted password for the user.
 *
 *     Tournament:
 *       type: object
 *       properties:
 *         tournament_id:
 *           type: integer
 *           description: Unique ID for the tournament (Primary Key).
 *         tournament_name:
 *           type: string
 *           description: Name of the tournament.
 *         tournament_date:
 *           type: string
 *           format: date
 *           description: Date of the tournament.
 *         sport_type:
 *           type: string
 *           description: Type of sport.
 *         reg_no:
 *           type: string
 *           description: Registration number of the organizer.
 *         player_base_coin:
 *           type: integer
 *           description: Base coin value for each player.
 *         per_team_coin:
 *           type: integer
 *           description: Coin allocation per team.
 *         tournament_logo_url:
 *           type: string
 *           description: URL for the tournament logo.
 *         join_code:
 *           type: string
 *           description: Code to join the tournament.
 *
 *     ParticipatedTournament:
 *       type: object
 *       properties:
 *         tournament_id:
 *           type: integer
 *           description: Tournament ID.
 *         reg_no:
 *           type: string
 *           description: Registration number of the participant.
 *         role:
 *           type: string
 *           description: Role of the participant (e.g., manager, player).
 *
 *     MemberRequest:
 *       type: object
 *       properties:
 *         request_id:
 *           type: integer
 *           description: Request ID (Primary Key).
 *         tournament_id:
 *           type: integer
 *           description: Tournament ID.
 *         reg_no:
 *           type: string
 *           description: Registration number of the requester.
 *         role:
 *           type: string
 *           description: Role requested in the tournament.
 *         position:
 *           type: string
 *           description: Position requested (if applicable).
 *         team_name:
 *           type: string
 *           description: Team name requested (if applicable).
 *         team_logo:
 *           type: string
 *           description: URL for the team logo.
 *
 *     Team:
 *       type: object
 *       properties:
 *         team_id:
 *           type: integer
 *           description: Team ID (Primary Key).
 *         tournament_id:
 *           type: integer
 *           description: Tournament ID.
 *         reg_no:
 *           type: string
 *           description: Registration number of the team manager.
 *         team_name:
 *           type: string
 *           description: Name of the team.
 *         team_logo:
 *           type: string
 *           description: URL for the team logo.
 *         coin:
 *           type: integer
 *           description: Coin allocation for the team.
 *
 *     Player:
 *       type: object
 *       properties:
 *         tournament_id:
 *           type: integer
 *           description: Tournament ID.
 *         reg_no:
 *           type: string
 *           description: Registration number of the player.
 *         team_id:
 *           type: integer
 *           description: Team ID.
 *         position:
 *           type: string
 *           description: Player's position.
 *         player_price:
 *           type: integer
 *           description: Base price of the player.
 *         category:
 *           type: string
 *           description: Player's category.
 *
 *     AuctionPage:
 *       type: object
 *       properties:
 *         tournament_id:
 *           type: integer
 *           description: Tournament ID.
 *         team_id:
 *           type: integer
 *           description: Team ID.
 *         current_player_index:
 *           type: integer
 *           description: Current player index in the auction.
 *         current_bid:
 *           type: integer
 *           description: Current bid amount.
 *         sold:
 *           type: boolean
 *           description: Sold status of the player.
 *         start:
 *           type: boolean
 *           description: Start status of the auction.
 *         pause:
 *           type: boolean
 *           description: Pause status of the auction.
 */
