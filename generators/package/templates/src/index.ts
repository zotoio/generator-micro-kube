'use strict';

import 'source-map-support/register';
import * as bunyan from 'bunyan';
import * as express from 'express';
// import * as AWS from 'aws-sdk';
// import * as json from 'format-json';

const log = bunyan.createLogger({ name: '<%= name %>' });
const app = express();
const port = process.env.SVC_PORT || 8088;

app.get('/', (req: any, res: any) => {
    log.info(req.headers);
    res.json({ message: 'response from <%= name %>' });
});

app.listen(port, () => {
    log.info(`app listening on port ${port}`);
});
