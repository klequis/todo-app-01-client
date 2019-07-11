import React from 'react'
import { createDevTools } from 'redux-devtools'
import LogMonitor from 'redux-devtools-log-monitor'
import DockMonitor from 'redux-devtools-dock-monitor'

const devToolsStyle = {
  textAlign: 'left !important'
}

export default createDevTools(
    <DockMonitor
      style={devToolsStyle}
      toggleVisibilityKey="ctrl-h"
      changePositionKey="ctrl-w"
    >
      <LogMonitor style={devToolsStyle} />
    </DockMonitor>
)
