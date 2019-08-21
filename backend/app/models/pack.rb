# frozen_string_literal: true

class Pack < ApplicationRecord
  include Filterable
  has_many :cards, dependent: :destroy
  belongs_to :user, required: true

  scope :category, -> (category) { where category: category}
  scope :user_id, -> (user_id) { where user_id: user_id}

  def self.get_all_categories
    Pack.all.map{|pack| pack.category}.uniq
  end
end
