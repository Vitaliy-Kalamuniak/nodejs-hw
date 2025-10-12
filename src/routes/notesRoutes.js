import { Router } from 'express';
import { getNoteById, createNote, deleteNote, updateNote } from '../controllers/notesController.js';
import { celebrate } from 'celebrate';

import { noteIdSchema } from '../validations/notesValidation.js';
import { getAllNotesSchema } from '../validations/notesValidation.js';
import { getNotes } from '../controllers/notesController.js';

const router = Router();

router.get('/notes', celebrate(getAllNotesSchema), getNotes);

router.get('/notes/:noteId', celebrate(noteIdSchema), getNoteById);

router.post('/notes', createNote);

router.delete('/notes/:noteId', celebrate(noteIdSchema), deleteNote);

router.patch('/notes/:noteId', celebrate(noteIdSchema), updateNote);

export default router;
