import { Outlet, useLocation, useNavigate } from "@remix-run/react"
import { ReactNode } from "react"
import { NotificationToast } from "./NotificationToast"


export type MenuItemType = { label: string, pathname: string, }


export function SidebarMenuItem({ label, pathname }: MenuItemType) {
    const navigate = useNavigate()
    const location = useLocation()
    const active = location.pathname == pathname
    return (
        <div onClick={() => navigate(pathname)} className={`cursor-pointer select-none hover:underline my-1 px-2 py-1 pr-1 text-[length:14px] ${active ? "rounded bg-gray-200 rounded-md" : ""}`}>
            {label}
        </div>
    )
}

export function SidebarMenu({ title, items }: { title: string, items: MenuItemType[] }) {
    return (
        <div className="border-r border-gray-100 bg-gray-50 p-4">
            <div className="flex items-center text-green-700">
                <div className="font-extrabold text-base">{title}</div>
            </div>
            <div className="h-7"></div>
            <div className="font-bold text-gray-800 min-w-40">
                {items.map((item, index) => <SidebarMenuItem key={index} {...item} />)}
            </div>
        </div>
    )
}

export function Titlebar({ children }: { children: ReactNode }) {
    return (
        <div className="select-none flex w-2/3 items-center rounded-md bg-gray-600 text-gray-100 justify-center text-sm px-3 py-1">
            {children}
        </div>
    )
}


export function Main() {
    const { pathname } = useLocation()
    const menuItems: MenuItemType[] = [
        { label: "New Paste", pathname: "/pastebin/new" },
        { label: "About", pathname: "/pastebin/about" },
    ]
    return (
        <div className="bg-black shrink grow h-1 flex flex-col gap-4 items-center">
            <div className="grow overflow-hidden rounded bg-gray-700 shadow-md flex flex-col w-full ">
                <div className="flex items-center justify-center px-2 pt-2">
                    <Titlebar>Remixpastebin</Titlebar>
                </div>
                <div className="flex grow overflow-hidden bg-white text-gray-600 rounded-lg mx-4 mb-4 mt-2">
                    <SidebarMenu title="😎 Pastebin" items={menuItems} />
                    <Outlet></Outlet>
                </div>
                <NotificationToast></NotificationToast>
            </div>
        </div>
    )
}