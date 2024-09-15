import {
    isRouteErrorResponse,
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    useRouteError,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";

import "./tailwind.css"
import "./index.css"

export const links: LinksFunction = () => [

]

export function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <Meta />
                <Links />
            </head>
            <body>
                {children}
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    )
}

export default function App() {
    return <Outlet />
}


export function ErrorBoundary() {
    const error = useRouteError()
    if (isRouteErrorResponse(error)) {
        // error.status = 500
        // error.data = "Oh no! Something went wrong!"
    }
    console.error(error)
    return (
        <div>Error man</div>
    )
}

