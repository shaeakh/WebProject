const User = require('../models/User');
const bcrypt = require('bcryptjs');
const fs = require('fs');

exports.getHomePage = (req, res) => {
  const regNo = req.user.reg_no;

  User.findTournamentsByUser(regNo, (err, tournaments) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching tournaments', error: err });
    }

    res.status(200).json({ message: 'User home page', tournaments });
  });
};

exports.updateUser = (req, res) => {
  const { email, password, name, phone, newPassword } = req.body;
  const userPic = req.files && req.files.userPic ? fs.readFileSync(req.files.userPic[0].path) : null;
  const regNo = req.user.reg_no;

  // Confirm email and password
  User.findByEmail(email, (err, users) => {
    if (err || users.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const user = users[0];
    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const updatedUser = {
      name,
      phone,
      userPic,
      password: newPassword ? bcrypt.hashSync(newPassword, 10) : user.password,
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
  const logoPic = req.file ? fs.readFileSync(req.file.path) : null;
  const regNo = req.user.reg_no;

  const joinCode = Math.random().toString(36).substr(2, 9); // Generate a random join code

  const newTournament = {
    tournamentName,
    sportType,
    tournamentDate,
    logoPic,
    joinCode,
    regNo,
    playerBaseCoin,
    perTeamCoin
  };

  User.createTournament(newTournament, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error creating tournament', error: err });
    }
    res.status(201).json({ message: 'Tournament created successfully', joinCode });
  });
};

exports.joinTournament = (req, res) => {
  const { joinCode, role, position, teamName } = req.body;
  const regNo = req.user.reg_no;
  const teamLogo = req.file;

  User.findTournamentByJoinCode(joinCode, (err, tournaments) => {
    if (err || tournaments.length === 0) {
      return res.status(400).json({ message: 'Invalid join code' });
    }

    const tournament = tournaments[0];
    const newMemberRequest = {
      tournamentId: tournament.tournament_id,
      regNo,
      role
    };

    User.createMemberRequest(newMemberRequest, (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Error joining tournament', error: err });
      }

      if (role === 'player') {
        const newPlayer = {
          tournamentId: tournament.tournament_id,
          regNo,
          position
        };

        User.createPlayer(newPlayer, (err, result) => {
          if (err) {
            return res.status(500).json({ message: 'Error adding player to tournament', error: err });
          }
          res.status(201).json({ message: 'Player joined tournament successfully' });
        });
      } else if (role === 'manager') {
        const teamLogoBuffer = teamLogo ? fs.readFileSync(teamLogo.path) : null;
        const newManager = {
          tournamentId: tournament.tournament_id,
          regNo,
          teamName,
          teamLogo: teamLogoBuffer
        };

        User.createManager(newManager, (err, result) => {
          if (err) {
            return res.status(500).json({ message: 'Error adding manager to tournament', error: err });
          }
          res.status(201).json({ message: 'Manager joined tournament successfully' });
        });
      } else {
        res.status(400).json({ message: 'Invalid role specified' });
      }
    });
  });
};
