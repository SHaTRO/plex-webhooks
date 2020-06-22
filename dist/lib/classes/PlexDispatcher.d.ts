import { MulterFiles, PlexHandler, PlexHandlerFunction } from '..';
interface PlexHandlerMap {
    [event: string]: PlexHandler[];
}
/**
 * Dispatcher class for registering and dispatching PlexHandlerFunction.
 */
export declare class PlexDispatcher {
    static singleton: PlexDispatcher;
    handlers: PlexHandlerMap;
    /** Access method to obtain the plex handler dispatcher. */
    static getInstance(): PlexDispatcher;
    static registerHandler(event: string, handlerFunc: PlexHandlerFunction): void;
    private constructor();
    /**
     * Register a plex handler function to a particular event.
     * @param event the plex event to which we attach this handlerFund
     * @param handlerFunc the PlexHandlerFunction to register to the event
     */
    register(event: string, handlerFunc: PlexHandlerFunction): void;
    /**
     * Dispatch all the PlexHandlerFunction registered to the event contained in the payload.
     * @param payload the payload to the PlexHandlerFunction
     * @param files the MulterFiles for any uploaded files attached to the request being processed.
     */
    dispatch(payload: any, files: MulterFiles): Promise<void>;
}
export {};
