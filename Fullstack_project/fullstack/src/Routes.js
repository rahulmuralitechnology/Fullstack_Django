import React from 'react'
import { Route } from 'react-router-dom';
import Create from './components/Create';
import Read from './components/Read';
import Update from './components/Update';
import Delete from './components/Delete';

export default function Routes() {
  return (
    <>
      <Route exact path='/' component={Create} />
      <Route exact path='/read' component={Read} />
      <Route exact path='/update' component={Update} />
      <Route exact path='/delete' component={Delete} />
    </>
  )
}
