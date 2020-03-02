import { AxiosResponse, AxiosError } from 'axios'
import * as O from 'fp-ts/lib/Option'
import { identity } from 'fp-ts/lib/function'
import { pipe } from 'fp-ts/lib/pipeable'
import { Request } from './client'
import { HttpError } from './error'
import { Future, chain, orElse, fromEither } from 'fp-ts-fluture/lib/Future'
import { attemptP } from 'fluture'
import * as ax from './axios'

export function toFuture<A>(req: Request<A>): Future<HttpError, A> {
  return pipe(
    attemptP<AxiosError, AxiosResponse<A>>(() =>
      ax.getPromiseAxiosResponse<A>({
        method: req.method,
        headers: req.headers,
        url: req.url,
        data: req.body,
        timeout: pipe(
          req.timeout,
          O.fold(() => undefined, identity)
        ),
        withCredentials: req.withCredentials
      })
    ),
    orElse(er => fromEither(ax.axiosErrorToEither(er))),
    chain(res => fromEither(ax.axiosResponseToEither(res, req.expect)))
  )
}
