import React, { useEffect } from "react";

export default function SideNav(props) {
    useEffect(() => {
        const { elName } = props
        console.log(elName)
        const el = document.querySelector(`.${elName}`)
        el.classList.add("border-l-4")
        el.classList.add("bg-gray-700")

    }, [])
    return (

        <div className="side-nav w-1/4 h-screen max-h-auto bg-gray-800 md:w-1/6">
            <div className="flex justify-center pt-3">
                <p className="font-bold uppercase text-gray-300">Admin Portal</p>
            </div>
            <div className="sidenav flex flex-col items-center">
                <div className="mt-8 flex h-12 w-full items-center justify-start gap-3 overviews hover:bg-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" className="ml-3 h-4 w-4 text-gray-400">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
                    <a className="font-medium text-gray-400 cursor-pointer" href="/admin/">Overview</a>

                </div>
                <div className="mt-1 flex h-12 w-full items-center justify-start gap-3 pendings hover:bg-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" className="ml-3 h-4 w-4 text-gray-400">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                    </svg>

                    <a className="font-medium text-gray-400 cursor-pointer" href="/admin/pendings">Pending</a>
                </div>
                <div className="mt-1 flex h-12 w-full items-center justify-start gap-3 approveds hover:bg-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" className="ml-3 h-4 w-4 text-gray-400">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>

                    <a className="font-medium text-gray-400 cursor-pointer" href="/admin/approveds">Approved</a>
                </div>
                <div className="mt-1 flex h-12 w-full items-center justify-start gap-3 rejecteds hover:bg-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" className="ml-3 h-4 w-4 text-gray-400">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>

                    <a className="font-medium text-gray-400 cursor-pointer" href="/admin/rejecteds">Rejected</a>
                </div>
                <div className="flex mt-12 h-12 w-full items-center justify-start gap-3 hover:bg-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" className="ml-3 h-4 w-4 text-gray-400">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                    </svg>

                    <a className="font-medium text-gray-400 cursor-pointer ">Logout</a>
                </div>
            </div>
        </div>




    )
}