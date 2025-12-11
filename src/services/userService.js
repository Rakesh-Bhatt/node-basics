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
exports.getUserByID = (id) => users.find(u => u.id === parseInt(id))

// add a new user
exports.addNewUser = (user = {}) => {
    if (!user.name || !user.country) {
        console.log("Invalid user:", user);
        return null;
    }

    const newId = users.length + 1;

    const newUser = {
        id: newId,
        name: user.name,
        country: user.country
    };

    users.push(newUser);
    return newUser;
};


// update existing user
exports.updateUser = (id, userData) => {
    const uid = parseInt(id);
    const userId = users.findIndex(u=> u.id === uid);
    if (userId === -1) return null;
    users[userId] = { ...users[userId], ...userData};
    return users[userId];
}

// delete existing user
exports.deleteUser = (id) => {
    const uid = parseInt(id);
    const userId = users.findIndex(u=> u.id === uid);
    if (userId === -1) return false;

    users.splice(userId, 1)
    return true;
}

// check if the user exists with email
exports.findUserByEmail = (email) => {
    return users.find(u => u.email === email);
}
