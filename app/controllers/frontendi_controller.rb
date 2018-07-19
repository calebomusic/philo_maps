class FrontendiController < ApplicationController
  def root
    propositions = Proposition.all
    proposition_map = {}
    propositions.each do |proposition| 
      obj = proposition.attributes 
      obj[:antecedent_ids] = ConditionalAntecedent.joins(:conditional).where(id: proposition.id).pluck("conditionals.id")
      obj[:consequent_ids] = ConditionalConsequent.joins(:conditional).where(id: proposition.id).pluck("conditionals.id")
      proposition_map[proposition.id] = obj
    end

    conditionals = Conditional.all
    conditional_map = {}

    conditionals.each do |conditional|
      obj = conditional.attributes

      # antecedents
      conditional_antecedents = conditional.conditional_antecedents
      antecedents_map = {}
      obj[:antecedents] = []

      conditional_antecedents.each do |ca|
        obj[:antecedents].push(ca.antecedent_id)
        antecedents_map[ca.antecedent_id] = ca.truth_value
      end

      # consequents
      consequents_map = {}
      obj[:consequents] = []
      conditional_consequents = conditional.conditional_consequents

      conditional_consequents.each do |ca|
        obj[:consequents].push(ca.consequent_id)
        consequents_map[ca.consequent_id] = ca.truth_value
      end

      obj[:antecedent_truth_tvalues] = antecedents_map
      obj[:consequent_truth_values] = consequents_map
      
      conditional_map[obj["id"]] = obj
    end

    @state = {
      conditionals: conditional_map,  
      propositions: proposition_map
    }
  end
end
