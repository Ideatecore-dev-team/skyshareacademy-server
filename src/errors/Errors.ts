/**
 * Base class for HTTP exceptions, inspired by NestJS.
 */

export type ErrorDetail = Record<string, string[]> | string | null;

export class HttpException extends Error {
  public status: number;
  public errors?: ErrorDetail;

  /**
   * Creates an instance of HttpException.
   * @param status - The HTTP status code.
   * @param message - The error message.
   * @param errors - Optional additional error details.
   */

  constructor(status: number, message: string, errors?: ErrorDetail) {
    super(message);
    this.status = status;
    this.errors = errors;
    Error.captureStackTrace(this, this.constructor);
  }

  /**
   * Serializes the exception into a plain object for logging or response.
   * @returns An object containing status, message, and errors.
   */
  toJSON(): {
    status: number;
    message: string;
    errors: ErrorDetail;
  } {
    return {
      status: this.status,
      message: this.message,
      errors: this.errors ?? null,
    };
  }
}

/**
 * Exception for HTTP 400 Bad Request.
 */
export class BadRequestException extends HttpException {
  /**
   * Creates an instance of BadRequestException.
   * @param message - The error message. Defaults to "Bad Request".
   * @param errors - Optional validation errors or additional details.
   */

  constructor(message = "Bad Request", errors?: ErrorDetail) {
    super(400, message, errors);
  }
}

/**
 * Exception for HTTP 409 Conflict.
 */
export class ConflictException extends HttpException {
  /**
   * Creates an instance of ConflictException.
   * @param message - The specific conflict message (required).
   */
  constructor(message: string) {
    super(409, message);
  }
}

/**
 * Exception for HTTP 403 Forbidden.
 */
export class ForbiddenException extends HttpException {
  /**
   * Creates an instance of ForbiddenException.
   * @param message - The error message. Defaults to "Forbidden".
   */
  constructor(message = "Forbidden") {
    super(403, message);
  }
}

/**
 * Exception for HTTP 404 Not Found.
 */
export class NotFoundException extends HttpException {
  /**
   * Creates an instance of NotFoundException.
   * @param message - The error message. Defaults to "Not Found".
   */
  constructor(message = "Not Found") {
    super(404, message);
  }
}

/**
 * Exception for HTTP 401 Unauthorized.
 */
export class UnauthorizedException extends HttpException {
  /**
   * Creates an instance of UnauthorizedException.
   * @param message - The error message. Defaults to "Unauthorized".
   */
  constructor(message = "Unauthorized") {
    super(401, message);
  }
}
