import type { MetaFunction } from "@remix-run/node"
import { isRouteErrorResponse, useNavigate, useRouteError } from "@remix-run/react"
import { useEffect } from "react"

export const meta: MetaFunction = () => {
    return [
        { title: "Pastebin App" },
        { name: "description", content: "Pastebin!" },
    ]
}


export default function Index() {
    const navigate = useNavigate()
    useEffect(() => {
        navigate("/pastebin/new")
    }, [])
    return (
        <div></div>
    )
}


