import React from 'react'
import { bindActionCreators } from 'redux'
import { initStore } from '../store'

import withRedux from 'next-redux-wrapper';
import { Router } from '../routes';

import { getImages } from '../actions/images';
import { mapImages } from '../actions/images/images.selectors';

import Main from '../layouts/main'
import ImageTable from '../components/imagetable'


class ImagePage extends React.Component {
  static async getInitialProps ({ store, isServer }) {

    return { isServer }
  }

  componentDidMount () {
    this.props.getImages();
  }

  componentWillUnmount () {
  }

  displayVulerabilities(id) {
    Router.pushRoute('vuln', { id });
  }
  render () {

    const { images, loading, data } = this.props;
    return (
      <Main>
        <ImageTable images={images||[]} selectItem={this.displayVulerabilities}/>
      </Main>
      )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getImages: bindActionCreators(getImages, dispatch)
  }
}

const mapStateToProps = ({ images, ajaxStatus }) => {

  return{
    images: mapImages(images.list),
    loading: ajaxStatus.loading,
    error: ajaxStatus.error
  };
}

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(ImagePage);
