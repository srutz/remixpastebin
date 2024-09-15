"use client"

import { EventBus } from './EventBus'
import { CSSProperties, useEffect, useRef, useState } from "react"

/*
 * A Toast (notification) component that listens to notification events
 * A toast is a small message that pops up on the screen to provide feedback to the user.
 */

/* 
 * notification type
 */
export type Notification = {
    message: string,
}

export const EVENTKEY_NOTIFICATION = "notification"

export function notify(notification: Notification) {
    EventBus.instance.emit(EVENTKEY_NOTIFICATION, notification)
}

/*
 * Place one instanceof notification handler in your application react tree
 * to show notifications as toasts.
 */
export function NotificationToast() {
    const [ message, setMessage ] = useState("")
    const [ visible, setVisible ] = useState(false)
    const toastRef = useRef<HTMLDivElement>(null) // a handle to the main div of this component
    /* hide the toast after a while */
    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false)
        }, 2_500);
        return () => {
            clearTimeout(timer)
        }
    })

    /* react to notification events */
    useEffect(() => {
        const listener = (notification: Notification) => {
            setMessage(notification.message)
            setVisible(true)
        }
        EventBus.instance.on(EVENTKEY_NOTIFICATION, listener);
        return () => {
            EventBus.instance.off(EVENTKEY_NOTIFICATION, listener);
        }
    })
    if (!visible) {
    }

    const style: CSSProperties = {
        opacity: visible ? "1" : "0",
        bottom: visible ? "0px" : "-100px",
    }
    return (
        <div ref={toastRef} className="notificationtoast" onClick={() => setVisible(false) } style={style}>
            <div className="flex flex-row gap-2 items-center">
                {message}
            </div>
        </div>
    )
}
