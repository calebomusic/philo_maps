class ConditionalAntecedent < ActiveRecord::Base
  belongs_to :conditional
  belongs_to :antecedent, class_name: Proposition
end
