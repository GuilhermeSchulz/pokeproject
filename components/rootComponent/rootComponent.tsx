"use client"
import store from "@/store/redux"
import { Provider } from "react-redux"
import { Header } from "../header/header"
import { ToastContainer } from "react-toastify"

export default function RootComponent({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <Provider store={store}>
                <Header />
                {children}
                <ToastContainer />
            </Provider>
        </>

    )
}