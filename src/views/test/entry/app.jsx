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
          这个其实是直接 IE8 以下的浏览器的，page 1111
        </div>
        <div>{this.state.test}</div>
      </div>
    )
  }
}
