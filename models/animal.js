'use strict';
module.exports = (sequelize, DataTypes) => {
  const animal = sequelize.define('animal', {
    species_name: DataTypes.STRING,
    scientific_name: DataTypes.STRING,
    image_url: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true,
      },

    },
    description: DataTypes.TEXT,
    extinct: DataTypes.BOOLEAN
  }, {});
  animal.associate = function(models) {
    // associations can be defined here
  };
  return animal;
};