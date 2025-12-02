const users = [
    {
        id: 1,
        name: "Rakesh",
        country: "Nepal"
    },
        {
        id: 2,
        name: "Ram",
        country: "Nepal"
    },
        {
        id: 3,
        name: "Shyam",
        country: "Nepal"
    },
        {
        id: 4,
        name: "Hari",
        country: "India"
    }
]

exports.getAllUsers = () => users;

// get user by ID
exports.getUserByID = (id) => users.find(u => u.id === id)

// add a new user
exports.addNewUser = (user) => {
    user.id = users.length + 1;
    users.push(user);
    return user;
}

// update existing user
exports.updateUser = (id, userData) => {
    const userId = users.findIndex(u=> u.id === userId);
    if (userId === -1) return null;
    users[userId] = { ...users[userId], ...userData};
    return users[userId];
}

// delete existing user
exports.deleteUser = (id) => {
    const userId = users.findIndex(u=> u.id === userId);
    if (userId === -1) return false;

    users.splice(userId, 1)
    return true;
}
