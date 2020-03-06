import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Nav from '../../components/Nav'
import Header from '../../components/Header'
import Title from '../../components/Title'

import { BodyRow, RowToColumn, Main, Container2, RowNmf, IconNmf, Grow1, Title3, Text, RowEnd, ButtonAction, RowToColumnWrap } from '../../components/StyledComponents'

function Panel() {

  const [messages, setMessages] = useState([])
  const [status, setStatus] = useState([])  
  const [update, setUpdate] = useState(false)

  useEffect(() => {

    async function loadMessages(){

      const response = await axios.get(`${process.env.REACT_APP_BACK_DOMAIN}/panel`, { headers: { Authorization: `Bearer ${localStorage.getItem('usertoken')}` } })
      setMessages(response.data.message)
      setStatus(response.data.status)

    }
    
    loadMessages() 
    
  }, [update])

  const handleDestroy = (id) => {
    const response = axios.delete(`${process.env.REACT_APP_BACK_DOMAIN}/panel/delete?id=${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem('usertoken')}` } })
    setUpdate(!update)
  }

	return (

    <BodyRow>
        <Nav />
        <Main>
            <Header />
            <Title />
            <RowToColumnWrap>
              {messages.map(message => (
                <Container2 key={message._id}>
                    <RowNmf>
                      <div>
                        <IconNmf></IconNmf>
                      </div>
                      <Grow1>
                        <Title3>{message.customer.name}</Title3>
                        <Text>{message.message}</Text>
                        <RowEnd>
                          <ButtonAction onClick={() => {handleDestroy(message._id)}}>x</ButtonAction>
                          <ButtonAction as="a" target="_blank" href={`https://api.whatsapp.com/send?phone=${message.customer.whatsapp}`}>></ButtonAction>
                        </RowEnd>
                      </Grow1>
                    </RowNmf>
                </Container2>
              ))}
            </RowToColumnWrap>
        </Main>    
    </BodyRow>


  )
}

export default Panel