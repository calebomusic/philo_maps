class CreateConditionalAntecedents < ActiveRecord::Migration
  def change
    create_table :conditional_antecedents do |t|
      t.integer :proposition_id, null: false
      t.integer :conditional_id, null: false
      t.boolean :truth_value, null: false

      t.timestamps null: false
    end
  end
end
