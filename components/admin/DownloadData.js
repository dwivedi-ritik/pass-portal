import React from 'react'
import Link from 'next/link'
export default function DownloadData(props) {
    return (
        <>
            <Link href={props.url ? props.url : "/api/gatepass/getExcelSheet"}>
                <button className='border rounded-lg text-xs mr-2 py-2 px-3 bg-white hover:text-indigo-600 hover:bg-gray-100'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-4 inline mr-2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                    </svg>
                    Download CSV
                </button>
            </Link>
        </>
    )
}