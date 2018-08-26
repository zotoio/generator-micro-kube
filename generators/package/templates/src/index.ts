'use strict';

import 'source-map-support/register';
//import * as AWS from 'aws-sdk';
import * as bunyan from 'bunyan';
import * as express from 'express'
let log = bunyan.createLogger({name: '<%= name %>'});

const app = express();

app.get('/', (req, res) => {
    res.send('response from <%= name %>')
});

app.listen(8088, () => {
    log.info('app listening on port 8088')
});

