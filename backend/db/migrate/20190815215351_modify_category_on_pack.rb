# frozen_string_literal: true

class ModifyCategoryOnPack < ActiveRecord::Migration[5.2]
  def change
    change_column :packs, :category_id, :string
  end
end
