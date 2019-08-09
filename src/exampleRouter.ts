import * as express from 'express';
import { getEnv } from './utils/getEnv';

const router = express.Router();

router.get('/callback/text-only', (req, res) => {
    return req.app.locals.pg.query('SELECT NOW() as now', (err, resp) => {
        if (err) {
            console.log('DISASTER!!');
            console.log(err.message);
        }
        return res.status(200).send({
            status: 'ok',
            timestamp: resp.rows[0],
        });
    });
});

router.get('/callback/with-values', (req, res) => {
    return req.app.locals.pg.query(
        'INSERT INTO example_table(foo, bar) VALUES ($1, $2) RETURNING *',
        ['bonjour', 'monde'],
        (err, result) => {
            if (err) {
                console.log('DISASTER!!');
                console.log(err.message);
            }
            return res.status(200).send({
                status: 'ok',
                result: result.rows[0],
            });
        }
    )
});

router.get('/callback/with-config-obj', (req, res) => {
    const query = {
        text: 'INSERT INTO example_table(foo, bar) VALUES ($1, $2) RETURNING *',
        values: ['hallo', 'welt']
    };
    return req.app.locals.pg.query(query, (err, result) => {
        if (err) {
            console.log('DISASTER!!');
            console.log(err.message);
        }
        return res.status(200).send({
            status: 'ok',
            result: result.rows[0],
        });
    });
});

router.get('/callback/prepared-stmt', (req, res) => {
    const query = {
        name: 'insert-greeting',
        text: 'INSERT INTO example_table(foo, bar) VALUES ($1, $2) RETURNING *',
        values: ['hola', 'mundo']
    };
    req.app.locals.pg.query(query, (err, result) => {
        if (err) {
            console.log('DISASTER!!');
            console.log(err.message);
        }
        res.status(200).send({
            status: 'ok',
            result: result.rows[0],
        });
    });
});

router.get('/promises/text-only', (req, res) => {
    return req.app.locals.pg
        .query('SELECT NOW() as now')
        .then(result =>
            res.status(200).send({ status: 'ok', timestamp: result.rows[0] })
        )
        .catch(err => {
            console.log('DISASTER!!');
            console.log(err.message);
        });
});

router.get('/promises/with-values', (req, res) => {
    return req.app.locals.pg
        .query(
            'INSERT INTO example_table(foo, bar) VALUES ($1, $2) RETURNING *',
            ['bonjour', 'monde'],
        )
        .then(result =>
            res.status(200).send({ status: 'ok', result: result.rows[0] })
        )
        .catch(err => {
            console.log('DISASTER!!');
            console.log(err.message);
        });
});

router.get('/promises/with-config-obj', (req, res) => {
    const query = {
        text: 'INSERT INTO example_table(foo, bar) VALUES ($1, $2) RETURNING *',
        values: ['hallo', 'welt']
    };
    return req.app.locals.pg
        .query(query)
        .then(result =>
            res.status(200).send({ status: 'ok', result: result.rows[0] })
        )
        .catch(err => {
            console.log('DISASTER!!');
            console.log(err.message);
        });
});

router.get('/promises/prepared-stmt', (req, res) => {
    const query = {
        name: 'insert-greeting',
        text: 'INSERT INTO example_table(foo, bar) VALUES ($1, $2) RETURNING *',
        values: ['hola', 'mundo']
    };
    return req.app.locals.pg
        .query(query)
        .then(result =>
            res.status(200).send({ status: 'ok', result: result.rows[0] })
        )
        .catch(err => {
            console.log('DISASTER!!');
            console.log(err.message);
        });
});

router.get('/async-await/text-only', async (req, res) => {
    try {
        await req.app.locals.pg.query('SELECT NOW() AS now')
    } catch (err) {
        console.log('DISASTER!!');
        console.log(err.message);
    }
    return res.status(200).send({
        status: 'ok',
    });
});

router.get('/async-await/with-values', async (req, res) => {
    let result;
    try {
        result = await req.app.locals.pg.query(
            'INSERT INTO example_table(foo, bar) VALUES ($1, $2) RETURNING *',
            ['bonjour', 'monde'],
        )
    } catch (err) {
        console.log('DISASTER!!');
        console.log(err.message);
    }
    return res.status(200).send({
        status: 'ok',
        result: result && result.rows && result.rows[0]
    });
});

router.get('/async-await/with-config-obj', async (req, res) => {
    const query = {
        text: 'INSERT INTO example_table(foo, bar) VALUES ($1, $2) RETURNING *',
        values: ['hallo', 'welt']
    };
    let result;
    try {
        result = await req.app.locals.pg.query(query)
    } catch (err) {
        console.log('DISASTER!!');
        console.log(err.message);
    }
    return res.status(200).send({
        status: 'ok',
        result: result && result.rows && result.rows[0]
    });
});

router.get('/async-await/prepared-stmt', async (req, res) => {
    const query = {
        name: 'insert-greeting',
        text: 'INSERT INTO example_table(foo, bar) VALUES ($1, $2) RETURNING *',
        values: ['hola', 'mundo']
    };
    let result;
    try {
        result = await req.app.locals.pg.query(query)
    } catch (err) {
        console.log('DISASTER!!');
        console.log(err.message);
    }
    return res.status(200).send({
        status: 'ok',
        result: result && result.rows && result.rows[0]
    });
});


export default router;
