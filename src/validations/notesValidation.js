
import { Joi, Segments } from 'celebrate';
import { TAGS } from '../constants/tags.js';
import { isValidObjectId } from 'mongoose';

const objectIdValidator = (value, helpers) => {
  return !isValidObjectId(value) ? helpers.message('Invalid id format') : value;
};

export const getAllNotesSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(5).max(20).default(10),
    tag: Joi.string().valid(...TAGS),
    search: Joi.string().allow('').default(''),
    sortBy: Joi.string().valid("_id", "title", "content", "tag").default("_id"),
    sortOrder: Joi.string().valid("asc", "desc").default("asc"),
  }),
};

export const noteIdSchema = {
  [Segments.PARAMS]: Joi.object({
    noteId: Joi.string().custom(objectIdValidator).required(),
  }),
};

export const createNoteSchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().trim().min(1).required().messages({
      "string.base": "Title must be a string",
      "string.min": "Title should have at least {#limit} characters",
      'any.required': 'Title is required',
      'string.empty': 'Title cannot be empty',
    }),
    content: Joi.string().allow('').default('').messages({
      "string.base": "Content must be a string",
    }),
    tag: Joi.string().valid(...TAGS).default('Todo').messages({
      "string.base": "Tag must be a string",
      "any.only": `Tag must be one of the following: ${TAGS.join(', ')}`,
    }),
  }),
};

export const updateNoteSchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().trim().min(1).messages({
      "string.base": "Title must be a string",
      "string.min": "Title should have at least {#limit} characters",
      'string.empty': 'Title cannot be empty',
    }),
    content: Joi.string().allow('').messages({
      "string.base": "Content must be a string",
    }),
    tag: Joi.string().valid(...TAGS).messages({
      "string.base": "Tag must be a string",
      "any.only": `Tag must be one of the following: ${TAGS.join(', ')}`,
    }),
  }).min(1).messages({
      'object.min': 'At least one field must be provided for update',
    }),
  [Segments.PARAMS]: Joi.object({
    noteId: Joi.string().custom(objectIdValidator).required(),
  }),
};
