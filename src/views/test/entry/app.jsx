import React from 'react'

import {a, c} from '../../../utils/utils.js'

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      test: 0
    }
    a()
    c()
  }

  render() {
    return (
      <div>
        <div
          onClick={() => {
            this.setState({
              test: Math.random() * 1000
            })
          }}>
          111 什么鬼啊。这个竟然可以的啊？？？ fuck
        </div>
        <div>{this.state.test}</div>
      </div>
    )
  }
}
