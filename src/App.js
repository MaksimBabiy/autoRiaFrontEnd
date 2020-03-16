import React from 'react';
import { Header,MainPage, AddAuto,MainAuto } from 'components'
import { Route } from 'react-router';


function App() {
  return (
    <>
      <Header />
      <div className="container">
      <Route exact path="/" component={MainPage}/>
      <Route exact path="/carParams" component={MainAuto} />
      <Route exact path="/add_auto" component={AddAuto}/>
      </div>
    </>
  );
}

export default App;
