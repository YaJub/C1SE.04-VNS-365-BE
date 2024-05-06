const Sequelize = require('sequelize');

// Assuming you have a Sequelize instance already configured
const sequelize = new Sequelize(/* your connection details */);

const Contact = sequelize.define('Contact', {
  name: {
    type: Sequelize.STRING,
    allowNull: false, // Consider adding validation for required fields
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false, // Consider adding validation for required fields
  },
  phone: {
    type: Sequelize.STRING,
  },
  message: {
    type: Sequelize.TEXT, // Use TEXT for longer messages
  },
}, {
  timestamps: true, // Enable timestamps automatically
});

module.exports = Contact;