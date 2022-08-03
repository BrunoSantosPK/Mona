import { celebrate, Joi, Segments } from "celebrate";

const validator = {
    calculateGamerTypeByWords: celebrate({
        [Segments.BODY]: Joi.object().keys({
            ip: Joi.string(),
            formId: Joi.number().greater(0).required(),
            duration: Joi.number().greater(0).required(),
            words: Joi.array().items(Joi.number().required()).required()
        })
    })
};

export default validator;