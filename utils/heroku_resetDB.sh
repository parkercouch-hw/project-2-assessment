#!/bin/bash
heroku run node_modules/.bin/sequelize db:migrate:undo:all
heroku run node_modules/.bin/sequelize db:migrate
# heroku run node_modules/.bin/sequelize db:seed:all