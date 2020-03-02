# axios-fp-ts

Example

```ts
import { toFuture } from 'axios-fp-ts/lib/future'
import { get } from 'axios-fp-ts/lib/client'
import * as t from 'io-ts'
import { expected } from 'axios-fp-ts/lib/expected'
import { fork } from 'fluture'

const program = toFuture(get('https://google.nl', expected(t.any)))

const log = fork(console.error)(console.log)

log(program)
```

