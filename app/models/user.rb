class User < ApplicationRecord
  has_many :views, dependent: :destroy
  has_many :packs, depend ent: :destroy
  has_many :cards, through: :views
end
