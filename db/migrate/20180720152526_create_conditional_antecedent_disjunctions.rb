class CreateConditionalAntecedentDisjunctions < ActiveRecord::Migration
  def change
    create_table :conditional_antecedent_disjunctions do |t|
      t.integer :disjunction_id, null: false
      t.integer :conditional_id, null: false
      t.boolean :truth_value, null: false

      t.timestamps null: false
    end
  end
end
