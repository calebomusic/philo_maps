class CreatePropositions < ActiveRecord::Migration
  def change
    create_table :propositions do |t|
      t.string :statement, null: false
      t.boolean :truth_value, null: false

      t.timestamps null: false
    end
  end
end
