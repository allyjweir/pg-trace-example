import * as express from 'express';
import { getEnv } from './utils/getEnv';

const router = express.Router();

router.get('/', async (req, res) => {
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

router.get('/callback/text-only');
router.get('/callback/with-values');
router.get('/callback/with-config-obj');
router.get('/callback/prepared-stmt');
router.get('/promises/text-only');
router.get('/promises/with-values');
router.get('/promises/with-config-obj');
router.get('/promises/prepared-stmt');
router.get('/async-await/text-only');
router.get('/async-await/with-values');
router.get('/async-await/with-config-obj');
router.get('/async-await/prepared-stmt');

export default router;
