import * as E from 'fp-ts/lib/Either'
import * as O from 'fp-ts/lib/Option'
import { ParsedUrlQueryInput, stringify } from 'querystring'

export const GET = 'GET' as const

export const HEAD = 'HEAD' as const

export const POST = 'POST' as const

export const PUT = 'PUT' as const

export const DELETE = 'DELETE' as const

export const CONNECT = 'CONNECT' as const

export const OPTIONS = 'OPTIONS' as const

export const TRACE = 'TRACE' as const

export const PATCH = 'PATCH' as const

export type Method = typeof GET | typeof POST | typeof PUT | typeof PATCH | typeof OPTIONS | typeof HEAD

export type Expect<A> = (value: unknown) => E.Either<string, A>

export interface Request<A> {
  method: Method
  headers: { [key: string]: string }
  url: string
  body?: unknown
  expect: Expect<A>
  timeout: O.Option<number>
  withCredentials: boolean
}

export type Response<A> = {
  url: string
  status: {
    code: number
    message: string
  }
  headers: { [key: string]: string }
  body: A
}

export function get<A>(
  url: string,
  expect: Expect<A>,
  headers: {
    [key: string]: string
  } = {}
): Request<A> {
  return {
    method: 'GET',
    headers,
    url,
    body: undefined,
    expect,
    timeout: O.none,
    withCredentials: false
  }
}

export function post<a>(
  url: string,
  body: unknown,
  expect: Expect<a>,
  headers: {
    [key: string]: string
  } = {}
): Request<a> {
  return {
    method: 'POST',
    headers,
    url,
    body,
    expect,
    timeout: O.none,
    withCredentials: false
  }
}

export function patch<A>(
  url: string,
  body: unknown,
  expect: Expect<A>,
  headers: {
    [key: string]: string
  } = {}
): Request<A> {
  return {
    method: 'PATCH',
    headers,
    url,
    body,
    expect,
    timeout: O.none,
    withCredentials: false
  }
}

export function send<A>(
  url: string,
  body: ParsedUrlQueryInput,
  expect: Expect<A>,
  method: Method = POST,
  headers: {
    [key: string]: string
  } = {}
): Request<A> {
  return {
    method,
    headers: { ...headers, ...{ 'content-type': 'application/x-www-form-urlencoded' } },
    url,
    body: stringify(body),
    expect,
    timeout: O.none,
    withCredentials: false
  }
}
