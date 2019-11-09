import Joi from 'joi';

export default {
  crawlData: {
    body: {
      domain: Joi.string().required(),
      regexes: Joi.array().required(),
      numLevels: Joi.number().required(),
    },
  },
};
