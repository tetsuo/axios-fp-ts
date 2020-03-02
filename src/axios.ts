import axios from 'axios'
import { AxiosResponse, AxiosRequestConfig, AxiosError } from 'axios'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/pipeable'
import { Response, Expect } from './client'
import { HttpError, badPayload, badUrl, badStatus, Timeout, networkError } from './error'

function axiosResponseToResponse(res: AxiosResponse): Response<string> {
  return {
    url: res.config.url!,
    status: {
      code: res.status,
      message: res.statusText
    },
    headers: res.headers,
    body: res.data
  }
}

export function axiosResponseToEither<a>(res: AxiosResponse, expect: Expect<a>): E.Either<HttpError, a> {
  return pipe(
    res.data,
    expect,
    E.mapLeft(errors => badPayload(errors, axiosResponseToResponse(res)))
  )
}

export function axiosErrorToEither<A>(e: AxiosError): E.Either<HttpError, A> {
  if (e.response != null) {
    const res = e.response
    switch (res.status) {
      case 404:
        return E.left(badUrl(res.config.url!))
      default:
        return E.left(badStatus(axiosResponseToResponse(res)))
    }
  }
  if (e.code === 'ECONNABORTED') {
    return E.left(Timeout)
  } else {
    return E.left(networkError(e.message))
  }
}

export function getPromiseAxiosResponse<A>(config: AxiosRequestConfig): Promise<AxiosResponse<A>> {
  return axios(config)
}
