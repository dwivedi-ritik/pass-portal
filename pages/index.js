import Head from 'next/head'
import { useEffect, useRef, useState } from 'react'

import Modal from '../components/Modal.js'
import Spinner from '../components/Spinner.js'
import NavBar from '../components/NavBar.js'
import { dateParser, createToken, urlBase64ToUint8Array } from '../utils/helper.js'
import { gatePassStatus, VAPID_PUBLIC_KEY } from '../utils/constants.js'

import { mailTemplateForNotification, mailTextForNotification } from '../utils/mailTemplates.js'

const handleMailingForNotification = async (tokenId, receiver) => {
  const mailBody = mailTextForNotification(tokenId)
  const mailHeader = mailTemplateForNotification(mailBody, receiver)

  fetch('/api/gatepass/sendMail', {
    method: 'POST',
    body: JSON.stringify(mailHeader)
  })
    .then(res => res.json())
    .then(console.log)
}


export default function Home() {

  const subscriptionRef = useRef(null)

  //Service worker registration
  // useEffect(() => {
  //   (async () => {
  const emitNotification = async () => {
    try {
      if ('serviceWorker' in navigator) {
        const register = await navigator.serviceWorker.register('worker.js', {
          scope: '/'
        });

        const subscription = await register.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY)
        });
        subscriptionRef.current = subscription
      }
    } catch (e) {
      console.log(e)
    }
  }

  // })();
  // }, [])

  let [showModel, setShowModel] = useState(false)
  let [showSpinner, setShowSpinner] = useState(false)

  let [token, setToken] = useState("")
  const firstname = useRef(null)
  const lastname = useRef(null)
  const branch = useRef(null)
  const year = useRef(null)
  const mobileNo = useRef(null)
  const email = useRef(null)
  const parentsNo = useRef(null)
  const roomNo = useRef(null)
  const reason = useRef(null)
  const fromDate = useRef(null)
  const toDate = useRef(null)

  const formSubmit = async (e) => {
    e.preventDefault()
    const token = createToken()
    setShowSpinner(true)
    handleMailingForNotification(token, email.current.value)
    let out = await fetch("/api/gatepass/add", {
      method: "POST",
      body: JSON.stringify({
        firstname: firstname.current.value,
        lastname: lastname.current.value,
        branch: branch.current.value,
        year: year.current.value,
        reason: reason.current.value,
        status: gatePassStatus.PENDING,
        mobileNo: mobileNo.current.value,
        email: email.current.value,
        parentsNo: parentsNo.current.value,
        roomNo: roomNo.current.value,
        arrival: dateParser(toDate.current.value),
        departure: dateParser(fromDate.current.value),
        token: token
      })
    })
    const resJson = await out.json()
    setToken(resJson.token)

    if (subscriptionRef.current) {
      let subsRes = await fetch("/api/subscription/add", {
        method: 'POST',
        body: JSON.stringify({
          token: token,
          subscription: subscriptionRef.current
        })
      })
    }
    setShowSpinner(false)
    setShowModel(true)
  }

  return (
    <div>
      <Head>
        <title>Shiva Hostel Get Pass Form</title>
        <meta lang='en'></meta>
        <meta description='getpass form'></meta>
      </Head>
      <NavBar />
      {showModel ? <Modal token={token} passUrl={`https://gatepass.vercel.app/status/${token}`} setShowModel={setShowModel} /> : null}
      {showSpinner ? <Spinner /> : null}
      <div className='flex items-center justify-center mt-12 md:mt-8 '>
        <div className='w-12 bg-gray-500 h-0.5 rounded-lg'></div>
        <p className='block uppercase tracking-wide text-gray-700 text-lg font-bold mx-3'>Gate Pass Form </p>
        <div className='w-12 bg-gray-500 h-0.5 rounded-lg'></div>
      </div>
      <p className='italic text-xs text-center text-gray-700'>Fill add all the details carefully</p>
      <div className="flex justify-center my-4">
        <form className="w-full max-w-lg mx-5 sm:mx-0" onSubmit={formSubmit}>
          <p className="block uppercase my-7 tracking-wide text-gray-700 text-md font-bold">Your Details</p>
          <div className="flex flex-wrap -mx-3 my-4">
            <div className="w-full md:w-1/2 px-3 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                First Name*
              </label>
              <input ref={firstname} className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-indigo-600 " type="text" placeholder="First Name" required></input>
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                Last Name
              </label>
              <input ref={lastname} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-indigo-600" type="text" placeholder="Last Name"></input>
            </div>
          </div>
          <div className="flex flex-wrap -mx-3">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                Mobile No*
              </label>
              <input ref={mobileNo} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-indigo-600" type="number" placeholder="Mobile No" required></input>
            </div>
          </div>
          <div className="flex flex-wrap -mx-3">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                Email*
              </label>
              <input ref={email} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-indigo-600" type="email" placeholder="Your mail for notification" required></input>
            </div>
          </div>
          <div className="flex flex-wrap -mx-3">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                Year
              </label>
              <input ref={year} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-indigo-600" type="number" placeholder="Year" required></input>
            </div>
            <div className="w-full md:w-1/2 px-3 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                Branch
              </label>
              <div className="relative">
                <select ref={branch} className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-400 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-indigo-600" id="grid-state">
                  <option>Pharma</option>
                  <option>Technology</option>
                  <option>Management</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                </div>
              </div>
            </div>
            <div className="w-full px-3 my-3 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                Room no
              </label>
              <input ref={roomNo} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-indigo-600" id="grid-zip" type="number" placeholder="103" ></input>
            </div>

            <div className="w-full sm:my-6 px-3 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                Reason
              </label>
              <input ref={reason} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-indigo-600" type="text" placeholder=""></input>
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mt-3">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                Parents Mobile No*
              </label>
              <input ref={parentsNo} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-indigo-600" type="number" placeholder="Parents No" required ></input>
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mt-3">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                From Date*
              </label>
              <input ref={fromDate} className="appearance-none block w-full bg-gray-200 text-gray-400 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-indigo-600"
                type="date" placeholder="" required></input>
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 my-3">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                To Date*
              </label>
              <input ref={toDate} className="appearance-none block w-full bg-gray-200  text-gray-400 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-indigo-600"
                type="date" placeholder="Date" required></input>
            </div>
          </div>
          <div className='mt-3 flex justify-between items-center gap-3'>
            <div className='flex  items-center gap-1'>
              <div className="flex items-center">
                <input type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500  focus:ring-2 " onClick={emitNotification}></input>
                <label className="ml-2 text-sm font-medium text-gray-90">Show notification</label>
              </div>
            </div>
            <button className="bg-transparent hover:bg-indigo-700 text-indigo-700 font-semibold hover:text-white py-2 px-4 border border-indigo-500 hover:border-transparent rounded" type='submit' >
              Send Request
            </button>
          </div>
        </form>


      </div>
      <p className='text-xs text-center text-gray-600'>Push notification might not work on all devices</p>
      <p className='text-xs text-center text-gray-600 mb-4'>Make sure your email is correct</p>
    </div >
  )
}

