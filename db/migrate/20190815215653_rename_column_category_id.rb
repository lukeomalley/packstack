# frozen_string_literal: true

class RenameColumnCategoryId < ActiveRecord::Migration[5.2]
  def change
    rename_column :packs, :category_id, :category
  end
end
