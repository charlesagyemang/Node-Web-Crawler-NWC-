import Joi from 'joi';
// const pattern = /[\s\S]*/;
export default {
  matchRegexBody: {
    body: {
      domain: Joi.string().uri().required(),
      regexes: Joi.array().required(),
      numLevels: Joi.number().required(),
    },
  },
};
