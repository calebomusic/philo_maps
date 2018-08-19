class Disjunction < ActiveRecord::Base
  has_many :disjuncts, dependent: :destroy
end
