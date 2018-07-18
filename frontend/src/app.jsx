import React, {Component} from "react"
// import "../stylesheets/app.css"

class App extends Component {
  constructor (props) {
    super(props)
  }

  renderPropositions = () => {
    const { store } = this.props;
    if (!store || !store.propositions) return null;
    const propositionEls = [];
    for (let id in store.propositions) {
      const proposition = store.propositions[id];
      propositionEls.push(<div key={id}>{proposition.statement}, truth_value = {String(proposition.truth_value)}</div>);
    }

    return propositionEls;
  }

  render () {
    return (
      <div className="app">
        <div className="header">PhiloMaps</div>
        <div className="content">
          <div className="tower-1"></div>
          <div className="center">{this.renderPropositions()}</div>
          <div className="tower-2"></div>
        </div>
      </div>
    )
  }
}

export default App
