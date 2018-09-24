import React, {Component} from "react"
import _ from "lodash"
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
      currentProposition, 
      contradictions: [],
      contradiction: false,
      currentSourceIds: []
    }

    // TODO: hacky
    context.forceUpdate = this.forceUpdate.bind(this);
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeydown);
  }

  componentDidUpdate(prevProps, prevState) {
    const { contradiction } = this.state;
    if (prevState.currentProposition && prevState.currentProposition.truth_value !== undefined) {
      this.newCurrentProposition();
    }

    if (!contradiction) {
      this.checkContradictions()
    }
  }

  handleKeydown = (e) => {
    if (e.keyCode === 84) {
      this.trueTouch();
    } else if (e.keyCode === 70) {
      this.falseTouch();
    } else if (e.keyCode === 83) {
      this.skipTouch();
    }
  }

  handleHover = (id) => {
    const { context } = this.props;
    
    return () => {
      if (!context.propositions[id].sourceIds) return;
      const sourceIds = (context.propositions[id].sourceIds["true"] || []).concat((context.propositions[id].sourceIds["false"] || []));
      this.setState({currentSourceIds: _.uniq(sourceIds)})
    }
  }

  checkContradictions = () => {
    const { context } = this.props;
    const contradictions = [];

    for(let id in context.disjunctions) {
      const disjunction = context.disjunctions[id];

      if (disjunction.contradiction) {
        contradictions.push(disjunction);
      }
    }

    for(let id in context.propositions) {
      const proposition = context.propositions[id];

      if (proposition.contradiction) {
        contradictions.push(proposition);
      }
    }

    if (contradictions.length > 0) {
      console.log('contradiction!')
      this.setState({contradiction: true, contradictions});
    }
  }

  getUserPropositions = () => {
    const {context} = this.props;
    const proposition_ids = Object.keys(context.propositions);
    return proposition_ids.filter((id) => context.propositions[id].user);
  }

  getEntailedPropositions = () => {
    const {context} = this.props;
    const proposition_ids = Object.keys(context.propositions);
    return proposition_ids.filter((id) => context.propositions[id].truth_value !== undefined && !context.propositions[id].user);
  }

  getFreePropositions = () => {
    const {context} = this.props;
    const proposition_ids = Object.keys(context.propositions);
    return proposition_ids.filter((id) => {
      return !context.propositions[id].skipped && context.propositions[id].truth_value === undefined
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
        <div className="skip-btn">
          <span className="btn skip" onClick={this.skipTouch}>Skip ></span>
        </div>
        <p><i>{this.state.currentProposition.statement}</i></p>
        <div className="true-false-btns">
          <span className="btn" onClick={this.trueTouch}>True</span>
          <span className="btn" onClick={this.falseTouch}>False</span>
        </div>
      </div>
    } else {
      return <div className="card no-more-propositions"><p>No more propositions!</p><p><a href="/">Redo!</a></p></div>
    }
  }

  renderUserPropositions = () => {
    const userPropositionIds = this.getUserPropositions();
    const userPropositionEls = [];

    userPropositionIds.forEach((id, i) => {
      userPropositionEls.push(this.renderProposition(id, i))
    })

    return userPropositionEls;
  }

  renderEntailedPropositions = () => {
    const entailedPropositionIds = this.getEntailedPropositions();
    const entailedPropositionEls = [];

    entailedPropositionIds.forEach((id, i) => {
      entailedPropositionEls.push(this.renderProposition(id, i));
    })

    return entailedPropositionEls;
  }

  renderContradictions = () => {
    const { context } = this.props;
    const { contradictions } = this.state;
    const disjunctions = context.disjunctions;

    const contradictionEls = contradictions.map((el, i) => {
      const trueSourceProps = _.uniq(el.sourceIds.true).map(id => context.propositions[id]);
      const falseSourceProps = _.uniq(el.sourceIds.false).map(id => context.propositions[id]);

      const guiltyProp = (truth_value) => <p className="card card-contradiction">{truth_value !== undefined ? `${truth_value}:` : null}  {el.statement ? el.statement : el.disjunct_ids.map(id => disjunctions[id].statement).join(" or ")}</p>;
      const truthValueString = el.truth_value ? "true" : "false";
      const width = el.user && trueSourceProps.length > 0 && falseSourceProps.length > 0 ? "30%" : "45%";

      return <li key={i} className="contradiction-table">
        <div className="contradiction-header">
          <p>The following propositions and truth values from <b>Your Propositions</b> and their <b>Entailments</b> entail a contradiction!</p>
        </div>
        <div className="contradiction-cols">
          { 
            el.user ? 
            <div style={{width}}>
              <p>You said that the proposition:</p>
              {guiltyProp()}
              <p>is <b>{truthValueString}</b>.</p>
            </div> : 
            null
          }
          <br></br>
          {
            trueSourceProps.length > 0 ?
            <div style={{width}}>
              <p>{el.user ? "However, t" : "T"}he proposition{trueSourceProps.length > 1 ? "s" : null} and {trueSourceProps.length > 1 ? "their truth values" : "its truth value"}:</p>
              {trueSourceProps.map((prop) => <p className="card card-contradiction source" key={prop.id}>{prop.truth_value ? "true" : "false"}: {prop.statement}</p>)}
              <p>Entail{trueSourceProps.length === 1 ? "s" : null} that: </p>
              {guiltyProp()}
              <p>is <b>true</b>!</p>
            </div> : null
          }
          <br></br>
          {
            falseSourceProps.length > 0 ?
            <div style={{width}}>
              <p>{trueSourceProps.length > 0 ? "And " : "However, "}the{falseSourceProps.length > 1 ? "se" : null} proposition{falseSourceProps.length > 1 ? "s" : null} and  {falseSourceProps.length > 1 ? "their truth values" : "its truth value"}:</p>    
              {falseSourceProps.map((prop) => <p className="card card-contradiction source" key={prop.id}>{prop.truth_value ? "true" : "false"}: {prop.statement}</p>)}
              <p>Entail{falseSourceProps.length === 1 ? "s" : null} that:</p>
              {guiltyProp()}
              <p>is <b>false</b>!</p>
            </div> : null
          }
        </div>
      </li>
    });

    return <div className="contradictions">
      <ul className="contradictions-list">{contradictionEls}</ul>
    </div>
  }

  renderProposition = (id, i) => {
    let classNames = "card"

    if (this.state.currentSourceIds.includes(parseInt(id))) {
      classNames += " source"
    }
    
    return <div className={classNames} 
                key={i} 
                onMouseLeave={() => this.setState({currentSourceIds: []})}
                onMouseOver={this.handleHover(id)}>
      <p>{this.props.context.propositions[id].statement}</p>
      <i>{this.props.context.propositions[id].truth_value.toString()}</i>
    </div>
  }

  skipTouch = () => {
    const { currentProposition } = this.state;
    currentProposition.skipped = true;
    this.newCurrentProposition();
  }

  trueTouch = () => {
    this.props.context.setPropositionTruthValue(this.state.currentProposition, true);
  }

  falseTouch = () => {
    this.props.context.setPropositionTruthValue(this.state.currentProposition, false);
  }

  render () {
    const {contradiction} = this.state;

    const userPropositionIds = this.getUserPropositions();
    const entailedPropositionIds = this.getEntailedPropositions();

    return (
      <div className="app">
        <div className="header"><p>PhiloMaps</p></div>
        {contradiction && this.renderContradictions()}
        <div className="content">
          <div className="tower-1">
            <div className="tower-header">
              <p>Your propositions</p>
              <p className="tower-header-sub"><i>{userPropositionIds.length > 0 && "Propositions you have judged end up here!"}</i></p>
            </div>
            {this.renderUserPropositions()}
          </div>
          <div className="center">
            <div className="tower-header"><p>Is the following proposition true or false:</p><br></br></div>
            {this.renderFreeProposition()}
          </div>
          <div className="tower-2">
            <div className="tower-header">
              <p>Entailments</p>
              <p className="tower-header-sub"><i>{entailedPropositionIds.length > 0 && "Hover over propositions to see why they are entailed."}</i></p>
            </div>
            {this.renderEntailedPropositions()}
          </div>
        </div>
      </div>
    )
  }
}

export default App;
