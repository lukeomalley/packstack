class Card < ApplicationRecord
  has_many :views, dependent: :destroy
  belongs_to :pack, required: true
  has_many :users, through: :views
end
