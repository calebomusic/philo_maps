class CreateDisjuncts < ActiveRecord::Migration
  def change
    create_table :disjuncts do |t|
      t.integer :disjunct_id, null: false
      t.integer :disjunction_id, null: false
      t.boolean :truth_value, null: false

      t.timestamps null: false
    end
  end
end
