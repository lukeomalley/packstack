class Card < ApplicationRecord
  has_many :views, dependent: :destroy
  belongs_to :pack
  has_many :users, through: :views
end
