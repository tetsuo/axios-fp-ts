import * as http from '../src/Http'
import { fromType } from '../src'
import * as t from 'io-ts'
import { createServer } from 'http'
import { AddressInfo } from 'net'
import { equal, ok } from 'assert'
import * as E from 'fp-ts/lib/Either'

const server = createServer((req, res) => {
  equal(req.url, '/bla')
  res.end('x123')
})

server.listen(0, () => {
  const addressInfo = server.address() as AddressInfo
  http
    .toTask(http.get('http://localhost:' + addressInfo.port + '/bla', fromType(t.number)))()
    .then(e => {
      ok(E.isLeft(e))
      server.close()
    })
})
