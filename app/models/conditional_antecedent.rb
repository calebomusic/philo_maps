class ConditionalAntecedent < ActiveRecord::Base
  belongs_to :conditional
  belongs_to :antecedent
end
