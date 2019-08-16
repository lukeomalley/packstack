# frozen_string_literal: true

class User < ApplicationRecord
  has_many :views, dependent: :destroy
  has_many :packs, dependent: :destroy
  has_many :cards, through: :views
end
