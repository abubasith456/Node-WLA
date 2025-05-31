import mongoose from 'mongoose';
import ResponseUtil from './ResponseUtil.js';

export const validateObjectId = (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.userId)) {
        return ResponseUtil.error(res, "Invalid user ID format", 400);
    }
    next();
};
