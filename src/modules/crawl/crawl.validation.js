import Joi from 'joi';

export default {
  crawlData: {
    body: {
      domain: Joi.string().uri().required(),
      regexes: Joi.array().required(),
      numLevels: Joi.number().required(),
    },
  },
};
