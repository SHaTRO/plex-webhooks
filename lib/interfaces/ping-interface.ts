
/** PingResponse api response interface, serializable */
export interface PingResponse {
  name: string;     // server name
  version: string;  // server version
  runtime: number;  // time since app was initialized (run) in microseconds
}
