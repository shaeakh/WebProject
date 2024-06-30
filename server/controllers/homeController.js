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
  const userPicUrl = req.file ? req.file.cloudinaryUrl : "/uploads/avatar.png";
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
      name: name || user.name,
      phone: phone || user.phone,
      userPicUrl: userPicUrl || user.userPicUrl,
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

exports.joinTournament = (req, res) => {
  const { joinCode, role, position, teamName } = req.body;
  const regNo = req.user.reg_no;
  const teamLogo = req.file ? req.file.cloudinaryUrl : "/uploads/team.png";

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
        const newManager = {
          tournamentId: tournament.tournament_id,
          regNo,
          teamName,
          teamLogo, 
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
