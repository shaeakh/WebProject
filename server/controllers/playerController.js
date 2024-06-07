const User = require('../models/User');

exports.getAllPlayers = (req, res) => {
  User.findAllPlayers((err, players) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching players', error: err });
    }
    res.status(200).json(players);
  });
};

exports.updatePlayersCategories = (req, res) => {
  const players = req.body.players; // Array of objects with regNo and category

  // Function to update categories for all players
  const updateCategories = async () => {
    for (const player of players) {
      await new Promise((resolve, reject) => {
        User.updatePlayerCategory(player.regNo, player.category, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
    }
  };

  updateCategories()
    .then(() => res.status(200).json({ message: 'Player categories updated successfully' }))
    .catch((err) => res.status(500).json({ message: 'Error updating player categories', error: err }));
};
