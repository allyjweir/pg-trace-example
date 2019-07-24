import * as express from 'express';
import { getEnv } from './utils/getEnv';

const router = express.Router();

router.route('/')
    .get(async (req, res) => {
        try {
            // A query that serves as an example which has query_args.
            await req.app.locals.pg.query(
                'INSERT INTO example_table(foo, bar) VALUES ($1, $2) RETURNING foo',
                ['hello', 'world'],
            );
        } catch (err) {
            console.log('DISASTER!!');
        }
        res.status(200).send({
            status: 'ok',
        });
    });
export default router;
