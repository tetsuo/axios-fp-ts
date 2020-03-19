import { fromEither } from "@devexperts/remote-data-ts";
import * as T from "fp-ts/lib/Task";
import { flow } from "fp-ts/lib/function";
import { toTaskEither } from "./taskEither";
import { Task } from "fp-ts/lib/Task";
import { Request } from "./client";
import { RemoteData } from "@devexperts/remote-data-ts";
import { HttpError } from "./error";

export const toRemoteData: <A>(
  req: Request<A>
) => Task<RemoteData<HttpError, A>> = flow(toTaskEither, T.map(fromEither));
