// Mock API client mimicking standard REST HTTP requests with configurable latency
export const delay = (ms = 80) => new Promise(resolve => setTimeout(resolve, ms));

export class ApiError extends Error {
  constructor(message, status = 400, details = null) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.details = details;
  }
}

export const mockApiResponse = async (data, delayMs = 60) => {
  await delay(delayMs);
  return {
    success: true,
    data,
    timestamp: new Date().toISOString()
  };
};
