class ConditionalConsequent < ActiveRecord::Base
  belongs_to :conditional
  belongs_to :consequent, class_name: Proposition
end
