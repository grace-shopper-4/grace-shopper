/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {Navbar} from './Navbar'
import 'babel-polyfill';

const adapter = new Adapter()
enzyme.configure({adapter})

describe('Navbar', () => {
  let Navbar

  beforeEach(() => {
    Navbar = shallow(<Navbar name={'Cody'} />)
  })

  it('renders the name in a p', () => {
    expect(Navbar.find('p').text()).to.be.equal('Welcome, Cody')
  })
})
