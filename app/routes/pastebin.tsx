import { isRouteErrorResponse, useNavigate, useRouteError } from "@remix-run/react";
import { useEffect } from "react";
import { Main } from "~/shared/components/MainLayout";


export default function Index() {
    const navigate = useNavigate()
    useEffect(() => {
        //navigate("/pastebin/new")
    }, [])

    return (
        <div className="flex flex-col h-screen items-stretch justify-center">
            <Main></Main>
        </div>
    )
}


