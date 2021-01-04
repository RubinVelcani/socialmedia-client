import { Popup } from 'semantic-ui-react'
import React from 'react'

function InfoPopup({ content, children }) {
  return <Popup inverted content={content} trigger={children}/>
}

export default InfoPopup