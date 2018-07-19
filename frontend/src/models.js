
/**
 * Proposition
 * @param statement text
 * @param truth_value boolean
 * @param consequent_ids array of ids to conditionals where proposition is a consequent
 * @param antecdent_ids array of ids to conditionals where proposition is a antecdent
 */
class Proposition {
  constructor (props) {
    const {statement, truth_value} = props
    this.statement = statement;
    this.truth_value = truth_value
  }

  conditionalEvaluation = () => {
    // given truth value, lookup conditionals with 
  }

  disjunctionEvaluation = () => {
    // 
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

class Disjunction {
  constructor (props) {

  }
}