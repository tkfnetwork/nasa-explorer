import { ReasonPhrases, StatusCodes } from 'http-status-codes';

export class StatusError extends Error {
  public constructor(
    public statusCode: StatusCodes,
    message?: unknown
  ) {
    super(typeof message === 'string' ? message : undefined);
  }
}

export class NotFoundError extends StatusError {
  public constructor(message: string = ReasonPhrases.NOT_FOUND) {
    super(StatusCodes.NOT_FOUND, message);
  }
}

export class InternalServerError extends StatusError {
  public constructor(message: string = ReasonPhrases.INTERNAL_SERVER_ERROR) {
    super(StatusCodes.INTERNAL_SERVER_ERROR, message);
  }
}

export class BadRequestError extends StatusError {
  public constructor(message: string = ReasonPhrases.BAD_REQUEST) {
    super(StatusCodes.BAD_REQUEST, message);
  }
}

export class NotImplementedError extends StatusError {
  public constructor(message: string = ReasonPhrases.NOT_IMPLEMENTED) {
    super(StatusCodes.NOT_IMPLEMENTED, message);
  }
}

export class UnauthorizedError extends StatusError {
  public constructor(message: string = ReasonPhrases.UNAUTHORIZED) {
    super(StatusCodes.UNAUTHORIZED, message);
  }
}
