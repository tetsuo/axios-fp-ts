import * as E from 'fp-ts/lib/Either'
import { Type, mixed as mixed_ } from 'io-ts'
import { failure } from 'io-ts/lib/PathReporter'
import { pipe } from 'fp-ts/lib/pipeable'

export type mixed = mixed_

export interface Decoder<a> {
  decode: (value: mixed) => E.Either<string, a>
}

export function decodeJSON<a>(decoder: Decoder<a>, value: mixed): E.Either<string, a> {
  return decoder.decode(value)
}

export function map<a, b>(fa: Decoder<a>, f: (a: a) => b): Decoder<b> {
  return {
    decode: value => E.map(f)(fa.decode(value))
  }
}

export function fromType<a>(type: Type<a, any, mixed>): Decoder<a> {
  return {
    decode: value =>
      pipe(
        type.decode(value),
        E.mapLeft(errors => failure(errors).join('\n'))
      )
  }
}
