import { Button } from 'antd'
import React from 'react'
import "./SaveButton.scss"

export const SaveButton = (handleSubmit) => {
  return (
    <Button className='SaveButton' onClick={handleSubmit}> GUARDAR</Button>
  )
}

