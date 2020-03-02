import { Response } from './client'

export const Timeout = { _tag: 'Timeout' } as const

export interface BadUrl {
  _tag: 'BadUrl'
  value: string
}

export interface NetworkError {
  _tag: 'NetworkError'
  value: string
}

export interface BadPayload {
  _tag: 'BadPayload'
  value: string
  response: Response<string>
}

export interface BadStatus {
  _tag: 'BadStatus'
  response: Response<string>
}

export type HttpError = BadUrl | typeof Timeout | NetworkError | BadStatus | BadPayload | BadStatus

export function badUrl(value: string): BadUrl {
  return { _tag: 'BadUrl', value }
}

export function networkError(value: string): NetworkError {
  return { _tag: 'NetworkError', value }
}

export function badPayload(value: string, response: Response<string>): BadPayload {
  return { _tag: 'BadPayload', response, value }
}

export function badStatus(response: Response<string>): BadStatus {
  return { _tag: 'BadStatus', response }
}
