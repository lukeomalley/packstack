class Pack < ApplicationRecord
  has_many :cards, dependent: :destroy
end
