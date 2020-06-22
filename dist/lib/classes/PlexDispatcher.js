"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlexDispatcher = void 0;
const __1 = require("..");
/**
 * Dispatcher class for registering and dispatching PlexHandlerFunction.
 */
class PlexDispatcher {
    constructor() {
        this.handlers = {};
    }
    /** Access method to obtain the plex handler dispatcher. */
    static getInstance() {
        if (!this.singleton) {
            this.singleton = new PlexDispatcher();
        }
        return this.singleton;
    }
    static registerHandler(event, handlerFunc) {
        return this.getInstance().register(event, handlerFunc);
    }
    /**
     * Register a plex handler function to a particular event.
     * @param event the plex event to which we attach this handlerFund
     * @param handlerFunc the PlexHandlerFunction to register to the event
     */
    register(event, handlerFunc) {
        (this.handlers[event] = this.handlers[event] || []).push(new __1.PlexHandler(handlerFunc));
    }
    /**
     * Dispatch all the PlexHandlerFunction registered to the event contained in the payload.
     * @param payload the payload to the PlexHandlerFunction
     * @param files the MulterFiles for any uploaded files attached to the request being processed.
     */
    async dispatch(payload, files) {
        const event = payload.event;
        const eventHandlers = this.handlers[event] || [];
        const wildcardHandlers = this.handlers['*'] || [];
        const handlers = [...eventHandlers, ...wildcardHandlers];
        if (handlers.length > 0) {
            await Promise.all(handlers.map((handler) => handler.execute(payload, files)));
        }
        return;
    }
}
exports.PlexDispatcher = PlexDispatcher;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGxleERpc3BhdGNoZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvY2xhc3Nlcy9QbGV4RGlzcGF0Y2hlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSwwQkFBbUU7QUFNbkU7O0dBRUc7QUFDSCxNQUFhLGNBQWM7SUFnQnpCO1FBQ0UsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQWRELDJEQUEyRDtJQUMzRCxNQUFNLENBQUMsV0FBVztRQUNoQixJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNuQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksY0FBYyxFQUFFLENBQUM7U0FDdkM7UUFDRCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDeEIsQ0FBQztJQUVELE1BQU0sQ0FBQyxlQUFlLENBQUMsS0FBYSxFQUFFLFdBQWdDO1FBQ3BFLE9BQU8sSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsV0FBVyxDQUFDLENBQUM7SUFDekQsQ0FBQztJQU1EOzs7O09BSUc7SUFDSCxRQUFRLENBQUMsS0FBYSxFQUFFLFdBQWdDO1FBQ3RELENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLGVBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO0lBQ3pGLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsS0FBSyxDQUFDLFFBQVEsQ0FBQyxPQUFZLEVBQUUsS0FBa0I7UUFDN0MsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQztRQUM1QixNQUFNLGFBQWEsR0FBa0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDaEUsTUFBTSxnQkFBZ0IsR0FBa0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDakUsTUFBTSxRQUFRLEdBQUcsQ0FBRSxHQUFHLGFBQWEsRUFBRSxHQUFHLGdCQUFnQixDQUFFLENBQUM7UUFDM0QsSUFBSSxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUN2QixNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBRSxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUUsQ0FBQyxDQUFDO1NBQ2pGO1FBQ0QsT0FBTztJQUNULENBQUM7Q0FFRjtBQTdDRCx3Q0E2Q0MiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB7IE11bHRlckZpbGVzLCBQbGV4SGFuZGxlciwgUGxleEhhbmRsZXJGdW5jdGlvbiB9IGZyb20gJy4uJztcblxuaW50ZXJmYWNlIFBsZXhIYW5kbGVyTWFwIHtcbiAgWyBldmVudDogc3RyaW5nIF06IFBsZXhIYW5kbGVyW107XG59XG5cbi8qKiBcbiAqIERpc3BhdGNoZXIgY2xhc3MgZm9yIHJlZ2lzdGVyaW5nIGFuZCBkaXNwYXRjaGluZyBQbGV4SGFuZGxlckZ1bmN0aW9uLiBcbiAqL1xuZXhwb3J0IGNsYXNzIFBsZXhEaXNwYXRjaGVyIHtcbiAgc3RhdGljIHNpbmdsZXRvbjogUGxleERpc3BhdGNoZXI7XG4gIGhhbmRsZXJzOiBQbGV4SGFuZGxlck1hcDtcblxuICAvKiogQWNjZXNzIG1ldGhvZCB0byBvYnRhaW4gdGhlIHBsZXggaGFuZGxlciBkaXNwYXRjaGVyLiAqL1xuICBzdGF0aWMgZ2V0SW5zdGFuY2UoKTogUGxleERpc3BhdGNoZXIge1xuICAgIGlmICghdGhpcy5zaW5nbGV0b24pIHtcbiAgICAgIHRoaXMuc2luZ2xldG9uID0gbmV3IFBsZXhEaXNwYXRjaGVyKCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnNpbmdsZXRvbjtcbiAgfVxuXG4gIHN0YXRpYyByZWdpc3RlckhhbmRsZXIoZXZlbnQ6IHN0cmluZywgaGFuZGxlckZ1bmM6IFBsZXhIYW5kbGVyRnVuY3Rpb24pOiB2b2lkIHtcbiAgICByZXR1cm4gdGhpcy5nZXRJbnN0YW5jZSgpLnJlZ2lzdGVyKGV2ZW50LCBoYW5kbGVyRnVuYyk7XG4gIH1cblxuICBwcml2YXRlIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuaGFuZGxlcnMgPSB7fTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWdpc3RlciBhIHBsZXggaGFuZGxlciBmdW5jdGlvbiB0byBhIHBhcnRpY3VsYXIgZXZlbnQuXG4gICAqIEBwYXJhbSBldmVudCB0aGUgcGxleCBldmVudCB0byB3aGljaCB3ZSBhdHRhY2ggdGhpcyBoYW5kbGVyRnVuZFxuICAgKiBAcGFyYW0gaGFuZGxlckZ1bmMgdGhlIFBsZXhIYW5kbGVyRnVuY3Rpb24gdG8gcmVnaXN0ZXIgdG8gdGhlIGV2ZW50XG4gICAqL1xuICByZWdpc3RlcihldmVudDogc3RyaW5nLCBoYW5kbGVyRnVuYzogUGxleEhhbmRsZXJGdW5jdGlvbik6IHZvaWQge1xuICAgICh0aGlzLmhhbmRsZXJzW2V2ZW50XSA9IHRoaXMuaGFuZGxlcnNbZXZlbnRdIHx8IFtdKS5wdXNoKG5ldyBQbGV4SGFuZGxlcihoYW5kbGVyRnVuYykpO1xuICB9XG5cbiAgLyoqIFxuICAgKiBEaXNwYXRjaCBhbGwgdGhlIFBsZXhIYW5kbGVyRnVuY3Rpb24gcmVnaXN0ZXJlZCB0byB0aGUgZXZlbnQgY29udGFpbmVkIGluIHRoZSBwYXlsb2FkLlxuICAgKiBAcGFyYW0gcGF5bG9hZCB0aGUgcGF5bG9hZCB0byB0aGUgUGxleEhhbmRsZXJGdW5jdGlvblxuICAgKiBAcGFyYW0gZmlsZXMgdGhlIE11bHRlckZpbGVzIGZvciBhbnkgdXBsb2FkZWQgZmlsZXMgYXR0YWNoZWQgdG8gdGhlIHJlcXVlc3QgYmVpbmcgcHJvY2Vzc2VkLlxuICAgKi9cbiAgYXN5bmMgZGlzcGF0Y2gocGF5bG9hZDogYW55LCBmaWxlczogTXVsdGVyRmlsZXMpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBldmVudCA9IHBheWxvYWQuZXZlbnQ7XG4gICAgY29uc3QgZXZlbnRIYW5kbGVyczogUGxleEhhbmRsZXJbXSA9IHRoaXMuaGFuZGxlcnNbZXZlbnRdIHx8IFtdO1xuICAgIGNvbnN0IHdpbGRjYXJkSGFuZGxlcnM6IFBsZXhIYW5kbGVyW10gPSB0aGlzLmhhbmRsZXJzWycqJ10gfHwgW107XG4gICAgY29uc3QgaGFuZGxlcnMgPSBbIC4uLmV2ZW50SGFuZGxlcnMsIC4uLndpbGRjYXJkSGFuZGxlcnMgXTtcbiAgICBpZiAoaGFuZGxlcnMubGVuZ3RoID4gMCkge1xuICAgICAgYXdhaXQgUHJvbWlzZS5hbGwoaGFuZGxlcnMubWFwKCAoaGFuZGxlcikgPT4gaGFuZGxlci5leGVjdXRlKHBheWxvYWQsIGZpbGVzKSApKTtcbiAgICB9XG4gICAgcmV0dXJuO1xuICB9XG5cbn1cbiJdfQ==