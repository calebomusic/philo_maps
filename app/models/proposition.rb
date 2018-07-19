class Proposition < ActiveRecord::Base
  has_many :conditional_consequents
  has_many :conditional_antecdents
end
