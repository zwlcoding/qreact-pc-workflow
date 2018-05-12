import React from 'react'

import {b,c} from '../../../utils/utils.js'

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      test: 0
    }
    b()
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
          222222 什么鬼啊。这个竟然可以的啊？？？ fuck
        </div>
        <div>{this.state.test}</div>
      </div>
    )
  }
}
