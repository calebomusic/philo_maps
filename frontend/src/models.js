class Context {
  constructor (props) {
    for(let k in props) {
      this[k] = props[k];
    }
  }

  // Checks whether all antecedents of a conditional obtain. 
  ponensCheck (conditional) {
    console.log(`Checking whether antecedents obtain for ${conditional.id}`);
    // proposition
    const antecedent_ids = conditional.antecedent_ids;
    for(let id of antecedent_ids) {
      console.log(`checking proposition ${id}`)
      const proposition = this.propositions[id];
      if (proposition.truth_value !== conditional.antecedent_truth_values[id]) {
        console.log(`proposition antecedent did not obtain for conditonal ${conditional.id}`)
        return false;
      }
    }

    // disjunction
    const antecedent_disjunction_ids = conditional.antecedent_disjunction_ids
    for(let id of antecedent_disjunction_ids) {
      console.log(`checking disjunction ${id}`)
      const disjunction = this.disjunctions[id]
      if (disjunction.truth_value !== conditional.disjunction_truth_values[id]) {
        console.log(`disjunction antecedent did not obtain for conditonal ${conditional.id}`)
        return false;
      }
    }

    console.log(`Antecedents obtained for conditional ${conditional.id}`);
    this.updateConsequents(conditional);
    return true;
  }

  updateTruthValue(el, truth_value, isUser = null) {
    isUser = isUser || el.user;

    console.log(el.truth_value !== undefined, el.truth_value !== truth_value, el);
    if (el.truth_value !== undefined && el.truth_value !== truth_value) {
      console.log("contradiction:")
      console.log(el)
      el.contradiction = true;
    } else {
      el.truth_value = truth_value;
      el.user = isUser || false;
    }
  }

  // TODO handle two conjunct tollens case (a && b => c. ~c => ~a || ~b)
  updateAntecedents (conditional) {
    console.log(`Updating antecedents for conditional: ${conditional.id}`);
    // propositions
    const antecedent_ids = conditional.antecedent_ids;
    const antecedent_disjunction_ids = conditional.antecedent_disjunction_ids;
    
    if (antecedent_ids.length === 1) {
      const id = antecedent_ids[0];
      const proposition = this.propositions[id];
      const truth_value = !conditional.antecedent_truth_values[id]

      this.updateTruthValue(proposition, truth_value);
      this.conditionalEvaluation(proposition);
      this.propositionsDisjunctionEvaluation(proposition);
    } else if (antecedent_disjunction_ids.length === 1) {
      const id = antecedent_disjunction_ids[0];
      const disjunction = this.disjunctions[id];
      const truth_value = !conditional.disjunction_truth_values[id];
      
      this.updateTruthValue(disjunction, truth_value);
      this.updateTruthValue(disjunction, !truth_value);
      this.disjunctionEvaluation(disjunction, false);
    } else {
      // Handle a && b
      // TODO: ignores a && (b || c)
      if (antecedent_ids.length > 0) {
        
        const newDisjunction = {id: Object.keys(this.disjunctions).length * -1 };
        const newConditional = { id: Object.keys(this.conditionals).length * -1 };
        newDisjunction.disjunct_ids = antecedent_ids.slice();
        newDisjunction.antecedent_ids = [];
        newDisjunction.consequent_ids = [newConditional.id];
        newDisjunction.disjunct_truth_values = {};

        for(let id of antecedent_ids) {
          newDisjunction.disjunct_truth_values[id] = !conditional.antecedent_truth_values[id];
        }

        this.disjunctions[newDisjunction.id] = newDisjunction;

        newConditional.truth_value = true
        newConditional.consequent_disjunction_ids = [newDisjunction.id]
        newConditional.antecedent_ids = conditional.consequent_ids.slice()
        newConditional.antecedent_disjunction_ids = conditional.antecedent_disjunction_ids.slice();
        newConditional.antecedent_truth_values = conditional.consequent_truth_values
        newConditional.disjunction_truth_values = newConditional.disjunction_truth_values;

        this.conditionals[newConditional.id] = newConditional;
      }
    }
  }

  // Handle disjunctions
  // Updates consequents to conditionals' consequent truth_values
  updateConsequents (conditional) {
    console.log(`Updating consequents for conditional: ${conditional.id}`);
    const consequent_ids = conditional.consequent_ids;
    const consequent_disjunction_ids = conditional.consequent_disjunction_ids;
    let propositionNum = 0;
    
    // propositions
    for(let id of consequent_ids) {
      const proposition = this.propositions[id];
      if (proposition.truth_value !== conditional.consequent_truth_values[id]) {
        const truth_value = conditional.consequent_truth_values[id];
        this.updateTruthValue(proposition, truth_value);
        this.forceUpdate();

        console.log(`Updated consequent ${proposition.id} to ${proposition.truth_value}`)
        propositionNum ++;
        this.conditionalEvaluation(proposition);
        this.propositionsDisjunctionEvaluation(proposition);
      }
    }

    // disjunctions
    for(let id of consequent_disjunction_ids) {
      const disjunction = this.disjunctions[id];
      if (disjunction.truth_value !== conditional.disjunction_truth_values[id]) {
        const truth_value = conditional.disjunction_truth_values[id];
        this.updateTruthValue(disjunction, truth_value);
        this.forceUpdate();
        console.log(`Updated consequent disjunction ${disjunction.id} to ${disjunction.truth_value}`)
        propositionNum ++;
        this.disjunctionEvaluation(disjunction, false);
      }
    }

    console.log(`${propositionNum} consequents updated for conditional ${conditional.id}`);
    return true;
  }

  tollensCheck = (conditional) => {
    console.log(`Begin tollens check for ${conditional.id}`);
    const consequent_ids = conditional.consequent_ids;
    const consequent_disjunction_ids = conditional.consequent_disjunction_ids;
    
    // propositions
    for(let id of consequent_ids) {
      console.log(`checking proposition ${id}`)
      const proposition = this.propositions[id];
      if (proposition.truth_value !== undefined && proposition.truth_value !== conditional.consequent_truth_values[id]) {
        console.log(`Modus tollens found for conditional ${conditional.id}`);
        this.updateAntecedents(conditional);
        return true;
      }
    }

    // disjunctions
    for (let id of consequent_disjunction_ids) {
      console.log(`checking disjunction ${id}`)
      const disjunction = this.disjunctions[id];
      if (disjunction.truth_value !== undefined && disjunction.truth_value !== conditional.disjunction_truth_values[id]) {
        console.log(`Modus tollens found for conditional ${conditional.id}`);
        this.updateAntecedents(conditional);
        return true;
      }
    }

    console.log(`No modus tollens for conditional ${conditional.id}`);
    return false;
  }

  conditionalEvaluation = (proposition) => {
    console.log(`Begin conditionalEvaluation for proposition ${proposition.id}`);
    if (!proposition || proposition.truth_value === null) {
      console.log("Invalid: No proposition or truth value");
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
    this.updateTruthValue(proposition, truth_value, true);
    this.conditionalEvaluation(proposition);
    this.propositionsDisjunctionEvaluation(proposition);
    this.forceUpdate();
  }

  propositionsDisjunctionEvaluation = (proposition) => {
    console.log(`Begin proposition disjunction evaluation for proposition ${proposition.id}`)
    proposition.disjunction_ids.forEach(id => {
      const disjunction = this.disjunctions[id];
      this.disjunctionEvaluation(disjunction);
    });
  }

  disjunctionEvaluation = (disjunction, isUser = true) => {
    console.log(`Begin disjunction evaluation for disjunction ${disjunction.id}`)
    for(let id of disjunction.disjunct_ids) {
      console.log(id)
      const disjunct = this.propositions[id];
      const truth_value = disjunction.disjunct_truth_values[id];
      if (disjunct.truth_value === truth_value) {
        console.log(`Disjunction ${disjunction.id} obtains`)
        this.updateTruthValue(disjunction, true, isUser);
        console.log(`Begin modus and tollens check for disjunction ${disjunction.id}`)
        // Update disjunctions
        this.ponensCheckDisjunction(disjunction);
        this.tollensCheckDisjunction(disjunction);
        return true;
      }
    }

    console.log(`No updates necessary for disjunction ${disjunction.id}`)
    return true;
  }

  ponensCheckDisjunction(disjunction) {
    disjunction.antecedent_ids.forEach(id => this.ponensCheck(this.conditionals[id]))
  }

  tollensCheckDisjunction(disjunction) {
    disjunction.consequent_ids.forEach(id => this.tollensCheck(this.conditionals[id]))
  }
}

export default Context;
