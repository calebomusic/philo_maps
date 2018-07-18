class CreateConditionalConsequents < ActiveRecord::Migration
  def change
    create_table :conditional_consequents do |t|
      t.boolean :truth_value, null: false
      t.integer :consequent_id, null: false
      t.integer :conditional_id, null: false

      t.timestamps null: false
    end
  end
end
