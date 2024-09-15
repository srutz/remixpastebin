
import { RefObject, useEffect, useState } from 'react'

/**
 * hook onto the size on an element.
 */
export function useResizeObserver(ref: RefObject<HTMLElement>) {
    const [size, setSize] = useState({ 
        width: ref.current?.offsetWidth ?? 0,
        height: ref.current?.offsetHeight ?? 0,
    })
    useEffect(() => {
        if (!ref.current) {
            return
        }
        const handleResize = () => {
            if (ref.current) {
                setSize({
                    width: ref.current.offsetWidth,
                    height: ref.current.offsetHeight
                })
            }
        }
        const observer = new ResizeObserver(handleResize)
        observer.observe(ref.current)
        return () => observer.disconnect()
    }, [ref])
    return size;
}
