import React, { useState } from 'react'
import './App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp, faBraille, faAngleUp, faAngleDown, faSearch, faEllipsis } from '@fortawesome/free-solid-svg-icons'

import { useMutation, useQuery } from 'react-query'
import { getQuestions, postQuestion } from 'api/question'

export interface Conversation {
  id: number
  message: string
  answer?: string
}

function App() {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [message, setMessage] = useState<string>('')

  const { status: loadingData } = useQuery('getQuestions', getQuestions, {
    onSuccess: (data) => {
      setConversations([...data])
    },
    onError: () => {
      throw new Error('Something wrong happened!')
    },
    retry: false,
  })

  const { mutateAsync, status: postDataStatus } = useMutation('postQuestion', postQuestion, {
    onSuccess(data) {
      setConversations([...data])
    },
    onError: () => {
      throw new Error('Something wrong happened!')
    },
    retry: false,
  })

  const postMessage = async () => {
    setMessage('')
    await mutateAsync({ message })
  }

  return (
    <div className='flex h-screen bg-[#000000]'>
      {/* <!-- Sidebar --> */}
      <div className='flex flex-col gap-3 bg-[#1c1c1c] text-white w-[350px]'>
        <div className='flex h-20 p-4 border-gray-600 border-[1px] items-center'>
          <h1 className='grow text-md'>HospiTelligence.ai</h1>
          <FontAwesomeIcon icon={faSearch} className='text-[#878786] w-5 h-5 p-0 m-0' />
        </div>
        <div className='pb-4 mx-4 border-b-gray-600 border-b-[1px] items-center'>
          <button className='w-full bg-[#2c9fe5] rounded-2xl h-12'>New Chat</button>
        </div>

        {/* <!-- List of conversations --> */}
        <div className='flex flex-col gap-4 px-4 grow'>
          <span className='text-sm text-[#878786]'>Today</span>
          {/* <!-- Each conversation item --> */}
          <div className='text-white bg-[#282829] p-3 rounded-lg flex'>
            <span className='grow'>Chat 1</span>
            <FontAwesomeIcon icon={faEllipsis} className='text-white w-5 h-5 p-0 m-0' />
          </div>
          <div className='text-white bg-[#282829] p-3 rounded-lg flex'>
            <span className='grow'>Chat 2</span>
            <FontAwesomeIcon icon={faEllipsis} className='text-white w-5 h-5 p-0 m-0' />
          </div>
        </div>
        {/* <!-- footer --> */}
        <div
          className='flex w-full items-center h-[60px] border-r-gray-600 border-r-[1px] border-t-gray-600 border-t-[1px]
          justify-center
        '
        >
          @ 2024 Hospitelligence.ai
        </div>
      </div>
      {/* <!-- Chat area --> */}
      <div className='flex flex-col w-full h-full bg-[#000000]'>
        {/* header */}
        <div className='flex flex-row-reverse w-full bg-[#1d1c1d] p-4 h-20 border-b-gray-600 border-b-[1px]'>
          <div className='flex gap-3 items-center'>
            <img src='src/assets/avatar.jpg' alt='' className='rounded-full w-8 h-8' />
            <div className='flex flex-col gap-1'>
              <span className='text-white text-xs'>Jacob Jones</span>
              <span className='text-[#5f5f5f] text-xs'>jacobjones@gmail.com</span>
            </div>
            <div className='flex flex-col'>
              <FontAwesomeIcon icon={faAngleUp} className='text-[#878786] w-3 h-3 p-0 m-0' />
              <FontAwesomeIcon icon={faAngleDown} className='text-[#878786] w-3 h-3 p-0 m-0' />
            </div>
          </div>
        </div>

        <div className='flex flex-col gap-5 grow px-36 py-5 overflow-y-auto'>
          {conversations.map((conversation) => {
            return (
              <React.Fragment key={conversation.id}>
                <div className='p-5'>
                  {/* <!-- Chat header --> */}
                  <div className='flex gap-3'>
                    <img src='src/assets/avatar.jpg' alt='' className='rounded-full w-6 h-6' />
                    <span className='text-md text-white'>Jacob Jones</span>
                  </div>
                  {/* <!-- Chat messages --> */}
                  <div className='space-y-4'>
                    {/* <!-- A single message --> */}
                    <div className='flex items-start space-x-4'>
                      <div className='mt-5 rounded-lg text-[#5f5f5f]'>
                        <p>{conversation.message}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='p-5 rounded-2xl bg-[#0e0e0f]'>
                  {/* <!-- response header --> */}
                  <div className='flex gap-3'>
                    <FontAwesomeIcon icon={faBraille} className='text-white bg-[#2d93e9] rounded-full w-6 h-6' />
                    <span className='text-lg text-white'>Hospitelligence.ai</span>
                  </div>
                  {/* <!-- Chat messages --> */}
                  <div className='space-y-4'>
                    {/* <!-- A single message --> */}
                    <div className='flex items-start space-x-4'>
                      <div className='mt-5 rounded-lg text-[#5f5f5f]'>
                        <p>{conversation.answer}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            )
          })}
        </div>
        {/* <!-- Input area --> */}
        <div className='flex w-full h-[60px] bg-[#1d1c1d] border-t-gray-600 border-t-[1px]'>
          <input
            type='text'
            placeholder='Enter your chat here...'
            className='p-5 bg-[#1d1c1d] text-[#8a8b8b] outline-none grow'
            value={message}
            onChange={(e) => {
              setMessage(e.target.value)
            }}
          />
          <button className='py-3 px-5' onClick={postMessage}>
            <FontAwesomeIcon icon={faArrowUp} className='text-white w-5 h-5 p-2 bg-[#2d93e9] rounded-md' />
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
