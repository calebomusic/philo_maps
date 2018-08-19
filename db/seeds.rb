require 'csv'

def read_propositions(filename)
  csv = CSV.readlines(filename)

  csv[1..-1].each do |line|
    id, statement = line
    Proposition.create(id: id.to_i, statement: statement)
  end
end

def read_disjunctions(filename)
  csv = CSV.readlines(filename)

  csv[1..-1].each do |line|
    id, disjunct_ids = line

    d = Disjunction.create(id: id.to_i)
    disjunct_ids.split(",").map(&:strip).each do |disjunct|
      disjunct_id, truth_value = get_id_and_truth_value(disjunct)

      Disjunct.create(truth_value: truth_value, disjunct_id: disjunct_id, disjunction_id: id)
    end
  end
end

def read_conditionals(filename)
  csv = CSV.readlines(filename)

  csv[1..-1].each do |line|
    antecedent_ids, antecedent_disjunction, consequent_ids, consequent_disjunction, user = line

    c = Conditional.create(truth_value: !user.blank?)

    antecedent_ids.split(",").map(&:strip).each do |antecedent|
      id, truth_value = get_id_and_truth_value(antecedent)

      if antecedent_disjunction.blank?
        ConditionalAntecedent.create(antecedent_id: id.to_i, conditional_id: c.id, truth_value: truth_value)
      else
        ConditionalAntecedentDisjunction.create(disjunction_id: id.to_i, truth_value: truth_value, conditional_id: c.id)
      end
    end

    consequent_ids.split(",").map(&:strip).each do |consequent|
      id, truth_value = get_id_and_truth_value(consequent)

      if consequent_disjunction.blank?
        ConditionalConsequent.create(consequent_id: id.to_i, conditional_id: c.id, truth_value: truth_value)
      else
        ConditionalConsequentDisjunction.create(disjunction_id: id.to_i, conditional_id: c.id, truth_value: truth_value)
      end
    end
  end
end


def get_id_and_truth_value(str)
  id = str.gsub(/\D/, "")
  truth_value = str.gsub(/\d/, "").downcase == "t"

  [id, truth_value]
end

read_propositions("lib/assets/Propositions.csv")
read_disjunctions("lib/assets/Disjunctions.csv")
read_conditionals("lib/assets/Conditionals.csv")