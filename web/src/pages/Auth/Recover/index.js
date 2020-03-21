import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import {
	Main,
	H2,
	Column,
	Container,
	ButtonAction,
	Input,
	LinkAction,
  Alert,
  ButtonNmf
} from '../../../components/StyledComponents'

import axios from 'axios'

function Recover() {

  const [ email, setEmail ] = useState('')
	const [alert, setAlert] = useState(false)
  const [textAlert, setTextAlert]= useState(null)
  
  async function handleRecover(e) {
    e.preventDefault()

    const response = await axios.post(`${process.env.REACT_APP_BACK_DOMAIN}/auth/recover`,{
      email
    },{
      headers: {
        Authorization: `Bearer ${localStorage.getItem('usertoken')}`
      }
    })

    if(response.data){
      setAlert(true)
      setTextAlert(response.data.alert)
      return setTimeout(() => {
        setAlert(false)
        setTextAlert(null)
      }, 3000)
    }


  }

  return(
    <Main height={'100vh'}>
			<Column margin={'auto'}>
        <Container padding={'0 0 20px 0'}>
					<Link to='/signin'><ButtonNmf /></Link>
				</Container>
				<Container width={'300px'}>
					<Column as="form" onSubmit={handleRecover}>
						<H2 margin={'0 0 20px 0'}>Recuperar</H2>
						<Input type='email' placeholder="seu email" onChange={e => setEmail(e.target.value)}/>
						<ButtonAction type="submit" width={'100%'}>enviar</ButtonAction>
					</Column>	
				</Container>
			</Column>	
			<Alert alert={alert}>{textAlert}</Alert>
		</Main>
  )

}

export default Recover