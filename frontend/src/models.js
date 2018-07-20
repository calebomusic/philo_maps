class Context {
  constructor (props) {
    for(let k in props) {
      this[k] = props[k];
    }
  }

  // Checks whether all antecedents of a conditional obtain. 
  ponensCheck (conditional) {
    console.log(`Checking whether antecedents obtain for ${conditional.id}`);
    const antecedent_ids = conditional.antecedent_ids;
    for(let id of antecedent_ids) {
      const proposition = this.propositions[id];
      if (proposition.truth_value !== conditional.antecedent_truth_values[id]) return false;
    }

    console.log(`Antecedents obtained for conditional ${conditional.id}`);
    this.updateConsequents(conditional);
    return true;
  }

  updateAntecedents (conditional) {
    console.log(`Updating antecedents for conditional: ${conditional.id}`);
    console.log(`TODO`);
  }

  // Updates consequents to conditionals' consequent truth_values
  updateConsequents (conditional) {
    console.log(`Updating consequents for conditional: ${conditional.id}`);
    const consequent_ids = conditional.consequent_ids;
    let propositionNum = 0;
    
    for(let id of consequent_ids) {
      const proposition = this.propositions[id];
      if (proposition.truth_value !== conditional.consequent_truth_values[id]) {
        proposition.truth_value = conditional.consequent_truth_values[id];
        proposition.user = false;
        this.forceUpdate();

        console.log(`Updated consequent ${proposition.id} to ${proposition.truth_value}`)
        propositionNum ++;
        this.conditionalEvaluation(proposition);
      }
    }

    console.log(`${propositionNum} consequents updated for conditional ${conditional.id}`);
    return true;
  }

  tollensCheck = (conditional) => {
    console.log(`Begin tollens check for ${conditional.id}`);
    const consequent_ids = conditional.consequent_ids;
    
    for(let id of consequent_ids) {
      const proposition = this.propositions[id];
      if (proposition.truth_value !== conditional.consequent_truth_values[id]) {
        console.log(`Modus tollens found for conditional ${conditional.id}`);
        this.updateAntecedents(conditional);
        return true;
      }
    }

    console.log(`No modus tollens for conditional ${conditional.id}`);
    return false;
  }

  conditionalEvaluation = (proposition) => {
    console.log(`Begin conditionalEvaluation for proposition ${proposition.id}`)
    if (!proposition || proposition.truth_value === null) {
      console.log("Invalid: No proposition or truth value")
      return 
    }
    
    proposition.antecedent_ids.forEach((id) => {
      const conditional = this.conditionals[id];
      this.ponensCheck(conditional);
    });
    
    proposition.consequent_ids.forEach((id) => {
      const conditional = this.conditionals[id];
      this.tollensCheck(conditional);
    });
  }

  // User sets proposition truth value
  setPropositionTruthValue = (proposition, truth_value) => {
    proposition.truth_value = truth_value;
    proposition.user = true;
    this.conditionalEvaluation(proposition);
    this.forceUpdate();
  }
  // disjunctionEvaluation = () => {
  //   // 
  // }

}

/**
 * Proposition
 * @param statement text
 * @param truth_value boolean
 * @param consequent_ids array of ids to conditionals where proposition is a consequent
 * @param antecedent_ids array of ids to conditionals where proposition is a antecdent
 * @param disjunctions array of ids to disjunctions where proposition is a disjunct
 */
class Proposition {
  constructor (props) {
    const {statement, consequent_ids, antecedent_ids} = props
    this.statement = statement;
    this.truth_value = null;
    this.consequent_ids = consequent_ids;
    this.antecedent_ids = antecedent_ids;
  }
}

/**
 * Conditional
 * @param truth_value boolean
 * @param antecedent_ids array of ids
 * @param consequent_ids array of ids
 * @param antecdent_truth_values map of proposition ids to truth_values
 * @param consequent_truth_values map of proposition ids to truth_values
 */
class Conditional {
  constructor (props) {
    const {truth_value, antecedent_ids, consequent_ids, proposition_truth_values} = props;
    this.truth_value = truth_value
    this.antecedent_ids = antecedent_ids
    this.consequent_ids = consequent_ids
    this.proposition_truth_values = proposition_truth_values
  }
}

/**
 * Disjunction
 * @param truth_value boolean
 * @param disjunct_ids array of ids
 * @param disjunct_truth_values map of disjunct ids to truth_values
 */
class Disjunction {
  constructor (props) {

  }
}

export default Context;
