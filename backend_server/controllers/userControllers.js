exports.getCurrentUser = (req,res) => {
    if(req.user) {
        return res.send({message: "User Already Authenticated.", user: req.user});
    }
    res.send({message: "User not Authenticated."});
};