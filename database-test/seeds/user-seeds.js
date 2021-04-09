const { User } = require('../models');

const userData = [
    
    {
    id: 1,
    username: 'chowjai',
    email: 'emailme@nathanchow.ca',
    password: 'password123'
    }
];

const seedUsers = () => User.bulkCreate(userData, {individualHooks: true})

module.exports = seedUsers;