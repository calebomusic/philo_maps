import React, {Component} from "react"
import "../stylesheets/app.css"

/**
 * TODO:
 *  - show user propositions that are false
 *  - error on false for q
 */
class App extends Component {
  constructor (props) {
    super(props);

    const {context} = this.props;
    const propositionIdx = Math.round(Math.random() * (Object.keys(context.propositions).length - 1));
    const currentProposition = context.propositions[Object.keys(context.propositions)[propositionIdx]];

    this.state = {
      currentProposition
    }

    // TODO: hacky
    context.forceUpdate = this.forceUpdate.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.currentProposition && prevState.currentProposition.truth_value !== undefined) {
      this.newCurrentProposition();
    }
  }

  getUserPropositions = () => {
    const {context} = this.props;
    const proposition_ids = Object.keys(context.propositions);
    return proposition_ids.filter((id) => context.propositions[id].user);
  }

  getSecondPropositions = () => {
    const {context} = this.props;
    const proposition_ids = Object.keys(context.propositions);
    return proposition_ids.filter((id) => context.propositions[id].truth_value !== undefined && !context.propositions[id].user);
  }

  getFreePropositions = () => {
    const {context} = this.props;
    const proposition_ids = Object.keys(context.propositions);
    return proposition_ids.filter((id) => {
      return context.propositions[id].truth_value === undefined
    });
  }

  newCurrentProposition = () => {
    const {context} = this.props;
    const freePropositions = this.getFreePropositions();
    if (freePropositions.length > 0) {
      const propositionIdx = Math.round(Math.random() * (freePropositions.length - 1));
      const currentProposition = context.propositions[freePropositions[propositionIdx]];
      this.setState({currentProposition});
    } else {
      const propositionIdx = Math.round(Math.random() * (freePropositions.length - 1));
      const currentProposition = context.propositions[freePropositions[propositionIdx]];
      this.setState({currentProposition: null});
    }
  }

  renderFreeProposition = () => {
    if (this.state.currentProposition) {
      return <div className="card current-proposition">
        <p><i>{this.state.currentProposition.statement}</i></p>
        <div className="true-false-btns">
          <span className="btn" onClick={() => this.props.context.setPropositionTruthValue(this.state.currentProposition, true)}>True</span>
          <span className="btn" onClick={() => this.props.context.setPropositionTruthValue(this.state.currentProposition, false)}>False</span>
        </div>
      </div>
    } else {
      return <div className="card no-more-propositions">No more propositions!</div>
    }
  }

  renderUserPropositions = () => {
    const userPropositionIds = this.getUserPropositions();
    const userPropositionEls = [];

    userPropositionIds.forEach((id, i) => {
      userPropositionEls.push(<div className="card" key={i}><p>{this.props.context.propositions[id].statement}</p><i>{this.props.context.propositions[id].truth_value.toString()}</i></div>)
    })

    return userPropositionEls;
  }

  renderSecondPropositions = () => {
    const secondPropositionIds = this.getSecondPropositions();
    const secondPropositionEls = [];

    secondPropositionIds.forEach((id, i) => {
      secondPropositionEls.push(<div className="card" key={i}><p>{this.props.context.propositions[id].statement}</p><i>{this.props.context.propositions[id].truth_value.toString()}</i></div>);
    })

    return secondPropositionEls;
  }

  render () {
    return (
      <div className="app">
        <div className="header"><p>PhiloMaps</p></div>
        <div className="content">
          <div className="tower-1">
            <div className="tower-header"><p>Your propositions</p></div>
            {this.renderUserPropositions()}
          </div>
          <div className="center">
            <div className="tower-header"><p>Is the following proposition true or false:</p></div>
            {this.renderFreeProposition()}
          </div>
          <div className="tower-2">
            <div className="tower-header"><p>Entailments</p></div>
            {this.renderSecondPropositions()}
          </div>
        </div>
      </div>
    )
  }
}

export default App
