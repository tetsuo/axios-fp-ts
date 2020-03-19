import { fromEither, RemoteData } from "@devexperts/remote-data-ts";
import { flow } from "fp-ts/lib/function";
import { Task } from "fp-ts/lib/Task";
import * as T from "fp-ts/lib/Task";

import { Request } from "./client";
import { HttpError } from "./error";
import { toTaskEither } from "./taskEither";

export const toRemoteData: <A>(
  req: Request<A>
) => Task<RemoteData<HttpError, A>> = flow(toTaskEither, T.map(fromEither));
