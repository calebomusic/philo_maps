class CreateConditionals < ActiveRecord::Migration
  def change
    create_table :conditionals do |t|
      t.boolean :truth_value, null: false, default: true

      t.timestamps null: false
    end
  end
end
