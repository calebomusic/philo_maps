class Conditional < ActiveRecord::Base
  has_many :conditional_antecedents
  has_many :antecendents, through: :conditional_antecedents
  has_many :conditional_consequents
  has_many :consequents, through: :conditional_consequents
end
