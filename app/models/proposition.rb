class Proposition < ActiveRecord::Base
  has_many :conditional_consequents
  has_many :conditional_antecdents
  has_many :disjuncts, foreign_key: :disjunct_id
  has_many :disjunctions, through: :disjuncts
end
