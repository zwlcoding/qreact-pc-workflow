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
          这个其实是直接 IE8 以下的浏览器的，page 22222
        </div>
        <div>{this.state.test}</div>
      </div>
    )
  }
}
