class FileSizeError extends Error {
    constructor(message) {
        super(message);
        this.name = 'FileSizeError';
        this.statusCode = 413;
    }
}

const errorHandler = (err, req, res, next) => {
    console.error('Error:', err);

    if (err instanceof FileSizeError) {
        return res.status(err.statusCode).json({
            status: 'error',
            message: err.message
        });
    }

    if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(413).json({
                status: 'error',
                message: 'File size too large. Maximum size is 5MB'
            });
        }
        return res.status(400).json({
            status: 'error',
            message: err.message
        });
    }

    res.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
};

export { FileSizeError, errorHandler };
