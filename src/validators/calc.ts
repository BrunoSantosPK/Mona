import { celebrate, Joi, Segments } from "celebrate";

const validator = {
    calculateGamerTypeByWords: celebrate({
        [Segments.BODY]: Joi.object().keys({
            ip: Joi.string(),
            duration: Joi.number().greater(0).required(),
            words: Joi.array().items(Joi.number().required()).required()
        })
    })
};

export default validator;