
import { MulterFiles, PlexHandler, PlexHandlerFunction } from '..';

interface PlexHandlerMap {
  [ event: string ]: PlexHandler[];
}

/** 
 * Dispatcher class for registering and dispatching PlexHandlerFunction. 
 */
export class PlexDispatcher {
  static singleton: PlexDispatcher;
  handlers: PlexHandlerMap;

  /** Access method to obtain the plex handler dispatcher. */
  static getInstance(): PlexDispatcher {
    if (!this.singleton) {
      this.singleton = new PlexDispatcher();
    }
    return this.singleton;
  }

  static registerHandler(event: string, handlerFunc: PlexHandlerFunction): void {
    return this.getInstance().register(event, handlerFunc);
  }

  private constructor() {
    this.handlers = {};
  }

  /**
   * Register a plex handler function to a particular event.
   * @param event the plex event to which we attach this handlerFund
   * @param handlerFunc the PlexHandlerFunction to register to the event
   */
  register(event: string, handlerFunc: PlexHandlerFunction): void {
    (this.handlers[event] = this.handlers[event] || []).push(new PlexHandler(handlerFunc));
  }

  /** 
   * Dispatch all the PlexHandlerFunction registered to the event contained in the payload.
   * @param payload the payload to the PlexHandlerFunction
   * @param files the MulterFiles for any uploaded files attached to the request being processed.
   */
  async dispatch(payload: any, files: MulterFiles): Promise<void> {
    const event = payload.event;
    const eventHandlers: PlexHandler[] = this.handlers[event] || [];
    const wildcardHandlers: PlexHandler[] = this.handlers['*'] || [];
    const handlers = [ ...eventHandlers, ...wildcardHandlers ];
    if (handlers.length > 0) {
      await Promise.all(handlers.map( (handler) => handler.execute(payload, files) ));
    }
    return;
  }

}
