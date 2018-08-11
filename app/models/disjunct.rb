class Disjunct < ActiveRecord::Base
  belongs_to :proposition
  belongs_to :disjunction
end
