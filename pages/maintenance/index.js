import { useRef, useState } from "react"
import Head from "next/head"
import Spinner from "../../components/Spinner"

import NavBar from "../../components/NavBar"
import MaintenanceModal from "../../components/maitenance/MaintenanceModal"

export default function MaintenanceForm(props) {
    let [modalData, setModalData] = useState({})
    let [showModal, setShowModal] = useState(false)
    let [showSpinner, setShowSpinner] = useState(false)

    let title = useRef(null)
    let mobileNo = useRef(null)
    let maintenanceType = useRef(null)
    let requiredPerson = useRef(null)
    let description = useRef(null)
    let roomNo = useRef(null)

    const handleSubmitEvent = (e) => { //TODOs
        e.preventDefault()
        const postBody = {
            title: title.current.value,
            mobileNo: mobileNo.current.value,
            maintenanceType: maintenanceType.current.value,
            requiredPerson: requiredPerson.current.value,
            description: description.current.value,
            roomNo: roomNo.current.value
        }
        setShowSpinner(true)
        fetch('/api/maintenance/add',
            {
                method: 'POST',
                body: JSON.stringify(postBody)
            })
            .then(async res => {
                setShowSpinner(false)
                const data = await res.json()
                setShowSpinner(false)
                setModalData(data)
                setShowModal(true)
            })
            .catch(err => console.log(err))
    }
    return (
        <>
            <Head>
                <title>Upkeep request</title>
                <meta name="description" content="HTML meta tags are a cornerstone of coding. But which are the most essential? We give you a rundown of all the meta tags you need to know.">
                </meta>
            </Head>
            <NavBar />
            {showSpinner && <Spinner />}
            {showModal && <MaintenanceModal data={modalData} setShowModal={setShowModal} />}
            <div className="flex justify-center mb-5">
                <form className="w-full max-w-lg mx-5 sm:mx-0" onSubmit={handleSubmitEvent}>
                    <p className="block uppercase my-7 tracking-wide text-gray-700 text-md font-bold">Maintenance Details</p>
                    <div className="-mx-3 my-4">
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                                Maintenance title
                            </label>
                            <input ref={title} className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-indigo-600 " type="text" placeholder="Title" required></input>
                        </div>
                        <div className="w-full  px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                                Mobile No
                            </label>
                            <input ref={mobileNo} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-indigo-600" type="number" placeholder="Mobile No"></input>
                        </div>
                        <div className="w-full px-3 mt-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                                Room No
                            </label>
                            <input ref={roomNo} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-indigo-600" type="number" placeholder="Room No"></input>
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3">
                        <div className="w-full  px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                                Maintenance Type
                            </label>
                            <div className="relative">
                                <select ref={maintenanceType} className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-400 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-indigo-600" id="grid-state">
                                    <option>Room</option>
                                    <option>Floor</option>
                                    <option>Balcony</option>
                                    <option>Gallery</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                </div>
                            </div>
                        </div>
                        <div className="w-full px-3 mt-2">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                                Required person
                            </label>
                            <div className="relative">
                                <select ref={requiredPerson} className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-400 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-indigo-600" id="grid-state">
                                    <option>Electrician</option>
                                    <option>Carpententer</option>
                                    <option>Plumber</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mt-3">
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                                Description
                            </label>
                            <textarea ref={description} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-indigo-600" placeholder="Write the description"></textarea>
                        </div>
                    </div>
                    <div className='mt-3 flex justify-between items-center gap-3'>
                        <div className='flex  items-center gap-1'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-indigo-700 rounded-lg">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                            </svg>
                            <a className='text-indigo-600 tracking-wide text-xs'>Back to home</a>
                        </div>
                        <button className="bg-transparent hover:bg-indigo-700 text-indigo-700 font-semibold hover:text-white py-2 px-4 border border-indigo-500 hover:border-transparent rounded" type='submit' >
                            Request Maintence
                        </button>
                    </div>
                </form>
            </div>
        </>

    )
}