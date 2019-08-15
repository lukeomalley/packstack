class CreateCards < ActiveRecord::Migration[5.2]
  def change
    create_table :cards do |t|
      t.string :question
      t.string :answer
      t.boolean :is_multi
      t.text :options
      t.string :image_url

      t.timestamps
    end
  end
end
