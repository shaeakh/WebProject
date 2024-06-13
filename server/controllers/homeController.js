const User = require('../models/User');
const bcrypt = require('bcryptjs');
const fs = require('fs');



exports.updateUser = (req, res) => {
  const { email, password, name, phone, newPassword } = req.body;
  const userPicUrl = req.file ? req.file.cloudinaryUrl : "/uploads/avatar.png";
  const regNo = req.user.reg_no;

  // Confirm email and password
  User.findByEmail(email, (err, users) => {
    if (err || users.length === 0) {
      return res.status(401).json({ message: 'Invalid email' });
    }

    const user = users[0];
    console.log(bcrypt.compareSync(password, user.password))
    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const updatedUser = {
      name: name || user.name,
      phone: phone || user.phone,
      userPicUrl: userPicUrl || user.userPicUrl,
      password: newPassword || user.password,
    };

    User.update(regNo, updatedUser, (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Error updating user', error: err });
      }
      res.status(200).json({ message: 'User updated successfully' });
    });
  });
};

exports.createTournament = (req, res) => {
  const { tournamentName, sportType, tournamentDate, playerBaseCoin, perTeamCoin } = req.body;
  const logoPicUrl = req.file ? req.file.cloudinaryUrl : "/uploads/tournament.png";
  const regNo = req.user.reg_no;
  const joinCode = Math.random().toString(36).substr(2, 9); // Generate a random join code

  const newTournament = {
    tournamentName,
    sportType,
    tournamentDate,
    playerBaseCoin,
    perTeamCoin,
    logoPicUrl,
    regNo,
    joinCode
  };

  User.createTournament(newTournament, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error creating tournament', error: err });
    }
    res.status(201).json({ message: 'Tournament created successfully', tournamentId: result.insertId });
  });
};


exports.updateTournament = (req, res) => {
  const { tournamentId, tournamentName, sportType, tournamentDate, playerBaseCoin, perTeamCoin } = req.body;
  const logoPicUrl = req.file ? req.file.cloudinaryUrl : "/uploads/tournament.png";
  const regNo = req.user.reg_no;

  const updatedTournament = {
    tournamentName,
    sportType,
    tournamentDate,
    playerBaseCoin,
    perTeamCoin,
    logoPicUrl,
  };

  User.updateTournament(tournamentId, updatedTournament, regNo, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error updating tournament', error: err });
    }
    res.status(200).json({ message: 'Tournament updated successfully' });
  });
};


exports.getUserDetails = (req, res) => {
  const regNo = req.user.reg_no;

  User.findByRegNo(regNo, (err, users) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching user details', error: err });
    }
    if (users.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    const user = users[0];
    const userDetails = {
      name: user.name,
      edu_mail: user.edu_mail,
      phone: user.phone,
      department: user.department,
      reg_no: user.reg_no,
      user_pic_url: user.user_pic_url,
    };
    res.status(200).json(userDetails);
  });
};


exports.getCurrentTournamentDetails = (req, res) => {
  const regNo = req.user.reg_no;

  User.findCurrentTournamentByUser(regNo, (err, tournaments) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching current tournament', error: err });
    }

    if (tournaments.length === 0) {
      return res.status(404).json({ message: 'No current tournament found' });
    }

    res.status(200).json({ message: 'Current tournament details', tournament: tournaments[0] });
  });
};

exports.getUserParticipatedTournaments = (req, res) => {
  const regNo = req.user.reg_no;

  User.findParticipatedTournamentsByUser(regNo, (err, tournaments) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching participated tournaments', error: err });
    }

    if (tournaments.length === 0) {
      return res.status(404).json({ message: 'No participated tournaments found' });
    }

    res.status(200).json({ message: 'Participated tournaments fetched successfully', tournaments });
  });
};

exports.joinTournament = (req, res) => {
  const { joinCode, role, position, teamName } = req.body;
  const teamLogo = req.file ? req.file.cloudinaryUrl : "/uploads/team.png";
  const regNo = req.user.reg_no;

  User.findByJoinCode(joinCode, (err, tournaments) => {
    if (err || tournaments.length === 0) {
      return res.status(400).json({ message: 'Invalid join code' });
    }

    const tournament = tournaments[0];
    const newMemberRequest = {
      tournamentId: tournament.tournament_id,
      regNo,
      role,
      position: role === 'player' ? position : null,
      teamName: role === 'manager' ? teamName : null,
      teamLogo: role === 'manager' ? teamLogo : null,
    };

    User.createMemberRequest(newMemberRequest, (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Error joining tournament', error: err });
      }
      res.status(201).json({ message: 'Request to join tournament submitted successfully' });
    });
  });
};

// Get Member Requests
exports.getMemberRequests = (req, res) => {
  User.getMemberRequests((err, requests) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching member requests', error: err });
    }
    res.status(200).json(requests);
  });
};


// Accept Member Request
exports.acceptMemberRequest = (req, res) => {
  const { requestId } = req.params;

  User.getMemberRequests((err, requests) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching member request', error: err });
    }

    const request = requests.find(r => r.request_id == requestId);
    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    const { tournament_id, reg_no, role, position, team_name, team_logo } = request;

    // Fetch tournament coins
    User.getTournamentCoins(tournament_id, (err, coins) => {
      if (err) {
        return res.status(500).json({ message: 'Error fetching tournament coins', error: err });
      }

      const { per_team_coin, player_base_coin } = coins[0];

      // Insert into participated_tournament
      User.createParticipatedTournament({ tournamentId: tournament_id, regNo: reg_no, role }, (err) => {
        if (err) {
          return res.status(500).json({ message: 'Error inserting into participated_tournament', error: err });
        }

        if (role === 'manager') {
          User.createTeam({ tournamentId: tournament_id, regNo: reg_no, teamName: team_name, teamLogo: team_logo, coin: per_team_coin }, (err) => {
            if (err) {
              return res.status(500).json({ message: 'Error creating team', error: err });
            }
            User.deleteMemberRequest(requestId, (err) => {
              if (err) {
                return res.status(500).json({ message: 'Error deleting member request', error: err });
              }
              res.status(201).json({ message: 'Request accepted and team created successfully' });
            });
          });
        } else if (role === 'player') {
          User.createPlayer({ tournamentId: tournament_id, regNo: reg_no, position, playerPrice: player_base_coin }, (err) => {
            if (err) {
              return res.status(500).json({ message: 'Error creating player', error: err });
            }
            User.deleteMemberRequest(requestId, (err) => {
              if (err) {
                return res.status(500).json({ message: 'Error deleting member request', error: err });
              }
              res.status(201).json({ message: 'Request accepted and player added successfully' });
            });
          });
        } else {
          res.status(400).json({ message: 'Invalid role specified' });
        }
      });
    });
  });
};

// Reject Member Request
exports.rejectMemberRequest = (req, res) => {
  const { requestId } = req.params;

  User.deleteMemberRequest(requestId, (err) => {
    if (err) {
      return res.status(500).json({ message: 'Error deleting member request', error: err });
    }
    res.status(200).json({ message: 'Request rejected successfully' });
  });
};


exports.getPlayersByTournament = (req, res) => {
  const { tournamentId } = req.params;

  User.getPlayersByTournament(tournamentId, (err, players) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching players', error: err });
    }
    res.status(200).json(players);
  });
};

exports.updatePlayerCategories = (req, res) => {
  const players = req.body.players;

  User.updatePlayerCategories(players, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error updating player categories', error: err });
    }
    res.status(200).json({ message: 'Player categories updated successfully' });
  });
};