'use strict';

const express = require('express');
const router = express.Router();
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn()

const ManagementClient = require('auth0').ManagementClient;
const token = process.env.AUTH0_API_TOKEN;
const domain = process.env.AUTH0_DOMAIN;

router.get('/apps', ensureLoggedIn, function(req, res) {
  let auth0 = new ManagementClient({
    token: token,
    domain: domain
  });

  Promise.all([auth0.getClients(), auth0.getRules()])
    .then(getAppsList)
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: 'Something went wrong'
      })
    })

  function getAppsList(results) {
    let clients = results[0];
    let rules = results[1];
    let apps = {};

    // Init apps list
    clients.forEach(client => {
      // Each array holds the rules applied to the application
      apps[client.name] = []
    })

    rules.forEach(rule => {
      let filter = /if\s*\(context\.clientName\s*(!|=)={1,2}\s*'.+'\)/i;
      let filtered = filter.exec(rule.script);

      if (filtered) {
        let rawAppName = /'.+'/.exec(filtered[0])[0];
        let appName = rawAppName.replace(/'/g, "")

        apps[appName].push({
          id: rule.id,
          name: rule.name
        })
      }
    })

    res.status(200).json(apps)
  }
})

module.exports = router;
