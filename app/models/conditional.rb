class Conditional < ActiveRecord::Base
  has_many :conditional_antecedents, class_name: ConditionalAntecedent, foreign_key: :conditional_id
  has_many :antecedents, through: :conditional_antecedents, class_name: Proposition
  has_many :conditional_consequents, class_name: ConditionalConsequent, foreign_key: :conditional_id
  has_many :consequents, through: :conditional_consequents, class_name: Proposition
end
