import express from 'express';

export const init = async () => {
    const app = express();

    app.listen(3000, () => {
        console.log('Trpc server listening on port 3000');
    });
};
