import React from 'react'
import { bindActionCreators } from 'redux'
import { initStore, startClock, addCount, serverRenderClock } from '../store'
import withRedux from 'next-redux-wrapper'

import Main from '../layouts/main'
import Page from '../components/Page'


class Counter extends React.Component {
  static getInitialProps ({ store, isServer, query }) {
    store.dispatch(serverRenderClock(isServer))
    store.dispatch(addCount())
    return { isServer, id: query.id }
  }

  componentDidMount () {
    this.timer = this.props.startClock()
  }

  componentWillUnmount () {
    clearInterval(this.timer)
  }

  render () {
    return (
      <Main>  
        <Page title='Other Page' linkTo='/' />
        ID is {this.props.id}
      </Main>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addCount: bindActionCreators(addCount, dispatch),
    startClock: bindActionCreators(startClock, dispatch)
  }
}

export default withRedux(initStore, null, mapDispatchToProps)(Counter)