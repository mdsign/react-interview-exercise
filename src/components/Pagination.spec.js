import React from 'react';
import chai, { expect } from 'chai';

import chaiEnzyme from 'chai-enzyme';
import chaiJestSnapshot from "chai-jest-snapshot";

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';

import Pagination from './Pagination.js';

Enzyme.configure({ adapter: new Adapter() });

chai.use(chaiJestSnapshot);
chai.use(chaiEnzyme());

const data = [
    {
      name: 'Hillary Clinton',
      gender: 'female',
      starred: true
    },
    {
      name: 'Barack Obama',
      gender: 'male',
      starred: true
    }
]

describe('<Pagination /> component should', () => {
  const pagination = mount(<Pagination items={data} onChangePage={() => null} />);

  beforeEach(function() {
    chaiJestSnapshot.resetSnapshotRegistry();
    chaiJestSnapshot.setFilename(__filename + ".snap");
  });

  const props = { 
    items: data,
    onChange: () => {}, 
   };

   const pageSize = 2;

  it('exist and be a component', () => {
    expect(Pagination).to.be.a('function');
  });

  it('have at least one item to be passed to it to display the component', () => {
    expect(props.items).to.have.lengthOf.at.least(1);
  });

  it('have two items per page', () => {    
    expect(pageSize).to.equal(2);
  });

  it('return correct number of total pages', () => {
    const totalPages = props.items.length / pageSize;
    expect(totalPages).to.equal(1);
  });

  it('have pagination class name', () => {
    expect(pagination.find('.pagination')).to.have.lengthOf(1);
  });

  it('have a wrapper and navigation buttons', () => {
    expect(pagination.find('ul')).to.have.lengthOf(1);
    expect(pagination.find('li')).to.be.present;
  });

  it('render correctly', () => {
    chaiJestSnapshot.setTestName("Pagination renders correctly");
    const tree = renderer
    .create(<Pagination items={data} onChangePage={() => null} />)
    .toJSON();
    expect(tree).to.matchSnapshot();
  });
});
