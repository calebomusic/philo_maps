class ConditionalAntecedentDisjunction < ActiveRecord::Base
  belongs_to :disjunction
  belongs_to :conditional
end
