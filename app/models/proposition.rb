class Proposition < ActiveRecord::Base
  has_many :conditional_consequents, foreign_key: :consequent_id, dependent: :destroy
  has_many :conditional_antecedents, foreign_key: :antecedent_id, dependent: :destroy
  has_many :disjuncts, foreign_key: :disjunct_id, dependent: :destroy
  has_many :disjunctions, through: :disjuncts, dependent: :destroy
end
