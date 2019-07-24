# pg-trace

Example application to test prospective `pg` instrumentation for beeline-nodejs

Minimum example to accompany [beeline-nodejs PR#155](https://github.com/honeycombio/beeline-nodejs/pull/155).

## How to test

Note, requires nvm, yarn/npm and postgres running locally

### Configure beeline-nodejs

_Should_ be able to switch out any call to yarn with npm if required.

1. Clone beeline-nodejs and checkout `instrument-pg` branch
2. Run `yarn install` in the beeline-nodejs folder
3. Run `yarn link` within the beeline-nodejs folder

### Using the test project to test the pg instrumentation
1. Navigate to the `pg-trace-example` folder
2. Run `./bin/setup.sh`
3. Update the `HONEYCOMB_ENABLED`, `HONEYCOMB_WRITE_KEY` and `HONEYCOMB_DATASET` values in `.env` to configure honeycomb
4. Update the `DB_*` values in `.env` to match your local postgres server's config.
5. Run `yarn link beeline-nodejs` to link with local modified version of beeline-nodejs.
6. Run `DEBUG=honeycomb-beeline:* yarn start` to start service locally
7. Run `curl localhost:8080/example` in a new terminal to trigger the test

The postgres query is being made from `src/exampleRouter.ts`. You should be able to tweak the query to see failure states and what gets sent with them, as opposed to when you have a successful query.