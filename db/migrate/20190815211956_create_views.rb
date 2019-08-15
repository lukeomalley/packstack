class CreateViews < ActiveRecord::Migration[5.2]
  def change
    create_table :views do |t|
      t.string :result
      t.integer :card_id
      t.integer :user_id

      t.timestamps
    end
  end
end
