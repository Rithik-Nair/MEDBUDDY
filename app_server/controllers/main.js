const express = require("express");

module.exports.home = (req, res) => {
  res.render("index", {
    user: req.session.user, // This will pass the user to index.pug
  });
};