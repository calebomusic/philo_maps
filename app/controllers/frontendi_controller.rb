class FrontendiController < ApplicationController
  def root
    # propositions
    propositions = Proposition.all
    proposition_map = {}
    propositions.each do |proposition| 
      obj = proposition.attributes 
      obj[:antecedent_ids] = ConditionalAntecedent.joins(:conditional).where(antecedent_id: proposition.id).pluck("conditionals.id")
      obj[:consequent_ids] = ConditionalConsequent.joins(:conditional).where(consequent_id: proposition.id).pluck("conditionals.id")
      obj[:disjunction_ids] = proposition.disjunctions.pluck(:id)
      proposition_map[proposition.id] = obj
    end

    # conditionals
    conditionals = Conditional.all
    conditional_map = {}

    conditionals.each do |conditional|
      obj = conditional.attributes

      # antecedents
      conditional_antecedents = conditional.conditional_antecedents
      antecedents_map = {}
      disjunctions_map = {}
      obj[:antecedent_ids] = []
      obj[:antecedent_disjunction_ids] = []

      conditional_antecedents.each do |ca|
        obj[:antecedent_ids].push(ca.antecedent_id)
        antecedents_map[ca.antecedent_id] = ca.truth_value
      end

      conditional_antecedent_disjunctions = conditional.conditional_antecedent_disjunctions
      conditional_antecedent_disjunctions.each do |cad|
        obj[:antecedent_disjunction_ids].push(cad.disjunction_id)
        disjunctions_map[cad.disjunction_id] = cad.truth_value
      end

      # consequents
      consequents_map = {}
      obj[:consequent_ids] = []
      obj[:consequent_disjunction_ids] = []
      conditional_consequents = conditional.conditional_consequents

      conditional_consequents.each do |ca|
        obj[:consequent_ids].push(ca.consequent_id)
        consequents_map[ca.consequent_id] = ca.truth_value
      end

      conditional_consequent_disjunctions = conditional.conditional_consequent_disjunctions
      conditional_consequent_disjunctions.each do |cad|
        obj[:consequent_disjunction_ids].push(cad.disjunction_id)
        disjunctions_map[cad.disjunction_id] = cad.truth_value
      end

      obj[:antecedent_truth_values] = antecedents_map
      obj[:consequent_truth_values] = consequents_map
      obj[:disjunction_truth_values] = disjunctions_map

      conditional_map[obj["id"]] = obj
    end

    # disjunctions
    disjunctions_map = {}
    disjunctions = Disjunction.all

    disjunctions.each do |disjunction|
      obj = disjunction.attributes
      disjuncts = disjunction.disjuncts
      obj[:disjunct_ids] = disjuncts.pluck(:disjunct_id)

      disjunct_truth_values = {}
      disjuncts.each { |d| disjunct_truth_values[d.disjunct_id] = d.truth_value }
      obj[:disjunct_truth_values] = disjunct_truth_values
      obj[:antecedent_ids] = ConditionalAntecedentDisjunction.joins(:conditional).where(disjunction_id: disjunction.id).pluck("conditionals.id")
      obj[:consequent_ids] = ConditionalConsequentDisjunction.joins(:conditional).where(disjunction_id: disjunction.id).pluck("conditionals.id")

      disjunctions_map[disjunction.id] = obj
    end

    @state = {
      conditionals: conditional_map,  
      disjunctions: disjunctions_map,
      propositions: proposition_map
    }
  end
end
