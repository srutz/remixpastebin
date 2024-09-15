/* (c) 2017 Stepan Rutz. All rights reserved. */
/*
 * A simple event bus that allows to emit events and register handlers for them.
 */

/*
 * optional type definition for an event handler.
 */
export type EventHandler = (arg: any) => void

/*
 * A simple event bus that allows to emit events and register handlers for them.
 * the syntax is similar to the one of the DOM event system.
 * for adding an event handler use the on method, for removing it use the off method.
 */
export class EventBus {

    static instance = new EventBus() // The singleton instance of the EventBus.
    private handlers = new Map<string,Array<EventHandler>>()

    /*
     * remove all event handlers from the event bus.
     */
    clear() {
        this.handlers.clear()
    }

    /*
     * emit an event with the given key and optional argument.
     * all handlers registered for the given event key will be called.
     */
    emit(eventKey: string, arg?: any) {
        const list = this.handlers.get(eventKey)
        if (list) {
            const copy = [...list]
            copy.forEach(handler => handler(arg))
        }
    }

    /*
     * add an event handler for the given event key.
     * If the handler is already registered, it will not be added again.
     */
    on(eventKey: string, eventHandler: EventHandler) {
        let list = this.handlers.get(eventKey)
        if (!list) {
            this.handlers.set(eventKey, list = new Array<EventHandler>())
        }
        if (list.indexOf(eventHandler) == -1) {
            list.push(eventHandler)
        }
        return this
    }

    /*
     * remove one or all event handlers for the given event key.
     * If no event handler is given, all handlers for the given event key are removed.
     */
    off(eventKey: string, eventHandler?: EventHandler) {
        const list = this.handlers.get(eventKey)
        if (list) {
            if (eventHandler) {
                const index = list.indexOf(eventHandler)
                if (index != -1) {
                    list.splice(index, 1)
                    if (list.length == 0) {
                        this.handlers.delete(eventKey)
                    }
                }
            } else {
                this.handlers.delete(eventKey)
            }
        }
        return this
    }
}

