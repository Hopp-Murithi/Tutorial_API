module.exports = class ApiError  {
  constructor(status, message) {
    this.status = status;
    this.message = message;
  }

  static badRequest(message) {
    return new ApiError(400, message);
  }

  static internalServerError(message) {
    return new ApiError(500, message);
  }

  static forbidden(message) {
    return new ApiError(403, message);
  }
  static notFound(message) {
    return new ApiError(404, message);
  }
}