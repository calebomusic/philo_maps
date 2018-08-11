class AddUniquenessToProposition < ActiveRecord::Migration
  def change
    change_column :propositions, :statement, :string, unique: true
  end
end
